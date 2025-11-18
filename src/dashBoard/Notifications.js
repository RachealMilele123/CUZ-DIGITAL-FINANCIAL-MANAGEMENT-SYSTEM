// // src/dashBoard/Notifications.js
// import React from "react";
// import { toast } from "react-toastify";

// /* -------------------------
//    Named helpers (used across app)
//    ------------------------- */
// export const notifyAccountCreated = ({ name, message } = {}) => {
//   const title = name ? `Account created — ${name}` : "Account created";
//   const body = message || "Your account was created successfully.";
//   toast.success(`${title}: ${body}`);
// };

// export const notifyMoneySent = ({ amount, to, message } = {}) => {
//   const title = "Money sent";
//   const body = message || `You sent ${amount || ""} to ${to || "recipient"}.`;
//   toast.success(`${title}: ${body}`);
// };

// export const notifyMoneyReceived = ({ amount, from, message } = {}) => {
//   const title = "Money received";
//   const body = message || `You received ${amount || ""} from ${from || "someone"}.`;
//   toast.info(`${title}: ${body}`);
// };

// export const notifyGeneric = ({ title = "Notification", message = "" } = {}) => {
//   toast.info(`${title}: ${message}`);
// };

// /* -------------------------
//    Default component export
//    ------------------------- */
// /**
//  * We export a default React component so code that imports
//  * `import Notifications from "./dashBoard/Notifications"` or renders
//  * `<Notifications />` won't crash.
//  *
//  * The component itself renders nothing (null). If you want it to
//  * do something in future (e.g. mount event listeners), we can add that.
//  */
// const Notifications = () => null;
// export default Notifications;


// src/dashBoard/Notifications.js
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client"; // <- browser client only
import {
  Box,
  Title,
  Stack,
  Text,
  Badge,
  Button,
  Group,
  ScrollArea,
  Divider,
} from "@mantine/core";
import { IconBell, IconX } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:8000";

const showToastFor = (n) => {
  const title = n.title || (n.type === "moneyReceived" ? "Money received" : n.type);
  const message = n.message || n.body || "";
  if (n.type === "moneyReceived") {
    toast.info(`${title}: ${message}`);
  } else {
    toast.success(`${title}: ${message}`);
  }
};

const Notifications = () => {
  const { user, getToken } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const socketRef = useRef(null);

  const pushNotification = (n) => {
    const id = n.id || n._id || `${Date.now()}-${Math.random()}`;
    const newN = {
      id,
      type: n.type || "info",
      title: n.title || (n.type === "moneyReceived" ? "Money received" : "Notification"),
      message: n.message || n.body || "",
      meta: n.meta || n.data || {},
      read: false,
      date: n.date || new Date().toISOString(),
    };

    setNotifications((prev) => [newN, ...prev]);
    showToastFor(newN);
  };

  useEffect(() => {
    const localHandler = (e) => {
      const detail = e?.detail || {};
      pushNotification(detail);
    };
    window.addEventListener("app-notification", localHandler);
    return () => window.removeEventListener("app-notification", localHandler);
  }, []);

  useEffect(() => {
    // Only try to connect if we have either a logged-in user or an account number in localStorage
    const accountNumber = user?.accountNumber || localStorage.getItem("accountNumber");
    if (!accountNumber) return;

    const token = getToken ? getToken() : localStorage.getItem("authToken");

    // connect using the browser socket.io client
    socketRef.current = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token, accountNumber },
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.info("Socket connected", socket.id);
      socket.emit("join", { accountNumber });
    });

    socket.on("notification", (payload) => {
      pushNotification(payload);
    });

    socket.on("disconnect", (reason) => {
      console.info("Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connect_error", err?.message || err);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("notification:ack", { id });
    }
  };

  return (
    <Box p="md" style={{ height: "100%", maxHeight: "100%" }}>
      <Group position="apart" mb="sm">
        <Title order={3}>
          <IconBell style={{ verticalAlign: "middle" }} /> Notifications
        </Title>
        <Group>
          <Button onClick={() => setNotifications([])} variant="outline" color="red" leftIcon={<IconX />}>
            Clear
          </Button>
        </Group>
      </Group>

      <Divider mb="sm" />

      <ScrollArea style={{ height: "calc(100vh - 160px)" }}>
        <Stack spacing="sm">
          {notifications.length === 0 && <Text color="dimmed">No notifications yet.</Text>}
          {notifications.map((n) => (
            <Box key={n.id} p="sm" style={{ borderRadius: 8, background: n.read ? "#fff" : "#f7fbff", border: "1px solid #eee" }}>
              <Group position="apart" align="flex-start">
                <div>
                  <Text fw={700}>{n.title}</Text>
                  <Text size="sm" color="dimmed">{n.message}</Text>
                  <Text size="xs" color="dimmed" mt="xs">{new Date(n.date).toLocaleString()}</Text>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Badge color={n.read ? "gray" : "green"}>{n.type}</Badge>
                  <div style={{ marginTop: 8 }}>
                    <Button size="xs" variant="light" onClick={() => markAsRead(n.id)}>Mark read</Button>
                  </div>
                </div>
              </Group>
            </Box>
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
};

export default Notifications;

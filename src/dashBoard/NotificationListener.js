// src/dashBoard/NotificationListener.js
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useAuth } from "../contexts/AuthContext";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:8000";

export default function NotificationListener() {
  const { user, getToken } = useAuth();
  const socketRef = useRef(null);

  // expose a flag so we know this component mounted
  useEffect(() => {
    window.__NOTIF_LISTENER_MOUNTED__ = true;
    console.info("NotificationListener mounted — waiting for account info...");
    return () => {
      window.__NOTIF_LISTENER_MOUNTED__ = false;
      console.info("NotificationListener unmounted");
    };
  }, []);

  const push = (n) => {
    console.info("NotificationListener received payload:", n);
    const title = n.title || "Notification";
    const msg = n.message || n.body || "";
    toast.info(`${title}: ${msg}`);
  };

  // local CustomEvent listener
  useEffect(() => {
    const handler = (e) => {
      console.info("NotificationListener got app-notification event:", e.detail);
      push(e.detail);
    };
    window.addEventListener("app-notification", handler);
    return () => window.removeEventListener("app-notification", handler);
  }, []);

  // socket connection
  useEffect(() => {
    const accountNumber = user?.accountNumber || localStorage.getItem("accountNumber");
    console.info("NotificationListener attempting socket connect — accountNumber:", accountNumber);

    if (!accountNumber) {
      console.warn("No accountNumber available yet. Socket will not connect until present.");
      return;
    }

    const token = getToken ? getToken() : localStorage.getItem("authToken");

    console.info("NotificationListener connecting to socket at", SOCKET_URL, "with token/accountNumber");
    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token, accountNumber },
    });

    socketRef.current = socket;
    // expose socket for debugging
    window.__NOTIF_SOCKET__ = socket;

    socket.on("connect", () => {
      console.info("NotificationListener socket connected:", socket.id);
      socket.emit("join", { accountNumber });
    });

    socket.on("notification", (payload) => {
      console.info("NotificationListener socket -> notification:", payload);
      push(payload);
    });

    socket.on("disconnect", (reason) => {
      console.info("NotificationListener socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("NotificationListener socket connect_error:", err && err.message ? err.message : err);
    });

    return () => {
      try {
        socket.disconnect();
      } catch (e) {}
      socketRef.current = null;
      window.__NOTIF_SOCKET__ = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return null;
}

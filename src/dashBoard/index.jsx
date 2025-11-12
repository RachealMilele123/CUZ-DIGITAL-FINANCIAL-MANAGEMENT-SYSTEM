import { useState } from "react";
import {
  IconBellRinging,
  IconLogout,
  IconReceipt2,
  IconSwitchHorizontal,
  IconUserPlus,
  IconTransfer,
  IconReceipt,
  IconLibrary,
} from "@tabler/icons-react";
import {
  Code,
  Group,
  Avatar,
  Burger,
  Drawer,
  Stack,
  Text,
} from "@mantine/core";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDisclosure } from "@mantine/hooks";
import classes from "./dashBoard.module.css";

const allRoutes = [
  { link: "balance", label: "Balance", icon: IconLibrary },
  { link: "transfer", label: "Pay & Transfer", icon: IconTransfer },
  { link: "beneficiary", label: "Add Beneficiary", icon: IconUserPlus },
  { link: "notifications", label: "Notifications", icon: IconBellRinging },
  { link: "receipts", label: "Receipts", icon: IconReceipt },
  // { link: "deposit", label: "Deposit", icon: IconReceipt2 },
];

const adminRoutes = [
  { link: "user", label: "Account user", icon: IconReceipt2 },
  { link: "deposit", label: "Deposit", icon: IconReceipt2 },
  { link: "deposits", label: "View Deposits", icon: IconReceipt2 },
  { link: "receipts", label: "Receipts", icon: IconReceipt },
];

export function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);

  // Get active section from current URL
  const getActiveSection = () => {
    const path = location.pathname;
    if (path.endsWith("/balance")) return "Balance";
    if (path.endsWith("/transfer")) return "Pay & Transfer";
    if (path.endsWith("/beneficiary")) return "Add Beneficiary";
    if (path.endsWith("/notifications")) return "Notifications";
    if (path.endsWith("/receipts")) return "Receipts";
    if (path.endsWith("/deposit")) return "Deposit";
    // Default based on user type
    return user && user.type === "admin" ? "Deposit" : "Balance";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Determine which routes to show based on user type
  const data = user && user.type === "admin" ? adminRoutes : allRoutes;

  const links = data.map((item) => (
    <Link
      to={item.link}
      className={classes.link}
      data-active={item.label === getActiveSection() || undefined}
      key={item.label}
      onClick={() => close()}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <div className={classes.dashboardContainer}>
      {/* Desktop Header - visible on large screens */}
      <header className={classes.desktopHeader}>
        <div className={classes.desktopHeaderContent}>
          <Text size="xl" fw={700} className={classes.bankName}>
            Forever Trust Bank
          </Text>
          <Group gap="md" className={classes.rightHeaderGroup}>
            <Text>Welcome, {user?.type === "business" ? user?.businessName : user?.name}</Text>
            <IconBellRinging size={20} className={classes.notificationIcon} />
            <Avatar
              src={null}
              alt="User avatar"
              radius="xl"
              className={classes.desktopHeaderAvatar}
              size="md"
            />
          </Group>
        </div>
      </header>

      {/* Header bar for mobile with burger and avatar */}
      <div className={classes.mobileHeader}>
        <Group justify="space-between" className={classes.mobileHeaderContent}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            <Text size="lg" fw={600}>
              Dashboard
            </Text>
          </Group>
          <Avatar
            src={null}
            alt="User avatar"
            radius="xl"
            className={classes.avatar}
            size="md"
          />
        </Group>
      </div>

      {/* Desktop Sidebar */}
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            {/* <MantineLogo size={28} /> */}
            <Code fw={700}>v3.1.2</Code>
            <Avatar
              src={null}
              alt="User avatar"
              radius="xl"
              className={classes.desktopAvatar}
              size="sm"
            />
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </a>

          <a
            href="#"
            className={classes.link}
            onClick={(event) => {
              event.preventDefault();
              handleLogout();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        size="xs"
        padding="md"
        title="Menu"
        className={classes.mobileDrawer}
      >
        <Stack gap="xs">
          {data.map((item) => (
            <Link
              key={`mobile-${item.label}`}
              to={item.link}
              className={classes.mobileLink}
              data-active={item.label === getActiveSection() || undefined}
              onClick={() => close()}
            >
              <item.icon className={classes.linkIcon} stroke={1.5} />
              <Text>{item.label}</Text>
            </Link>
          ))}

          <div className={classes.mobileDivider} />

          <a
            className={classes.mobileLink}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              close();
            }}
          >
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
            <Text>Change account</Text>
          </a>

          <a
            className={classes.mobileLink}
            href="#"
            onClick={(event) => {
              event.preventDefault();
              handleLogout();
              close();
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <Text>Logout</Text>
          </a>
        </Stack>
      </Drawer>

      {/* Main content area */}
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
}

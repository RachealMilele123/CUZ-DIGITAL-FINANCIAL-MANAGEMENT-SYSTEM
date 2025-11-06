import { useState, useEffect } from "react";
import {
  Burger,
  Container,
  Group,
  Paper,
  Transition,
  Stack,
  Text,
  Box,
  ThemeIcon,
} from "@mantine/core";
import { IconBuildingBank, IconShield } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import classes from "./component.module.css";

const links = [
  { link: "/", label: "Home" },
  { link: "/about-us", label: "About Us" },
  { link: "/contact", label: "Contact Us" },
  { link: "/login", label: "Login" },
  { link: "/register", label: "Register" },
];

export function Navigation() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    close();
  }, [location.pathname, close]);

  // Check if current path matches link
  const isActiveLink = (linkPath) => {
    if (linkPath === "/" && location.pathname === "/") return true;
    if (linkPath !== "/" && location.pathname.startsWith(linkPath)) return true;
    return false;
  };

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={isActiveLink(link.link) || undefined}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  const mobileItems = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.mobileLink}
      data-active={isActiveLink(link.link) || undefined}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <header className={classes.header}>
        <Container size="lg" className={classes.inner}>
          <Link to="/" onClick={close} style={{ textDecoration: "none" }}>
            <Group gap="xs" style={{ cursor: "pointer" }}>
              {/* Custom Logo Design */}
              <Box style={{ position: "relative" }}>
                <ThemeIcon
                  size={44}
                  radius="md"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 135 }}
                  style={{
                    boxShadow: "0 4px 12px rgba(34, 139, 230, 0.3)",
                  }}
                >
                  <IconBuildingBank size="1.6rem" stroke={2} />
                </ThemeIcon>
                <ThemeIcon
                  size={18}
                  radius="xl"
                  variant="gradient"
                  gradient={{ from: "green", to: "teal", deg: 45 }}
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    border: "2px solid white",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <IconShield size="0.7rem" stroke={2.5} />
                </ThemeIcon>
              </Box>

              {/* Mobile Logo Text */}
              <Box hiddenFrom="sm">
                <Text
                  size="lg"
                  fw={800}
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 45 }}
                  style={{ lineHeight: 1 }}
                >
                  FTB
                </Text>
                <Text
                  size="xs"
                  c="dimmed"
                  style={{ lineHeight: 1, marginTop: -2 }}
                >
                  Digital Bank
                </Text>
              </Box>

              {/* Desktop Logo Text */}
              <Box visibleFrom="sm">
                <Text
                  size="xl"
                  fw={800}
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 45 }}
                  style={{ lineHeight: 1 }}
                >
                  Forever Trust Bank
                </Text>
                <Text
                  size="xs"
                  c="dimmed"
                  style={{ lineHeight: 1, marginTop: 2 }}
                >
                  Digital Financial Management System
                </Text>
              </Box>
            </Group>
          </Link>

          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>

          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color="blue"
          />
        </Container>
      </header>

      {/* Mobile Navigation Overlay */}
      <Transition
        mounted={opened}
        transition="pop-top-right"
        duration={200}
        timingFunction="ease"
      >
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            <Stack gap="xs" p="md">
              {mobileItems}
            </Stack>
          </Paper>
        )}
      </Transition>
    </>
  );
}

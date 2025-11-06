import { useState, useEffect } from "react";
import {
  Burger,
  Container,
  Group,
  Image,
  Paper,
  Transition,
  Stack,
  Text,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import classes from "./component.module.css";
import logo from "../images/logo.png";

const links = [
  { link: "/", label: "Home" },
  { link: "/about", label: "About Us" },
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
          <Link to="/" onClick={close}>
            <Group gap="xs" style={{ cursor: "pointer" }}>
              <Image src={logo} alt="Forever Trust Bank" w={40} h={40} />
              <Box hiddenFrom="sm">
                <Text size="lg" fw={700} c="blue">
                  FTB
                </Text>
              </Box>
              <Box visibleFrom="sm">
                <Text size="lg" fw={700} c="blue">
                  Forever Trust Bank
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

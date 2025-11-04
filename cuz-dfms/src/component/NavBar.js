import { useState } from 'react';
import { Burger, Container, Group, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './component.module.css';
import logo from "../images/logo.png";
//import { Link } from 'react-router-dom';

const links = [
  { link: '/about', label: 'About Us' },
  { link: '/contact', label: 'Contact Us' },
  { link: '/login', label: 'Login' },
];

export function Navigation() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        // event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* <Link to="/"> */}
        <Image src={logo} alt="logo" style={{width: 100, height: 50}} />
        {/* </Link> */}
        
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
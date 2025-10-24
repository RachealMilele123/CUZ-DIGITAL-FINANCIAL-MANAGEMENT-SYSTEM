import cx from 'clsx';
import { Button, Container, Overlay, Text, Title } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          CUZ Digital Financial Management System{' '}
          <Text component="span" inherit className={classes.highlight}>
            any stack
          </Text>
        </Title>

        <Container size={640}>
    
         <Text size="sm" c="dimmed" ta="center">
           Where transparency meets technology.
         </Text>

          <Text size="lg" className={classes.description} font='White'>
           Simplify school finance management.
        collect fees, track expenses, and generate reports with ease.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg" ho>
            Get started
          </Button>
          <Button className={cx(classes.control, classes.secondaryControl)} size="lg">
            Login To DashBoard
          </Button>
        </div>
      </div>
    </div>
  );
}
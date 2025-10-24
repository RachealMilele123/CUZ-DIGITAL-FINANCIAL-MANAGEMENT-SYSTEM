
import logo from './logo.svg';
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import StepperProgress from "../src/component/Stepper"
import { Login } from './auth/Login';
import { Hero } from './landingPage/Hero';



function App() {



  return (
  <MantineProvider>
    {/* <StepperProgress /> */}
    <Login />
    <Hero/>

    
    
  </MantineProvider>

  );
}

export default App; 

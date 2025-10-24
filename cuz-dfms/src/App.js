
import logo from './logo.svg';
import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import StepperProgress from "../src/component/Stepper"
import { Login } from './auth/Login';


function App() {



  return (
  <MantineProvider>
    {/* <StepperProgress /> */}
    <Login />

    
    
  </MantineProvider>

  );
}

export default App; 

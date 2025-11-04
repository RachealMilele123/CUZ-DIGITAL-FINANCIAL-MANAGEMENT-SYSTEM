
import './App.css';
import { MantineProvider } from '@mantine/core';
import { Login } from './auth/Login';
import { Hero } from './landingPage/Hero';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from './component/NavBar';
import ContactUs from "./landingPage/contactUs";
import { ForgotPassword } from './auth/ForgotPassword';
import { ChooseAccountType } from './register/ChooseAccountType';
import { StudentAccountRegister } from './register/StudentAccountRegister';
import { Overview } from './dashBoard/overview';
import AuthStepper from './auth/AuthStepper';



function App() {



  return (
    
  <MantineProvider>
    <Navigation />
    <Router>
      <Routes>
        <Route path = "/" element={<Hero />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/contact" element={<ContactUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/choose-account" element={<ChooseAccountType />} />
        <Route path="/register" element={<AuthStepper />} />
        <Route path="/overview" element={<Overview />} />
         <Route path="/contact" element={<ContactUs />} />


      </Routes>
    </Router>
      


    
    
  </MantineProvider>

  );
}

export default App; 

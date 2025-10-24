
import './App.css';
import { MantineProvider } from '@mantine/core';
import { Login } from './auth/Login';
import { Hero } from './landingPage/Hero';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from './component/NavBar';
import { ContactUs } from './landingPage/contactUs';


function App() {



  return (
    
  <MantineProvider>
    <Navigation />
    <Router>
      <Routes>
        <Route path = "/" element={<Hero />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/contact" element={<ContactUs />} />

      </Routes>
    </Router>


    
    
  </MantineProvider>

  );
}

export default App; 

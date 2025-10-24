
import './App.css';
import { MantineProvider } from '@mantine/core';
import { Login } from './auth/Login';
import { Hero } from './landingPage/Hero';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {



  return (
    
  <MantineProvider>
    <Router>
      <Routes>
        <Route path = "/" element={<Hero />} />
        <Route path = "/login" element={<Login />} />
        {/* <Route path = "/dashboard" element={<DashBoard />} /> */}

      </Routes>
    </Router>


    
    
  </MantineProvider>

  );
}

export default App; 

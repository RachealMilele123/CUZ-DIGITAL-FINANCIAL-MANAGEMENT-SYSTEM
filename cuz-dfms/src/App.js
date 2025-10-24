
import './App.css';
import { MantineProvider } from '@mantine/core';
import { Login } from './auth/Login';
import { Hero } from './landingPage/Hero';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from './component/NavBar';


function App() {



  return (
    
  <MantineProvider>
    <Navigation />
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

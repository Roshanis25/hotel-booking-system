import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen'; 
import BookingScreen from './screens/BookingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          {/* Main Routes */}
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/book/:roomid/:fromdate/:todate" element={<BookingScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          
          {/* Default Route */}
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
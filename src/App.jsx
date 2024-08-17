import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaymentPage from './components/Payment'; // To'lov sahifasiga nisbatan to'g'ri yo'lni kiritishingiz kerak
import Registration from './components/Registration'; // Bosh sahifa uchun yana bir misol

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Thanks from './components/Thanks';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/payment/:course/:fullName/:phoneNumber/:tarif" element={<PaymentPage />} />
        <Route path="/payment/:course/:fullName/:phoneNumber/:tarif/thankyou" element={<Thanks />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

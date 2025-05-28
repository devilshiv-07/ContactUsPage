import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomepageContactForm"
import ContactPage from "./components/pages/ContactUsPage"
import Navbar from "./components/shared/Navbar"

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/contact" element={<ContactPage />}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;

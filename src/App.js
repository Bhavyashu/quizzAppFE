import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import FrontPage from "./components/Frontpage.js";
import Dashboard from "./components/Dashboard.js";
import Login from "./components/Login";
import Register from "./components/Register";
import LanguageDetails from "./components/LanguageDetails.js";
import ExerciseList from "./components/ExerciseList"; // Adjust the import path
import QuizComponent from "./components/Quiz.js";
import toast, { Toaster } from 'react-hot-toast';
// import './App.css'; // Import your CSS file

function App() {
  return (
    <>
       <Toaster />
      <Router>
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/exercises/:languageID" component={<ExerciseList />} /> */}
          <Route path="/exercises/:languageId" element={<ExerciseList />} />
          <Route path="/quiz/:exerciseId/:languageId" element={<QuizComponent />} />

        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;

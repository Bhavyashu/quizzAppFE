import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import FrontPage from "./components/Frontpage.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboard from "./pages/leaderboard.js";
import ExerciseList from "./pages/ExerciseList"; // Adjust the import path
import QuizComponent from "./pages/Quiz.js";
import UserProgress from "./pages/userProgress";
import toast, { Toaster } from 'react-hot-toast';
import "./App.css"

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
          <Route path="/exercises/:languageId" element={<ExerciseList />} />
          <Route path="/quiz/:exerciseId/:languageId" element={<QuizComponent />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path= "/userProgress" element={<UserProgress />} />

        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;

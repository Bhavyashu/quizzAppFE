import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from '@mui/joy/Box';
import axios from 'axios'; // Import axios for making HTTP requests
import "./progress.css"; // Import your CSS file for styling
import base_url from "../constants";

const customStyle = {
  backgroundColor: '#444',
};
const progressBar = {
  // backgroundColor: '#0F0F0F',
  // color: 'yellow'
};

const UserProgressPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/user/progress`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
     
        const userProgressData = response.data.data;
        setUserData(userProgressData);
      } catch (error) {
        // Handle error
        console.error("Error fetching user progress data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="user-progress-page">
      {userData.map((language) => (
        <div key={language._id} className="language-details">
          <h2>{language.name}</h2>
          <div className="language-info">
            <p>Total Score: {language.total_score}</p>
            <p>User Score: {language.score}</p>
            <p>Proficiency: {language.proficiency}</p>
          </div>
          <div className="exercises-container">
            {language.userProgress.map((exercise) => (
              <div key={exercise.exerciseName} className="exercise-card">
                <h3>{exercise.exerciseName}</h3>
                <div className="exercise-info">
                  <p>Questions: {exercise.totalQuestions}</p>
                  <p>Completed: {exercise.completedQuestions}</p>
                </div>
                <div className="progress-bar">
                  <div className="circular-progress" style={customStyle}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                  <CircularProgress
                    aria-label="Loading..."
                    size="lg"
                    determine 
                    value={(exercise.completedQuestions / exercise.totalQuestions) * 100}
                    color="warning"
                    showValueLabel={true}
                  />
                    </Box>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProgressPage;

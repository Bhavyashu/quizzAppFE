import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from '@mui/joy/Box';
import  toast  from "react-hot-toast";
import { get } from "../api/api";

const customStyle = {
  backgroundColor: '#444',
};
/**
 * UserProgressPage is a React functional component that displays user progress data.
 * It fetches user progress data from the server and renders it in a structured format.
 */
const UserProgressPage = () => {
  const navigate = useNavigate(); 
  /**
   * State variable to store user progress data.
   * @type {Array}
   */
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    /**
     * Fetch user progress data from the server and update the state with the response data.
     */
    const fetchData = async () => {
      try {
        const endpoint = `/user/progress`
        const data = await get(endpoint);
        
        /**
         * Data containing user progress details.
         * @type {Array}
         */
        if(!data){
          toast.error("error fetching user progress data from backend server");
        }
        if(!data.length){
          toast('You have not attended any questions in any languages, please comeback once you answered them', {
            icon: `😕`,
          });
        }

        setUserData(data);

      } catch (error) {
        toast.error("error setting user progress data");
        console.error("Error fetching user progress data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="user-progress-page">
      {userData.map((language) => (
        <div key={language._id} className="language-details">
          <h2 style={{color: '#CE5A67'}}>{language.name}</h2>
          <div className="language-info">
            <p>Total Score: {language.total_score}</p>
            <p>Your Score: {language.score}</p>
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
                    size="lg"
                    sx={{
                    backgroundColor: '',
                    color : 'black',
                    }}
                    determinate value={(exercise.completedQuestions / exercise.totalQuestions) * 100}
                    color="primary"
                    showValueLabel={true}
                    variant="outlined"
                  >
                    {(exercise.completedQuestions / exercise.totalQuestions) * 100 +"%"}
                    </CircularProgress>
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

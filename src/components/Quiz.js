import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from '../images/quiz-bg.jpeg';
import base_url from '../constants';
import toast from 'react-hot-toast';
import '../App.css';







const QuizPage = () => {
  const { exerciseId, languageId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);


  const verifyAnswer = async (question, selectedAnswer) => {
    try {
      const endpoint = `${base_url}/quiz/verifyAnswer`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          qid: question._id,
          answer: selectedAnswer,
          difficulty: question.Difficulty_level,
          excerId: exerciseId,
          langId: languageId,
        }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        if(Object.keys(data).length>1){
        if(data.previousAnswer){
          toast('Good Job! Right Answer', {
            icon: `✅`,
            className: 'bigger-toast',
          });
        }else if(!data.previousAnswer){
          toast(`Wrong Answer! Try again later`, {
            icon:'😤',
          });
        }
        return data; // Return the next question
        }else{
          toast(' MAD RESPECT ! You have answered all the questions for this exercise please check another exercise !', {
            icon: '🫡',
          });
        }
      } else if (response.status === 500) {
        console.error('Internal error occurred');
        toast.error('Internal error occurred');
      } else {
        console.error('Failed to verify answer');
        toast.error('Failed to verify answer');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while verifying the answer');
    }
  
    return null; // Return null if there was an error
  };

  async function fetchQuestion() {
    try {
      setQuestion({});
      const endpoint = `${base_url}/quiz/question?eid=${exerciseId}&lid=${languageId}`;
      const response = await fetch(endpoint,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );;

      if (response.ok) {
        const data = await response.json();
        setQuestion(data);
      } else {
        console.error('Failed to fetch question');
      }
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    return () => {
      setQuestion({}); // Clear question when unmounting
    };
  }, []);

  
  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer === answer) {
      setSelectedAnswer(null); // Deselect the option
    } else {
      setSelectedAnswer(answer);
    }
  }

  const handleVerifyAnswer = async () => {
    if (selectedAnswer === null) {
      toast.error("Please select an answer");
    } else {
      const nextQuestion = await verifyAnswer(question, selectedAnswer);
      if (nextQuestion) {
        setQuestion(nextQuestion); // Update the question with the next question
        setSelectedAnswer(null); // Clear the selected answer for the next question
      }
    }
  };

  return (
    <div className="quiz-main-container">
      <div className="quiz-blur-background" />
      <div className="quiz-modal">
        {loading ? (
          <div className="loading-card">Verifying Answer...</div>
        ) : (
          question.Question && (
          <div className="quiz-content">
            <div className="quiz-question">
              <p>{question.Question}</p>
            </div>
            <div className="quiz-options">
              {question.Answer && question.Answer.map((answer, index) => (
                <div
                  key={index}
                  className={`option ${selectedAnswer === answer ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(answer)}
                >
                  {answer}
                </div>
              ))}
            </div>
            <div className="quiz-buttons">
              <button className="back-button" onClick={() => navigate(-1)}>Back</button>
              <button className="verify-button" onClick={handleVerifyAnswer}>
                Verify Answer
              </button>
            </div>
          </div>
          )
        )}
      </div>
    </div>
  );
  
}

export default QuizPage;

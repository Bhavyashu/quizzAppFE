import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { get, post } from "../api/api";




/**
 * QuizPage is a React component that handles the display and verification of quiz questions.
 *
 * @returns {JSX.Element} The rendered QuizPage component.
 */
const QuizPage = () => {
  const { exerciseId, languageId } = useParams();
  const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);


   /**
   * Verifies the selected answer for the current question.
   * Makes an API request to verify the answer.
   *
   * @param {Object} question - The current question.
   * @param {string} selectedAnswer - The selected answer.
   * @returns {Object} The next question or null.
   */

  const verifyAnswer = async (question, selectedAnswer) => {
    try {
      const endpoint = `/quiz/verifyAnswer`;

      const requestData  = {
        qid: question._id,
        answer: selectedAnswer,
        difficulty: question.Difficulty_level,
        excerId: exerciseId,
        langId: languageId,
      }
      const data = await post(endpoint, requestData);

      if (!data) {
        toast.error("Failed to fetch questions");
        throw new Error("Failed to fetch questions");
      }
  
      if (data) {
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
          setTimeout(() => {
            navigate(-1);
          }, 1000);
        }
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

  /**
   * Fetches the current appropriate level wise question from the server for this user.
   */

  async function fetchQuestion() {
    try {
      setQuestion({});

      const data = await get(
        `/quiz/question?eid=${exerciseId}&lid=${languageId}`
      );

      if (!data) {
        toast.error("Failed to fetch questions");
        throw new Error("Failed to fetch questions");
      }

      if (data) {
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

  /**
   * Handles the selection of an answer option.
   *
   * @param {string} answer - The selected answer.
   */
  const handleAnswerSelect = (answer) => {
    if (selectedAnswer === answer) {
      setSelectedAnswer(null); // Deselect the option
    } else {
      setSelectedAnswer(answer);
    }
  }

  /**
   * Handles the verification of the selected answer.
   * If an answer is selected, it verifies the answer with the server.
   */
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
        {(
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

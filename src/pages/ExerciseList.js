import base_url from "../constants";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


/**
 * ExerciseList is a React component that displays a list of exercises for a specific language.
 *
 * @returns {JSX.Element} The rendered ExerciseList component.
 */
function ExerciseList() {
  const navigate = useNavigate();

  const { languageId } = useParams();
  const [exercises, setExercises] = useState([]);
  const [exerciseFetched, setExerciseFetched] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Navigates back to the previous page.
   */
  const handleBackClick = () => {
    navigate(-1);
  };

  const cardStyles = {
    border: "2px solid #3498db",
    borderRadius: "10px",
    width: "18rem",
    margin: "20px",
    padding: "10px",
    background: "#292b2c",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    display: "inline-block",
    margin: "20px",
    padding: "10px",
    background: "#292b2c", // Dark background color
    color: "white",
  };

  const cardContainerStyles = {
    display: "flex",
    flexDirection: "column",
    height: "100%", // Set a fixed height for the container
  };

  useEffect(() => {
    /**
     * Fetches exercises for the specified language from the API.
     */
    const fetchExercises = async () => {
      try {
        const response = await fetch(
          `${base_url}/quiz/exercises?language_id=${languageId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          toast.error("Failed to fetch exercises");
        }

        const {data} = await response.json();
        setExerciseFetched(true);
        setExercises(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchExercises();
  },[]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="exercise-background-container">
      <div className="background-image-container">
      </div>
      <div
        style={{ position: "relative" }}
      >
        <div
          style={{
            background: "rgba(0, 0, 0, 0.6)", // Black background with 60% opacity
            padding: "10px",
            borderRadius: "4px",
            marginTop: "5%",
            display: "inline-block",
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{
              fontSize: "24px",
              color: "#fff",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={handleBackClick}
          />
          <span style={{ color: "#fff", fontFamily: "Arial, sans-serif" }}>
            Back
          </span>
        </div>
        {(exercises.length === 0 && exerciseFetched) ? (
          // Display modal when no exercises are available
          <div className="exer-modal">
            <div className="modal-content">
              <p>
                Our Team is currently working on making exercise for this language
                Until then, please try another language.
              </p>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center", // Center the cards horizontally
              margin: "0 20px",
            }}
          >
            {exercises.map((exercise) => (
              <div className="card" style={cardStyles} key={exercise._id}>
                <div className="card-body" style={cardContainerStyles}>
                  <div className="card-body">
                    <h5 className="card-title">{exercise.name}</h5>
                    <p className="card-text">
                      <strong>Description:</strong>
                      <div
                        style={{
                          maxHeight: "120px",
                          overflow: "auto",
                        }}
                      >
                        {exercise.description}
                      </div>
                      <br />
                      <strong>Questions:</strong> {exercise.Questions}
                      <div className="progress">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{
                            width: `${
                              (exercise.completed / exercise.Questions) * 100
                            }%`,
                          }}
                          aria-valuenow={
                            (exercise.completed / exercise.Questions) * 100
                          }
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {Math.round(
                            (exercise.completed / exercise.Questions) * 100
                          )}
                          %
                        </div>
                      </div>
                      {exercise.completed !== exercise.Questions && ( // Conditional rendering for "Attend Quiz" button
                        <div style={{ marginTop: "10px" }}>
                          <Link
                            to={`/quiz/${exercise._id}/${languageId}`}
                            className="btn btn-primary"
                          >
                            Attend Quiz
                          </Link>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
}

export default ExerciseList;

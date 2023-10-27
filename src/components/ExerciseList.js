import base_url from "../constants";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ExerciseList({ languageId }) {

  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);

  const cardStyles = {
    border: "2px solid #3498db",
    borderRadius: "10px",
    width: "18rem",
    display: "inline-block",
    margin: "20px",
    padding: "10px",
    background: "#292b2c", // Dark background color
    color: "white",
  };

  const backButtonStyles = {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "50%",
    padding: "10px",
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
    fontSize: "20px",
  };

  const handleBackClick = () => {
    navigate(-1)
  };

  useEffect(() => {
    // Fetch exercises for the selected language based on the languageId
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
          throw Error("Failed to fetch exercises");
        }

        const data = await response.json();
        setExercises(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchExercises();
  }, [languageId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: "8%", position: "relative" }}>
      {/* <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ fontSize: "24px", marginRight: "10px", cursor: "pointer" }}
          onClick={handleBackClick}
        />
        <span>Back</span>
      </div> */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          margin: "0 20px",
        }}
      >
        {exercises.map((exercise) => (
          <div
            className="card border border-primary"
            style={cardStyles}
            key={exercise._id}
          >
            <div className="card-body">
              <h5 className="card-title">{exercise.name}</h5>
              <p className="card-text">
                <strong>Description:</strong> {exercise.description}
                <br />
                <strong>Questions:</strong> {exercise.Questions}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseList;

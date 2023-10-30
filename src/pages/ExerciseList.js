import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ExerciseCard } from "../components/common/Cards"
import { NoExercisesModal } from "../components/common/Modals";
import { get } from "../api/api"
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

  useEffect(() => {
    /**
     * Fetches exercises for the specified language from the API.
     */
    const fetchExercises = async () => {
      try {
        const data = await get(
          `/quiz/exercises?language_id=${languageId}`
        );

        if (!data) {
          toast.error("Failed to fetch exercises");
          throw new Error("Failed to fetch exercises");
        }
        console.log("here I am");
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
        {exercises.length === 0 && exerciseFetched ? (
          <NoExercisesModal />
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
              <ExerciseCard exercise={exercise} languageId={languageId} key={exercise._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
}

export default ExerciseList;

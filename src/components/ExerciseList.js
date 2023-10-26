// import base_url from "../constants";
// import React, { useEffect, useState } from "react";

// function ExerciseList({ languageId }) {
//   const [exercises, setExercises] = useState([]);
//   const [error, setError] = useState(null);

//   const cardStyles = {
//     border: "1px solid #e2e2e2",
//     width: "18rem",
//     display: "inline-block",
//     margin: "40px 40px 40px 40px", // Add margin to the left
//   };

//   const containerStyles = {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "flex-start",
//   };

//   const backButtonStyles = {
//     position: "absolute",
//     top: "10px",
//     left: "10px",
//     background: "white",
//     border: "1px solid #ccc",
//     borderRadius: "50%",
//     padding: "10px",
//     textDecoration: "none",
//     color: "black",
//     cursor: "pointer",
//     fontSize: "20px",
//   };

//   const handleBackClick = () => {
//     window.history.back();
//   };

//   useEffect(() => {
//     // Fetch exercises for the selected language based on the languageId
//     const fetchExercises = async () => {
//       try {
//         const response = await fetch(
//           `${base_url}/quiz/exercises?language_id=${languageId}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch exercises");
//         }

//         const data = await response.json();
//         setExercises(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchExercises();
//   }, [languageId]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div style={{ marginTop: "8%", position: "relative" }}>
//       <div style={containerStyles}>
//         {exercises.map((exercise) => (
//           <div
//             className="card exercise-card"
//             style={cardStyles}
//             key={exercise._id}
//           >
//             <div className="card-body">
//               <h5 className="card-title">{exercise.name}</h5>
//               <p className="card-text">
//                 <strong>Description:</strong> {exercise.description}
//                 <br />
//                 <strong>Questions:</strong> {exercise.Questions}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ExerciseList;


import base_url from "../constants";
import React, { useEffect, useState } from "react";

function ExerciseList({ languageId }) {
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

  const containerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    margin: "0 20px", // Adjust margin for even spacing
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
    window.history.back();
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
          throw new Error("Failed to fetch exercises");
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
      <div style={containerStyles}>
        {exercises.map((exercise) => (
          <div className="card exercise-card" style={cardStyles} key={exercise._id}>
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

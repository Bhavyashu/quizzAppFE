

import base_url from '../constants';
import React, { useState, useEffect } from "react";
import ExerciseList from "./ExerciseList";

function LanguageCard({ language, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(language._id);
  };

  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{language.name}</h5>
          <p className="card-text">
            Proficiency: {language.proficiency}
            <br />
            Score: {language.score}
          </p>
          <button onClick={handleCardClick} className="btn btn-primary">
            Click me
          </button>
        </div>
      </div>
    </div>
  );
}

function LanguageCards() {
  const [data, setData] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from your API
    fetch(`${base_url}/quiz/languages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setData(data.data);
        } else {
          setError("Invalid API response structure");
        }
      })
      .catch((err) => setError(err));
  }, []);

  const handleCardClick = (languageId) => {
    setSelectedLanguageId(languageId);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {selectedLanguageId ? (
        <ExerciseList languageId={selectedLanguageId} />
      ) : (
        <div className="row" style={{ marginTop: "8%" }}>
          {data.map((item) => (
            <LanguageCard
              key={item.language._id}
              language={item.language}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageCards;


// import base_url from '../constants';
// import React, { useState, useEffect } from "react";
// import ExerciseList from "./ExerciseList";

// // Define CSS styles for the card
// const cardStyle = {
//   background: "white",
//   color: "black",
//   border: "2px solid #007BFF",
//   borderRadius: "10px",
//   margin: "20px",
//   padding: "15px",
//   boxShadow: "0 0 10px rgba(0,0,0,0.2)",
// };

// function LanguageCard({ language, onCardClick }) {
//   const handleCardClick = () => {
//     onCardClick(language._id);
//   };

//   return (
//     <div className="col-md-4">
//       <div className="card" style={cardStyle}>
//         <div className="card-body">
//           <h5 className="card-title">{language.name}</h5>
//           <p className="card-text">
//             Proficiency: {language.proficiency}
//             <br />
//             Score: {language.score}
//           </p>
//           <button onClick={handleCardClick} className="btn btn-primary">
//             Click me
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function LanguageCards() {
//   const [data, setData] = useState([]);
//   const [selectedLanguageId, setSelectedLanguageId] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch data from your API
//     fetch(`${base_url}/quiz/languages`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.data && Array.isArray(data.data)) {
//           setData(data.data);
//         } else {
//           setError("Invalid API response structure");
//         }
//       })
//       .catch((err) => setError(err));
//   }, []);

//   const handleCardClick = (languageId) => {
//     setSelectedLanguageId(languageId);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="container">
//       {selectedLanguageId ? (
//         <ExerciseList languageId={selectedLanguageId} />
//       ) : (
//         <div className="row" style={{ marginTop: "8%" }}>
//           {data.map((item) => (
//             <LanguageCard
//               key={item.language._id}
//               language={item.language}
//               onCardClick={handleCardClick}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default LanguageCards;

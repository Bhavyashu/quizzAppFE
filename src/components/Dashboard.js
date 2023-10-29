// import React, { useState, useEffect } from "react";
// import ExerciseList from "./ExerciseList";
// import base_url from "../constants";

// function LanguageCard({ language:card, onCardClick }) {
//   const handleCardClick = () => {
//     onCardClick(card.language._id);
//   };

//   return (
//     <div className="col-md-4 mb-4">
//       <div className="card border border-primary">
//         <div className="card-body">
//           <h5 className="card-title">{card.language.name}</h5>
//           <p className="card-text">
//             Proficiency: {card.proficiency}
//             <br />
//             Score: {card.score}
//           </p>
//           <button
//             onClick={handleCardClick}
//             className="btn btn-primary btn-block"
//           >
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
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${base_url}/quiz/languages`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const data = await response.json();

//         if (data && data.data && Array.isArray(data.data.preffered_languge)) {
//           // console.log(data.data.preffered_languge);
//           setData(data.data.preffered_languge);
//         } else {
//           setError("Invalid API response structure");
//         }
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCardClick = (languageId) => {
//     setSelectedLanguageId(languageId);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="container" style={{ paddingTop: "80px" }}>
//       {selectedLanguageId ? (
//         <ExerciseList languageId={selectedLanguageId} />
//       ) : (
//         <div className="row mt-4">
//           {data.map((item) => {
//             console.log(`this is the key for lang_id :  ${item.language._id}`);
//             return (
//               <LanguageCard
//                 key={item.language._id}
//                 language={item}
//                 onCardClick={handleCardClick}
//               />
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default LanguageCards;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link to handle navigation
import ExerciseList from "./ExerciseList";
import base_url from "../constants";
import bgImage from "../images/lan.jpg"

function LanguageCard({ language: card }) {
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card border border-primary"
        style={{ backgroundColor: "#222", color: "#fff" }}
      >
        <div className="card-body">
          <h5 className="card-title">{card.language.name}</h5>
          <p className="card-text" style={{ color: "#999" }}>
            Proficiency: {card.proficiency}
            <br />
            Score: {card.score}
          </p>
          {/* Wrap the card with Link to navigate to exercise details */}
          <Link to={`/exercises/${card.language._id}`}>
            <button
              className="btn btn-primary btn-block"
              style={{ backgroundColor: "#007bff", color: "#fff" }}
            >
              Explore Excercise
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function LanguageCards() {
  const [data, setData] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  const [error, setError] = useState(null);
  const name = localStorage.getItem('name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}/quiz/languages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data && data.data && Array.isArray(data.data.preffered_languge)) {
          console.log("heere2");
          setData(data.data.preffered_languge);
        } else {
          setError("Invalid API response structure");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="language-container">
      <div className="container" style={{ paddingTop: "80px" }}>
      <div style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px', color: '#292B3A;' }}>
      <h1>Hey, <span style={{ textTransform: 'capitalize' }}>{name}</span> 👋</h1>
      </div>
      <h3 style={{ color: '#CE5A67', textAlign: 'center' }}>Your Selected Languages</h3>
      <div className="row mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
          {data.map((item) => {
            console.log(`this is the item ${item}`);
            return <LanguageCard key={item.language._id} language={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default LanguageCards;

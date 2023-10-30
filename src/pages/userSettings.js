// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import ExerciseList from "./ExerciseList";
// import base_url from "../constants";
// import bgImage from "../images/lan.jpg"

// function LanguageCard({ language: card }) {
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
//   const [languageToReset, setLanguageToReset] = useState(null);

//   const handleResetClick = (languageId) => {
//     setLanguageToReset(languageId);
//     setShowResetModal(true);
//   };

//   const resetLanguage = async () => {
//     try {
//       const response = await fetch(`${base_url}/quiz/reset-progress/${languageToReset}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       });

//       if (response.ok) {
//         // Handle success
//         // You might want to reload the data here or update the UI
//       } else {
//         // Handle error
//       }
//     } catch (err) {
//       // Handle error
//     }
//   };

//   return (
//     <div className="col-md-4 mb-4">
//       <div className="card border border-primary" style={{ backgroundColor: "#222", color: "#fff" }}>
//         <div className="card-body">
//           <h5 className="card-title">{card.language.name}</h5>
//           <p className="card-text" style={{ color: "#999" }}>
//             Proficiency: {card.proficiency}
//             <br />
//             Score: {card.score}
//           </p>
//           <Link to={`/exercises/${card.language._id}`}>
//             <button
//               className="btn btn-primary btn-block"
//               style={{ backgroundColor: "#007bff", color: "#fff" }}
//             >
//               Explore Exercise
//             </button>
//           </Link>
//           <button
//             className="btn btn-danger btn-block"
//             style={{ backgroundColor: "#FF0000", color: "#fff" }}
//             onClick={() => handleResetClick(card.language._id)}
//           >
//             Reset Progress
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
//   const name = localStorage.getItem('name');

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
//         if (data && data.data && Array.isArray(data.data.preferred_language)) {
//           setData(data.data.preferred_language);
//         } else {
//           setError("Invalid API response structure");
//         }
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleAddLanguageClick = () => {
//     setShowAddLanguageModal(true);
//     // Fetch available languages and update state if needed
//   };

//   const addLanguage = async () => {
//     // Implement the logic to add a new language
//     try {
//       // Send a request to add the language
//       // You can update the state with the new language if needed
//     } catch (err) {
//       // Handle error
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="language-container">
//       <div className="container" style={{ paddingTop: "80px" }}>
//         <div style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px', color: '#292B3A;' }}>
//           <h1>Hey, <span style={{ textTransform: 'capitalize' }}>{name}</span> 👋</h1>
//         </div>
//         <h3 style={{ color: '#CE5A67', textAlign: 'center' }}>Your Selected Languages</h3>
//         <div className="row mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
//           {data.map((item) => {
//             return <LanguageCard key={item.language._id} language={item} />;
//           })}
//         </div>
//         <button onClick={handleAddLanguageClick} className="btn btn-primary">
//           Add Language
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LanguageCards;

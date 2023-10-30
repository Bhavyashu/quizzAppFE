import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link to handle navigation
import base_url from "../constants";

/**
 * LanguageCard is a React component that represents a card displaying information about a language.
 *
 * @param {object} props - The properties for the LanguageCard component.
 * @param {object} props.language - The language information to display on the card.
 * @returns {JSX.Element} The rendered LanguageCard component.
 */

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

/**
 * LanguageCards is a React component that displays a list of selected languages.
 *
 * @returns {JSX.Element} The rendered LanguageCards component.
 */
function Dashboard() {
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
      <h1>Hey, <span style={{ textTransform: 'capitalize'  }}>{name}</span> 👋</h1>
      </div>
      <h3 style={{ color: '#CE5A67', textAlign: 'center' }}>Your Selected Languages</h3>
      <div className="row mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
          {data.map((item) => {
            return <LanguageCard key={item.language._id} language={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

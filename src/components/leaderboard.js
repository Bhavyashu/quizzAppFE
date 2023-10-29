import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import base_url from "../constants";
import userPng from "../images/leaderboardUser.png";
import scorePng from "../images/score.png";
import profPng from "../images/prof-level.jpeg";

const Leaderboard = () => {
  // Hardcoded sample data for the global leaderboard
  const [globalLeaderboardData, setGlobalLeaderboardData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("global");
  const [languages, setLanguages] = useState([]);
  const [customLeaderboardData, setCustomLeaderboardData] = useState([]);

  // custom function  :
  const fetchDefaultLeaderBoard = async () => {
    try {
      const response = await axios.get(`${base_url}/leaderboard/global`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status != 200) {
        toast.error("Failed to fetch global leaderboard");
      }
      const { data } = response;

      setGlobalLeaderboardData(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Fetch the list of languages from an endpoint
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`${base_url}/admin/getLanguages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.status != 200) {
          toast.error("Failed to fetch exercises");
        }

        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    fetchDefaultLeaderBoard();
  }, []);

  // Function to handle language selection and fetch custom leaderboards
  const handleLanguageSelect = async (languageId) => {
    if (languageId === "global") {
      fetchDefaultLeaderBoard();
    } else {
      try {
        // Fetch custom leaderboard data based on the selected language using Axios
        // Replace 'your_custom_leaderboard_endpoint' with the actual API endpoint
        const response = await axios.get(
          `${base_url}/leaderboard/language?lid=${languageId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const { data } = response;
        
        setCustomLeaderboardData(data); // Assuming the data is an array of leaderboard items
      } catch (error) {
        console.error("Error fetching custom leaderboard:", error);
      }
    }
    setSelectedLanguage(languageId);
  };

  // Function to render dropdown options
  const renderLanguageOptions = () => {
    return (
      <select
        value={selectedLanguage}
        onChange={(e) => handleLanguageSelect(e.target.value)}
      >
        <option value="global">Global Leaderboard</option>

        {languages.map((language) => (
          <option key={language._id} value={language._id}>
            {language.name}
          </option>
        ))}
      </select>
    );
  };

  // Function to render leaderboard cards based on the selected language
  const renderLeaderboardCards = () => {
    const leaderboardData =
      selectedLanguage === "global"
        ? globalLeaderboardData
        : customLeaderboardData;

    return leaderboardData.map((candidate, index) => (
      <div key={index} className="candidate-card">
        <div className="card-header">
          <div className="user-info">
            <h3 style={{}}>{candidate.name}</h3>
          </div>
          <div className="user-icon">
            <img src={userPng} alt="Candidate Icon" className="icon" />
          </div>
        </div>
        <div className="card-content">
          <div className="container">
            {/* <img src={profPng} alt="Language Icon" className="icon" /> */}
            <p>{` Language: ${candidate.preffered_languages[0].language}`}</p>
            {/* <img src={scorePng} alt="Score Icon" className="icon" /> */}
            <p>{`Score: ${candidate.preffered_languages[0].score}`}</p>
            {/* <img
            src={profPng}
            alt="Proficiency Icon"
            className="icon"
          />/ */}
            <p>{`Level: ${candidate.preffered_languages[0].proficiency || "N/A"}`}</p>
          </div>
          {candidate.preffered_languages.length > 1 && (
            <div className="container">
              <p>Other Languages:</p>
              {candidate.preffered_languages.slice(1).map((lang, langIndex) => (
                <p key={langIndex}>{`${lang.language}: ${lang.score}`}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="leaderboard-page">
      {/* Language Selection Dropdown */}
      <div style={{ marginTop: "4%" }}>{renderLanguageOptions()}</div>

      {/* Render Leaderboard Cards */}
      <div className="leaderboard-cards">{renderLeaderboardCards()}</div>
    </div>
  );
};

export default Leaderboard;

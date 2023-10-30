import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import userPng from "../images/leaderboardUser.png";
import { get} from "../api/api";


/**
 * Leaderboard is a React component that displays a leaderboard with language selection options.
 *
 * @returns {JSX.Element} The rendered Leaderboard component.
 */
const Leaderboard = () => {
  const [globalLeaderboardData, setGlobalLeaderboardData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("global");
  const [languages, setLanguages] = useState([]);
  const [customLeaderboardData, setCustomLeaderboardData] = useState([]);

  /**
   * Fetches the default global leaderboard data from the API.
   */
  const fetchDefaultLeaderBoard = async () => {
    try {
      const data = await get(`/leaderboard/global`);

      // if (response.status !== 200) {
      //   toast.error("Failed to fetch global leaderboard");
      setGlobalLeaderboardData(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  /**
   * Fetches the list of languages from the API.
   */
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const data = await get(`/admin/getLanguages`);
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

   /**
   * Handles language selection and fetches custom leaderboards based on the selected language.
   * @param {string} languageId - The selected language ID.
   */
  const handleLanguageSelect = async (languageId) => {
    if (languageId === "global") {
      fetchDefaultLeaderBoard();
    } else {
      try {
        const data = await get(`/leaderboard/language?lid=${languageId}`);
        setCustomLeaderboardData(data); 
      } catch (error) {
        console.error("Error fetching custom leaderboard:", error);
      }
    }
    setSelectedLanguage(languageId);
  };

   /**
   * Renders language selection dropdown options.
   * @returns {JSX.Element} Language selection dropdown.
   */
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

   /**
   * Renders leaderboard cards based on the selected language.
   * @returns {JSX.Element} Leaderboard cards.
   */
  const renderLeaderboardCards = () => {
    const leaderboardData =
      selectedLanguage === "global"
        ? globalLeaderboardData
        : customLeaderboardData;

    return leaderboardData.map((candidate, index) => (
      <div key={index} className="candidate-card">
        <div className="card-header">
          <div className="user-info">
            <h3 style={{textTransform: 'capitalize'}}>{candidate.name}</h3>
          </div>
          <div className="user-icon">
            <img src={userPng} alt="Candidate Icon" className="icon" />
          </div>
        </div>
        <div className="card-content">
          <div className="container">
            <p>{` Language: ${candidate.preffered_languages[0].language}`}</p>
            <p>{`Score: ${candidate.preffered_languages[0].score}`}</p>
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

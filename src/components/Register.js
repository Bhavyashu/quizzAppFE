import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InputField from "./services/ InputField";
import LanguageSelection from "./services/selectionBox";
import toast from 'react-hot-toast';
import axios from 'axios';
import base_url from "../constants";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [languages, setLanguages] =  useState({}); // State to hold available languages
  const sampleLanguages = ["English", "French", "Japanese", "Portuguese"];
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [searchedLanguages, setSearchedLanguages] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  // Fetch available languages from the backend on component load
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${base_url}/admin/getLanguages`);
        if (response.status === 200 && response.data) {

          const langArray = [];
          const languagesData = response.data.reduce((acc, language) => {
            acc[language.name] = language._id;
            langArray.push(`${language.name}`);
            return acc;
          }, {});

          setAvailableLanguages(langArray);
          setLanguages(languagesData);
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
  
    fetchLanguages();
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSearchLanguages = (event) => {
    const LanguagesToSearch = event.target.value;
    setSearchedLanguages(LanguagesToSearch);

    if (LanguagesToSearch === '') {
      setSearchResults([]);
    } else {
      const filteredLanguages = availableLanguages.filter((language) =>
        language.toLowerCase().includes(LanguagesToSearch.toLowerCase())
      );
      setSearchResults(filteredLanguages);
    }
  };

  const handleRemoveLanguages = (languageToRemove) => {
    const updatedLanguages = selectedLanguages.filter(
      (language) => language !== languageToRemove
    );
    setSelectedLanguages(updatedLanguages);
  };

  const handleAddLanguages = (language) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
      setSearchedLanguages("");
      setSearchResults([]);
    }
  };

  const handleSignUp = async () => {
    const langIdArray = [];
    selectedLanguages.forEach((language) => {
      const languageId = languages[language];
      langIdArray.push(languageId);
    });


    const registrationData = {
      name: username,
      email: email,
      password: password,
      preferred_languages: langIdArray,
    };

    try {
      const response = await axios.post(
        `${base_url}/user/register`,
        registrationData
      );

      if (response.status === 200 && response.data.status === true) {
        toast.success("User registered successfully");
        navigate('/Login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container vh-100 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Sign Up</h2>
              <form className="register-form">
                <InputField
                  label="Username"
                  type="text"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <InputField
                  label="Email"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <InputField
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <div className="mt-3"></div>
                <LanguageSelection
                  searchedLanguages={searchedLanguages}
                  searchResults={searchResults}
                  selectedLanguages={selectedLanguages}
                  handleSearchLanguages={handleSearchLanguages}
                  handleAddLanguages={handleAddLanguages}
                  handleRemoveLanguages={handleRemoveLanguages}
                  availableLanguages={languages}
                  sampleLanguages={sampleLanguages}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-block btn-lg mt-3"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </form>
              <div className="text-center mt-3">
                Have an account?<span> </span>
                <Link className="text-primary" to="/Login">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


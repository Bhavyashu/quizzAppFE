import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// function LanguageSelection({
//   searchedLanguages,
//   searchResults,
//   selectedLanguages,
//   handleSearchLanguages,
//   handleAddLanguages,
//   handleRemoveLanguages,
//   sampleLanguages,
// }) {
//   const fieldsetStyle = {
//     border: "1px solid #ccc",
//     padding: "10px",
//     borderRadius: "5px",
//     margin: "10px",
//     // Add other styles as needed
//   };

//   return (
//     <div className="form-group">
//       <fieldset style={fieldsetStyle}>
//         <legend>Add languages:</legend>
//         <div className="input-group">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search for a language"
//             value={searchedLanguages}
//             onChange={handleSearchLanguages}
//           />
//           <div className="input-group-append">
//             <button
//               type="button"
//               className="btn btn-primary"
//               onClick={() => handleAddLanguages(searchedLanguages)}
//             >
//               Add
//             </button>
//           </div>
//         </div>
//         {/* <div className="selected-languages">
//           {selectedLanguages.map((language, index) => (
//             <div key={index} className="badge badge-primary language-badge">
//               {language}
//               <span
//                 className="remove-language"
//                 onClick={() => handleRemoveLanguages(language)}
//               >
//                 &times;
//               </span>
//             </div>
//           ))}
//         </div> */}
//       </fieldset>
//       {searchResults.length > 0 && (
//         <div className="search-results">
//           <ul className="list-group">
//             {searchResults.map((language, index) => (
//               <li
//                 key={index}
//                 className="list-group-item list-group-item-action"
//                 onClick={() => handleAddLanguages(language)}
//               >
//                 {language}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

      
// import React from "react";

function LanguageSelection({
  searchedLanguages,
  searchResults,
  selectedLanguages,
  handleSearchLanguages,
  handleAddLanguages,
  handleRemoveLanguages,
  sampleLanguages,
}) {
  const fieldsetStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px",
    // Add other styles as needed
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "5px 10px",
    margin: "5px",
    backgroundColor: "#007BFF",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div className="form-group">
      <fieldset style={fieldsetStyle}>
        <legend>Add languages:</legend>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a language"
            value={searchedLanguages}
            onChange={handleSearchLanguages}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleAddLanguages(searchedLanguages)}
            >
              Add
            </button>
          </div>
        </div>
        {/* <div className="selected-languages">
          {selectedLanguages.map((language, index) => (
            <span key={index} style={badgeStyle} onClick={() => handleRemoveLanguages(language)}>
              {language} <span>&times;</span>
            </span>
          ))}
        </div> */}
      </fieldset>
      {searchResults.length > 0 && (
        <div className="search-results">
          <ul className="list-group">
            {searchResults.map((language, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleAddLanguages(language)}
              >
                {language}
              </li>
            ))}
          </ul>
        </div>
      )}

      {sampleLanguages.length > 0 && selectedLanguages.length === 0 && (
        <div className="sample-languages">
          <p className="languages-section-title">Sample Languages:</p>
          <div className="badge-container">
            {sampleLanguages.map((language, index) => (
              <span
                key={index}
                className="badge badge-primary sample-language-badge"
                onClick={() => handleAddLanguages(language)}
              >
                {language}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedLanguages.length > 0 && (
        <div className="selected-languages">
          <p className="languages-section-title">Selected Languages:</p>
          <div className="badge-container">
            {selectedLanguages.map((language, index) => (
              <span
                key={index}
                className="badge badge-primary sample-language-badge"
                onClick={() => handleRemoveLanguages(language)}
              >
                {language} <FontAwesomeIcon icon={faTimes} onClick={() => handleRemoveLanguages(language)} />
              </span>
            ))}
          </div>
        </div>
      )}
 
    </div>
  );
}

export default LanguageSelection;

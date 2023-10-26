import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function LanguageDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Language ID: {id}</h2>
      {/* You can fetch additional details for the language using the ID */}
    </div>
  );
}

export default LanguageDetails;

import React, { useState, useEffect } from "react";
import { get }from "../api/api";
import { toast } from "react-hot-toast";
import { LanguageCardDashboard } from "../components/common/Cards";


/**
 * LanguageCardDashboard is a React component that displays a list of selected languages.
 *
 * @returns {JSX.Element} The rendered LanguageCardDashboard component.
 */
function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);
  const [error, setError] = useState(null);
  const name = localStorage.getItem('name');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get(`/quiz/languages`);

        if (!data) {
          toast.error( `couldn't get the dashboard details` );
        }

        if (data) {
          setData(data.preffered_languge);
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
      <div style={{ fontSize: '24px', textAlign: 'center', marginBottom: '20px' }}>
      <h1>Hey, <span style={{ textTransform: 'capitalize'  }}>{name}</span> 👋</h1>
      </div>
      <h3 style={{ color: '#CE5A67', textAlign: 'center' }}>Your Selected Languages</h3>
      <div className="row mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
          {data.map((item) => {
            return <LanguageCardDashboard key={item.language._id} language={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

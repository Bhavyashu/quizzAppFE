import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const mode = process.env.REACT_APP_ENV
const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  if (mode === 'prod') {
    // Render the production app without StrictMode
    root.render(<App />);
  } else {
    // Render in StrictMode for other environments
    root.render(
      // <React.StrictMode>
        <App />
      // </React.StrictMode>
    );
  }
};

renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

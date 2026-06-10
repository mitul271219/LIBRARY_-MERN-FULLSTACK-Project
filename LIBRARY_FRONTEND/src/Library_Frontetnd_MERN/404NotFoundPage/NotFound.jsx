import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-desc">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>

        <button className="home-btn" onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};
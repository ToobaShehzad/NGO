import React from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

function History() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Placeholder for history data
  const historyData = []; 

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="history-container">
      <button className="back-button" onClick={handleBackClick}>Back</button>
      <h2>Donation & Contribution History</h2>
      {historyData.length === 0 ? (
        <p className="no-history-message">
          No donations or contributions have been made yet. History will be displayed here once donations are recorded.
        </p>
      ) : (
        <ul className="history-list">
          {historyData.map((item, index) => (
            <li key={index} className="history-item">
              <p>{item.description}</p>
              <p>{item.date}</p>
              <p>{item.amount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;

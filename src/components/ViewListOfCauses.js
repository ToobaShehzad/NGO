import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaClock, FaHeart, FaTrash } from 'react-icons/fa'; // Import additional icons
import './ViewListOfCauses.css'; // Import CSS file

function ViewListOfCauses() {
  const [causes, setCauses] = useState([]);
  const [selectedCauseIndex, setSelectedCauseIndex] = useState(null); // State to manage visibility
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Retrieve causes from local storage
    const savedCauses = JSON.parse(localStorage.getItem('causes')) || [];
    setCauses(savedCauses);
  }, []);

  // Function to calculate days left
  const calculateDaysLeft = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PKR' }).format(amount || 0);
  };

  // Function to calculate progress percentage
  const calculateProgressPercentage = (raisedAmount, goalAmount) => {
    if (!goalAmount || goalAmount <= 0) return 0;
    return (raisedAmount / goalAmount) * 100;
  };

  // Function to handle cause retirement
  const handleRetireCause = (index) => {
    const updatedCauses = causes.filter((_, i) => i !== index);
    localStorage.setItem('causes', JSON.stringify(updatedCauses));
    setCauses(updatedCauses);
  };

  const handleViewClick = (index) => {
    setSelectedCauseIndex(index === selectedCauseIndex ? null : index);
  };

  return (
    <div className="view-causes-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      <h1>List of Causes</h1>
      <div className="causes-list">
        {causes.length > 0 ? (
          causes.map((cause, index) => {
            const daysLeft = calculateDaysLeft(cause.endDate);
            const progressPercentage = calculateProgressPercentage(cause.raisedAmount, cause.amount);

            return (
              <div key={index} className="cause-item">
                <div className="cause-header">
                  <h2>{cause.publicName}</h2>
                  <span className="goal-badge">{formatCurrency(cause.amount)}</span>
                </div>
                <div className="cause-summary">
                  <p><FaClock /> {daysLeft} days left</p>
                  <p><FaHeart /> {cause.impactors || '0 impactors'}</p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${progressPercentage}%`, backgroundColor: progressPercentage > 0 ? '#3498db' : '#ddd' }}></div>
                  </div>
                  <p>{formatCurrency(cause.raisedAmount || 0)} raised of {formatCurrency(cause.amount)}</p>
                  <button className="view-button" onClick={() => handleViewClick(index)}>
                    {selectedCauseIndex === index ? 'Hide' : 'View'}
                  </button>
                  <button className="retire-button" onClick={() => handleRetireCause(index)}>
                    <FaTrash /> Retire Cause
                  </button>
                </div>
                {selectedCauseIndex === index && (
                  <div className="cause-details">
                    <p><strong>Amount to Raise:</strong> {formatCurrency(cause.amount)}</p>
                    <p><strong>Start Date:</strong> {cause.startDate}</p>
                    <p><strong>End Date:</strong> {cause.endDate}</p>
                    <p><strong>Description:</strong> {cause.description}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No causes available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewListOfCauses;

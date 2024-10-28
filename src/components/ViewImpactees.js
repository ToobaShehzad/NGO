import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './ViewImpactees.css';

function ViewImpactees() {
  const [impactees, setImpactees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedImpactees = JSON.parse(localStorage.getItem('impactees')) || [];
    setImpactees(storedImpactees);
  }, []);

  const handleBackClick = () => {
    navigate('/more');
  };

  const handleViewClick = (index) => {
    navigate(`/impactee-details/${index}`);
  };

  const handleDeleteClick = (index) => {
    const updatedImpactees = [...impactees];
    updatedImpactees.splice(index, 1);
    localStorage.setItem('impactees', JSON.stringify(updatedImpactees));
    setImpactees(updatedImpactees);
  };

  return (
    <>
      <button className="back-button" onClick={handleBackClick}>
        <FaArrowLeft /> Back
      </button>
      <h1>List of Impactees</h1>
      <div className="impactee-list">
        {impactees.length > 0 ? (
          impactees.map((impactee, index) => (
            <div key={index} className="impactee-item">
              <img src={impactee.photo || 'default-image-path'} alt={impactee.name || 'No Name'} className="impactee-photo" />
              <h2>{impactee.name || 'No Name'}</h2>
              <button className="view-button" onClick={() => handleViewClick(index)}>View</button>
              <button className="delete-button" onClick={() => handleDeleteClick(index)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No impactees found.</p>
        )}
      </div>
    </>
  );
}

export default ViewImpactees;

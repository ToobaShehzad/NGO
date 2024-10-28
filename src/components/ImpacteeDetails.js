import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ImpacteeDetails.css';

function ImpacteeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [impacteeData, setImpacteeData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedImpactee, setEditedImpactee] = useState({});

  useEffect(() => {
    const impactees = JSON.parse(localStorage.getItem('impactees')) || [];
    const currentImpactee = impactees[id] || {};
    setImpacteeData(currentImpactee);
    setEditedImpactee(currentImpactee);
  }, [id]);

  const handleBackClick = () => {
    navigate('/view-impactees');
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedImpactee(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    const impactees = JSON.parse(localStorage.getItem('impactees')) || [];
    impactees[id] = editedImpactee;
    localStorage.setItem('impactees', JSON.stringify(impactees));
    setImpacteeData(editedImpactee);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedImpactee(impacteeData); // Revert to original data if canceled
  };

  return (
    <div>
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      <div className="impactee-details">
        <img src={impacteeData.photo || 'default-image-path'} alt={impacteeData.name || 'No Name'} className="impactee-photo" />
        <h1>{impacteeData.name || 'N/A'}</h1>
        {isEditing ? (
          <div className="edit-container">
            {/* Editing fields */}
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={editedImpactee.name || ''}
                onChange={handleChange}
              />
            </div>
            <button className="save-button" onClick={handleSaveClick}>Save</button>
            <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
          </div>
        ) : (
          <div className="impactee-info">
            <p><strong>CNIC:</strong> {impacteeData.cnic || 'N/A'}</p>
            <p><strong>Mobile Number:</strong> {impacteeData.mobileNumber || 'N/A'}</p>
            <p><strong>Father/Husband Name:</strong> {impacteeData.fatherHusbandName || 'N/A'}</p>
            <p><strong>Date of Birth:</strong> {impacteeData.dob || 'N/A'}</p>
            <p><strong>Address:</strong> {impacteeData.address || 'N/A'}</p>
            <p><strong>Summary:</strong> {impacteeData.summary || 'N/A'}</p>
            <button className="edit-button" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImpacteeDetails;

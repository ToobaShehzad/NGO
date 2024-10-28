import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddNewCause.css';

function AddNewCause() {
  const [causeData, setCauseData] = useState({
    privateName: '',
    publicName: '',
    amount: '',
    startDate: '',
    endDate: '',
    goal: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCauseData({ ...causeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingCauses = JSON.parse(localStorage.getItem('causes')) || [];
    existingCauses.push(causeData);
    localStorage.setItem('causes', JSON.stringify(existingCauses));
    alert('Cause added successfully!');
    setCauseData({
      privateName: '',
      publicName: '',
      amount: '',
      startDate: '',
      endDate: '',
      goal: '',
      description: '',
    });
  };

  const handleBackClick = () => {
    navigate('/more'); // Navigate to the 'More' page
  };

  return (
    <div className="add-cause-container">
      <button className="back-button" onClick={handleBackClick}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h1>Add a New Cause</h1>
      <form className="cause-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="privateName">Private cause name:</label>
          <input
            type="text"
            id="privateName"
            name="privateName"
            value={causeData.privateName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="publicName">Publicly-visible cause name:</label>
          <input
            type="text"
            id="publicName"
            name="publicName"
            value={causeData.publicName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount to raise:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={causeData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startDate">Start date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={causeData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={causeData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="goal">Select goal:</label>
          <select
            id="goal"
            name="goal"
            value={causeData.goal}
            onChange={handleChange}
            required
          >
            <option value="">Select goal</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="poverty">Poverty Alleviation</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Publicly-visible cause description:</label>
          <textarea
            id="description"
            name="description"
            value={causeData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">Add Cause</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewCause;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditImpactee.css';

function EditImpactee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [impacteeData, setImpacteeData] = useState({
    photo: '',
    name: '',
    cnic: '',
    mobileNumber: '',
    fatherHusbandName: '',
    dob: '',
    address: '',
    summary: ''
  });

  useEffect(() => {
    const impactees = JSON.parse(localStorage.getItem('impactees')) || [];
    const data = impactees[id] || {};
    setImpacteeData(data);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImpacteeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImpacteeData((prevData) => ({
          ...prevData,
          photo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const impactees = JSON.parse(localStorage.getItem('impactees')) || [];
    impactees[id] = impacteeData;
    localStorage.setItem('impactees', JSON.stringify(impactees));
    navigate(`/impactee-details/${id}`);
  };

  const handleBackClick = () => {
    navigate(`/impactee-details/${id}`);
  };

  return (
    <div className="edit-impactee-container">
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      <h2>Edit Impactee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="photo">Impactee's Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {impacteeData.photo && <img src={impacteeData.photo} alt="Preview" className="preview-image" />}
        </div>
        <div className="form-group">
          <label htmlFor="name">Impactee's Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={impacteeData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cnic">Impactee's CNIC</label>
          <input
            type="text"
            id="cnic"
            name="cnic"
            value={impacteeData.cnic}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Impactee's Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={impacteeData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fatherHusbandName">Father/Husband Name</label>
          <input
            type="text"
            id="fatherHusbandName"
            name="fatherHusbandName"
            value={impacteeData.fatherHusbandName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={impacteeData.dob}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={impacteeData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            id="summary"
            name="summary"
            rows="3"
            value={impacteeData.summary}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditImpactee;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add-new-impactee.css';

function AddNewImpactee() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [cnic, setCnic] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [fatherHusbandName, setFatherHusbandName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [summary, setSummary] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Validation functions
  const validateCNIC = (value) => /^\d{5}-\d{7}-\d{1}$/.test(value);
  const validateMobileNumber = (value) => value.length === 11;

  // Format functions
  const formatCNIC = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.length <= 5
      ? digits
      : digits.length <= 12
        ? `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`
        : `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12, 13)}`;
  };

  const formatMobileNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.length <= 4
      ? digits
      : digits.length <= 7
        ? `${digits.slice(0, 4)}-${digits.slice(4)}`
        : `${digits.slice(0, 4)}-${digits.slice(4, 11)}`;
  };

  const handleBackClick = () => navigate('/more');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhoto('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if (!validateCNIC(cnic)) {
      errors.cnic = 'Invalid CNIC format. Use XXXXX-XXXXXXX-X';
    }

    if (!validateMobileNumber(mobileNumber.replace(/[^0-9]/g, ''))) {
      errors.mobileNumber = 'Mobile number must be exactly 11 digits.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const impacteeData = {
        photo,
        name,
        cnic,
        mobileNumber: mobileNumber.replace(/[^0-9]/g, ''),
        fatherHusbandName,
        dob,
        address,
        summary,
      };

      const existingData = JSON.parse(localStorage.getItem('impactees')) || [];
      existingData.push(impacteeData);
      localStorage.setItem('impactees', JSON.stringify(existingData));

      alert('Impactee Added Successfully');
      event.target.reset();
      setPhoto('');
      setName('');
      setCnic('');
      setMobileNumber('');
      setFatherHusbandName('');
      setDob('');
      setAddress('');
      setSummary('');
    }
  };

  return (
    <div className="impactee-form-container">
      <button className="back-button" onClick={handleBackClick}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h2>Add a New Impactee</h2>
      <p>Please consider adding extremely poor or disabled beneficiaries (impactees) to the platform.</p>
      <form className="impactee-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="impactee-photo">Impactee's Photo</label>
          <input 
            type="file" 
            id="impactee-photo" 
            name="impactee-photo" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          <div className="profile-image-wrapper">
            {photo && <img id="impactee-photo-preview" src={photo} alt="Impactee's photo preview" />}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="impactee-name">Impactee's Name</label>
          <input 
            type="text" 
            id="impactee-name" 
            name="impactee-name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="impactee-cnic">Impactee's CNIC</label>
          <input 
            type="text" 
            id="impactee-cnic" 
            name="impactee-cnic" 
            value={cnic} 
            onChange={(e) => setCnic(formatCNIC(e.target.value))} 
            required 
            placeholder="XXXXX-XXXXXXX-X" 
            title="Please enter a valid CNIC in the format XXXXX-XXXXXXX-X"
          />
          {formErrors.cnic && <p className="error">{formErrors.cnic}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="impactee-mobile-number">Impactee's Mobile Number</label>
          <input 
            type="text" 
            id="impactee-mobile-number" 
            name="impactee-mobile-number" 
            value={mobileNumber} 
            onChange={(e) => setMobileNumber(formatMobileNumber(e.target.value))} 
            required 
            placeholder="03xx-xxxxxxx" 
            title="Mobile number must be exactly 11 digits."
          />
          {formErrors.mobileNumber && <p className="error">{formErrors.mobileNumber}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="impactee-father-husband-name">Father/Husband Name</label>
          <input 
            type="text" 
            id="impactee-father-husband-name" 
            name="impactee-father-husband-name" 
            value={fatherHusbandName}
            onChange={(e) => setFatherHusbandName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="impactee-dob">Impactee's Date of Birth</label>
          <input 
            type="date" 
            id="impactee-dob" 
            name="impactee-dob" 
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="impactee-address">Impactee's Current Address (Optional)</label>
          <input 
            type="text" 
            id="impactee-address" 
            name="impactee-address" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="impactee-summary">Summary</label>
          <textarea 
            id="impactee-summary" 
            name="impactee-summary" 
            rows="3"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddNewImpactee;

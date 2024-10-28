import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Add-new-package.css';

function AddNewPackage() {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleBackClick = () => {
    navigate('/more');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get form data
    const form = formRef.current;
    const packageName = form.elements['package-name'].value;
    const packagePrice = form.elements['package-price'].value;
    const packageDescription = form.elements['package-description'].value;

    // Create a package object
    const packageData = {
      name: packageName,
      price: packagePrice,
      description: packageDescription
    };

    // Retrieve existing packages from local storage or create a new array
    let packages = JSON.parse(localStorage.getItem('packages')) || [];

    // Add new package to the array
    packages.push(packageData);

    // Save updated array back to local storage
    localStorage.setItem('packages', JSON.stringify(packages));

    // Show success message
    alert('Package Added Successfully');

    // Clear the form fields
    form.reset();
  };

  return (
    <div className="add-package-container">
      <button className="back-button" onClick={handleBackClick}>
        <i className="fas fa-arrow-left"></i> Back
      </button>
      <h2>Add a New Package</h2>
      <form onSubmit={handleSubmit} className="package-form" ref={formRef}>
        <div className="form-group">
          <label htmlFor="package-name">Name:</label>
          <input type="text" id="package-name" name="package-name" required />
        </div>
        <div className="form-group">
          <label htmlFor="package-price">Price:</label>
          <input type="number" id="package-price" name="package-price" required />
        </div>
        <div className="form-group">
          <label htmlFor="package-description">Package Description:</label>
          <textarea id="package-description" name="package-description" rows="4" required></textarea>
        </div>
        <button type="submit">Add Package</button>
      </form>
    </div>
  );
}

export default AddNewPackage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ViewPackages.css';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';

function ViewPackages() {
  const [packages, setPackages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [editedPackage, setEditedPackage] = useState({ name: '', price: '', description: '' });
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedPackages = JSON.parse(localStorage.getItem('packages')) || [];
    setPackages(storedPackages);
  }, []);

  const handleDelete = (index) => {
    const updatedPackages = [...packages];
    updatedPackages.splice(index, 1);
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
  };

  const handleEdit = (pkg, index) => {
    setCurrentPackage(index);
    setEditedPackage(pkg);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedPackages = [...packages];
    updatedPackages[currentPackage] = editedPackage;
    setPackages(updatedPackages);
    localStorage.setItem('packages', JSON.stringify(updatedPackages));
    setIsEditing(false);
  };

  return (
    <div className="view-packages-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>
      <h2>List of Packages</h2>
      <div className="packages-grid">
        {packages.map((pkg, index) => (
          <div className="package-card" key={index}>
            <h3>{pkg.name}</h3>
            <p><strong>Price:</strong> PKR {pkg.price}</p>
            <p><strong>Description:</strong> {pkg.description}</p>
            <div className="package-actions">
              <button className="edit-button" onClick={() => handleEdit(pkg, index)}>
                <FaEdit /> Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(index)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="edit-modal">
          <div className="modal-content">
            <h2>Edit Package</h2>
            <div className="form-group">
              <label htmlFor="edit-name">Name:</label>
              <input
                type="text"
                id="edit-name"
                value={editedPackage.name}
                onChange={(e) => setEditedPackage({ ...editedPackage, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-price">Price:</label>
              <input
                type="number"
                id="edit-price"
                value={editedPackage.price}
                onChange={(e) => setEditedPackage({ ...editedPackage, price: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-description">Description:</label>
              <textarea
                id="edit-description"
                value={editedPackage.description}
                onChange={(e) => setEditedPackage({ ...editedPackage, description: e.target.value })}
                rows="4"
              />
            </div>
            <button className="save-button" onClick={handleSaveEdit}>Save Changes</button>
            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewPackages;
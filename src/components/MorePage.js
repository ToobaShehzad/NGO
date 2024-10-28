import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MorePage.css'; // Import CSS file for styling
import { FaBox, FaList, FaUserPlus, FaUsers, FaPencilAlt, FaThList, FaCreditCard, FaArrowLeft } from 'react-icons/fa';

function MorePage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="more-page-container">
      <button className="back-button" onClick={handleBackClick}>
        <FaArrowLeft /> Back
      </button>
      <div className="quick-create-container">
        <div className="quick-create-section">
          <h2>Quick-create menu</h2>
          <div className="quick-create-menu">
            <button onClick={() => navigate('/add-new-package')}>
              <FaBox /> Add New Package
            </button>
            <button onClick={() => navigate('/view-list-packages')}>
              <FaList /> View List of Packages
            </button>
            <button onClick={() => navigate('/add-new-impactee')}>
              <FaUserPlus /> Add New Impactee
            </button>
            <button onClick={() => navigate('/view-impactees')}>
              <FaUsers /> View List of Impactees
            </button>
            <button onClick={() => navigate('/add-new-cause')}>
              <FaPencilAlt /> Add New Cause
            </button>
            <button onClick={() => navigate('/view-list-causes')}>
              <FaThList /> View List of Causes
            </button>

            <button onClick={() => navigate('/payment-method')}>
              <FaCreditCard /> Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MorePage;

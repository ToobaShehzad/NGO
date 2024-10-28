import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePromptClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2>NGO Dashboard</h2>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/more">More</Link></li>
        </ul>
      </aside>

      <main className="main-content-container">
        <header className="home-header">
          <h1>Ehsaas Foundation</h1>
          <p>Gt Road, Rahwali, Gujranwala.</p>
        </header>

        <section className="profile-photo-section">
          <div className="profile-photo-container" onClick={handlePromptClick}>
            {profileImage ? (
              <img src={profileImage} alt="NGO Profile" className="profile-image" />
            ) : (
              <p className="photo-upload-prompt">Tap to add a photo for the NGO</p>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>
        </section>

        <section className="stats-container">
          <div className="stats">
            <div className="stat-box">
              <h2>Raised</h2>
              <p>0</p>
            </div>
            <div className="stat-box">
              <h2>Active Causes</h2>
              <p>0</p>
            </div>
            <div className="stat-box">
              <h2>Impactors</h2>
              <p>0</p>
            </div>
          </div>
        </section>

        <section className="quick-actions-container">
          <h3 className="quick-actions-heading">Quick Actions</h3>
          <div className="quick-actions">
            <Link to="/add-new-cause">
              <button>Add New Cause</button>
            </Link>
            <Link to="/view-impactees">
              <button>View Impactees</button>
            </Link>
            <button>Track Donations</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

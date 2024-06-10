import React, { useState, useEffect } from 'react';
import './EditUserProfile.css';

const EditUserProfileButton = ({ uid }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sessionUsername, setSessionUsername] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');
  const [nickname, setNickname] = useState(''); // State for nickname


  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/sagVuCZ85KTpYfo2DGpiixl2W6B2`);
        if (response.ok) {
          const data = await response.json();
          setSessionUsername(data.username);
          setSessionEmail(data.email);
          setNickname(data.nickname); // Assume your API returns a nickname
        } else {
          console.error("Failed to fetch user details", response.status);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
  
    fetchUserDetails();
  }, [uid]);

  const handleNicknameChange = (e) => setNickname(e.target.value); // Handler for nickname change

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="dropdown">
      <button className="button" onClick={toggleDropdown}>Edit UserProfile</button>
      <div className={`dropdown-menu ${isDropdownOpen ? 'active' : ''}`}>
        <div className="dropdown-item">
          <label className="input-label">Username</label>
          <input className="input-field" type="text" value={sessionUsername} disabled />
        </div>
        <div className="dropdown-item">
          <label className="input-label">Email</label>
          <input className="input-field" type="text" value={sessionEmail} disabled />
        </div>
        <div className="dropdown-item">
          <label className="input-label">Nickname</label>
          <input
            className="input-field"
            type="text"
            placeholder="Enter your nickname"
            value={nickname}
            onChange={handleNicknameChange}
          />
        </div>
        <div className="dropdown-item">
          <button className="button" onClick={() => { 
            console.log('Submitting:', sessionUsername, sessionEmail, nickname);
            setIsDropdownOpen(false); 
          }}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfileButton;

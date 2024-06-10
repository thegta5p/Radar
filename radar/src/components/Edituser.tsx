import React, { useState, useEffect } from 'react';
import './EditUserProfile.css';

const EditUserProfileButton = ({ currentUser, onNicknameSubmit }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sessionUsername, setSessionUsername] = useState('');
  const [sessionEmail, setSessionEmail] = useState('');
  const [nickname, setNickname] = useState(''); // State for nickname

  // Fetch user details if UID is provided
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`http://localhost:8080/user/sagVuCZ85KTpYfo2DGpiixl2W6B2`);
      if (response.ok) {
        const data = await response.json();
        setSessionUsername(data.username);
        setSessionEmail(data.email);
        setNickname(data.nickname);  // Assume the nickname is part of your user data
      } else {
        console.error("Failed to fetch user details");
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  // Handle nickname submission, can be extended for external handling
  const submitNickname = () => {
    console.log('Submitting:', sessionUsername, sessionEmail, nickname);
    setIsDropdownOpen(false);
    if (onNicknameSubmit) {
      onNicknameSubmit(nickname);
    }
  };

  const handleNicknameChange = (e) => setNickname(e.target.value); // Handler for nickname change

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="dropdown">
      <button className="button" onClick={toggleDropdown}>
        {currentUser ? 'Edit UserProfile' : 'Edit User'}
      </button>
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
          <button className="button" onClick={submitNickname}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfileButton;

import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';

const EditUserProfileButton = ({ currentUser }) => {
  const [sessionUsername, setSessionUsername] = useState('');
  const [address, setAddress] = useState('');
  const [githubUsername, setGithubUsername] = useState('');

  useEffect(() => {
    const fetchGithubUsername = async () => {
      const response = await fetch(`http://localhost:8080/user/${currentUser}`);
      const data = await response.json();
      setGithubUsername(data.githubUsername);
    };

    fetchGithubUsername();
  }, [currentUser]);

  const handleSessionUsernameChange = (e) => setSessionUsername(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);

  const clearInput = (setter) => () => setter('');

  const handleSubmit = () => {
    console.log('Nickname:', sessionUsername, 'Address:', address);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="bg-purple-800 text-white" auto ghost>
          Edit UserProfile
        </Button>
      </DropdownTrigger>
      <DropdownMenu color="primary" aria-label="Edit User Profile">
        <DropdownItem key="input-github-username">
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            value={githubUsername}
            disabled
            label="GitHub Username"
          />
        </DropdownItem>
        <DropdownItem key="input-nickname">
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Enter your nickname"
            value={sessionUsername}
            onChange={handleSessionUsernameChange}
            contentRight={<Button auto flat onClick={clearInput(setSessionUsername)}>Clear</Button>}
          />
        </DropdownItem>
        <DropdownItem key="input-address">
          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Enter your address"
            value={address}
            onChange={handleAddressChange}
            contentRight={<Button auto flat onClick={clearInput(setAddress)}>Clear</Button>}
          />
        </DropdownItem>
        <DropdownItem key="submit-button">
          <Button fullWidth color="primary" auto onClick={handleSubmit}>
            Submit
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default EditUserProfileButton;

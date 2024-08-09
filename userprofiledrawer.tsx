// src/components/UserProfileDrawer.tsx
import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

const UserProfileDrawer: React.FC<{ isOpen: boolean, toggleDrawer: (open: boolean) => void }> = ({ isOpen, toggleDrawer }) => {
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  return (
    <Drawer anchor="right" open={isOpen} onClose={() => toggleDrawer(false)}>
      <div style={{ width: '250px', padding: '16px' }}>
        <h2>User Profile</h2>
        <p><strong>First Name:</strong> {userProfile.firstName}</p>
        <p><strong>Last Name:</strong> {userProfile.lastName}</p>
        <p><strong>Email:</strong> {userProfile.email}</p>
        <p><strong>Address:</strong> {userProfile.address}</p>
        <Button onClick={() => toggleDrawer(false)}>Close</Button>
      </div>
    </Drawer>
  );
};

export default UserProfileDrawer;

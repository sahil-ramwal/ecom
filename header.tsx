// src/components/Header.tsx
import React, { useState } from 'react';
import UserProfileDrawer from './UserProfileDrawer';

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setIsDrawerOpen(open);
  };

  return (
    <header>
      <div className="header-container">
        <h1>My Store</h1>
        <button onClick={() => toggleDrawer(true)}>Profile</button>
      </div>
      <UserProfileDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </header>
  );
};

export default Header;

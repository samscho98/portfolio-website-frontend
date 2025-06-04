import React from 'react';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo">
      <img 
        src="https://res.cloudinary.com/dezhgcxr3/image/upload/v1748983748/My%20Brand/Logo_jzh43l.png" 
        alt="Schonenberg Developments Logo" 
        className="logo-image" 
      />
      <div className="logo-text">
        <span className="logo-name">Schonenberg</span>
        <span className="logo-subtitle">developments</span>
      </div>
    </div>
  );
};

export default Logo;
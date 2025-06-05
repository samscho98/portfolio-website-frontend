import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img 
        src="https://res.cloudinary.com/dezhgcxr3/image/upload/v1748983748/My%20Brand/Logo_jzh43l.png" 
        alt="Schonenberg Developments Logo" 
        className="logo-image" 
      />
      <div className="logo-text">
        <span className="logo-name">Schonenberg</span>
        <span className="logo-subtitle">developments</span>
      </div>
    </Link>
  );
};

export default Logo;
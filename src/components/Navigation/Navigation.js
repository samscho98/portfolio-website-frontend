import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import './Navigation.css';

const Navigation = () => {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', href: '#' },
    { key: 'projects', href: '#' },
    { key: 'pricing', href: '#' },
    { key: 'contact', href: '#' },
    { key: 'blog', href: '#' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      {/* Desktop Navigation */}
      <ul className="nav-list desktop-nav">
        {navItems.map(item => (
          <li key={item.key}>
            <a href={item.href} className="nav-link">
              {t(`nav.${item.key}`)}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Burger Button */}
      <button 
        className="burger-menu"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
      </button>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navItems.map(item => (
            <li key={item.key}>
              <a 
                href={item.href} 
                className="mobile-nav-link"
                onClick={closeMenu}
              >
                {t(`nav.${item.key}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div className="mobile-overlay" onClick={closeMenu}></div>
      )}
    </nav>
  );
};

export default Navigation;
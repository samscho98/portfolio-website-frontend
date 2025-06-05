import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import './Navigation.css';

const Navigation = () => {
  const { t } = useI18n();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'projects', path: '/projects' },
    { key: 'pricing', path: '/pricing' },
    { key: 'contact', path: '/contact' },
    { key: 'blog', path: '/blog' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navigation">
      {/* Desktop Navigation */}
      <ul className="nav-list desktop-nav">
        {navItems.map(item => (
          <li key={item.key}>
            <Link 
              to={item.path} 
              className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
            >
              {t(`nav.${item.key}`)}
            </Link>
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
              <Link 
                to={item.path}
                className={`mobile-nav-link ${isActivePath(item.path) ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {t(`nav.${item.key}`)}
              </Link>
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
import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import LanguageDropdown from '../LanguageDropdown/LanguageDropdown';
import './Footer.css';

const Footer = () => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="logo-section">
              <h3>Schonenberg</h3>
              <p className="tagline">Full-Stack Developer & Digital Solutions</p>
            </div>
          </div>
          
          <div className="footer-center">
            <div className="social-links">
              <a 
                href="https://www.linkedin.com/in/sams98/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <span className="material-icons">public</span>
              </a>
              <a 
                href="https://x.com/Schonenbergdev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <span className="material-icons">alternate_email</span>
              </a>
              <a 
                href="https://www.facebook.com/schonenberg.sam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <span className="material-icons">group</span>
              </a>
              
              <a 
                href="https://github.com/samscho98" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <span className="material-icons">code</span>
              </a>
            </div>
          </div>
          
          <div className="footer-right">
            <LanguageDropdown />
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Sam Schonenberg. {t('ui.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
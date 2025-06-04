import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import './HeroSection.css';

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('hero.greeting')}<br />
            <span className="hero-name">Sam Schonenberg,</span><br />
            <span className="hero-role">{t('hero.role')}</span><br />
            <span className="hero-expertise">{t('hero.expertise')}</span>
          </h1>
          <p className="hero-description">
            Helping businesses and organizations develop effective backend systems with expertise in data manipulation and business intelligence.
          </p>
        </div>
        <div className="hero-image">
          <img 
            src="https://res.cloudinary.com/dezhgcxr3/image/upload/v1748983806/Sam-org_ebdrqv.png" 
            alt="Sam Schonenberg" 
            className="profile-image" 
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
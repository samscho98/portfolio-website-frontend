import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import './AboutSection.css';

const AboutSection = () => {
  const { t } = useI18n();

  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="about-text">{t('about.description')}</p>
          <button className="cta-button">{t('about.cta')}</button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
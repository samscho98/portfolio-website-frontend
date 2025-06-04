import React, { useState, useEffect } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import './AboutMe.css';

const AboutMe = () => {
  const { apiCall, isLoading: langLoading, t } = useI18n();
  const [aboutContent, setAboutContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutContent = async () => {
      if (langLoading) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await apiCall('/about');
        
        if (data.status === 'success' && data.about) {
          setAboutContent(data.about);
        } else {
          throw new Error('Invalid API response structure');
        }
        
      } catch (err) {
        console.error('Failed to fetch about content:', err);
        // Use fallback content if API fails
        setAboutContent({
          full_name: 'Sam Schonenberg',
          professional_title: 'Full-Stack Developer & Digital Solutions Architect',
          bio: 'Full-stack developer with a strong foundation in web technologies, backend systems, and automation. I build scalable digital solutions that help businesses operate smarter, faster, and more efficiently.',
          skills_summary: 'React, Python, Node.js, C#, PostgreSQL, MySQL, REST APIs, Automation, Data Processing'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutContent();
  }, [apiCall, langLoading]);

  if (isLoading) {
    return (
      <div className="about-me">
        <div className="about-loading">
          <div className="loading-placeholder-about"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="about-me">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  // Parse skills from comma-separated string
  const skillsArray = aboutContent?.skills_summary 
    ? aboutContent.skills_summary.split(',').map(skill => skill.trim())
    : [];

  return (
    <div className="about-me">
      <h2>{t('sections.aboutMe')}</h2>
      <div className="about-content">
        {aboutContent?.professional_title && (
          <h3 className="professional-title">{aboutContent.professional_title}</h3>
        )}
        
        <p className="bio">
          {aboutContent?.bio || aboutContent?.short_bio}
        </p>
        
        {aboutContent?.mission_statement && (
          <div className="mission-section">
            <h4>Mission</h4>
            <p className="mission-text">{aboutContent.mission_statement}</p>
          </div>
        )}
        
        {skillsArray.length > 0 && (
          <div className="skills-section">
            <h4>Key Skills</h4>
            <div className="skills-tags">
              {skillsArray.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <button className="cta-button">
          {t('ui.learnMore')}
        </button>
      </div>
    </div>
  );
};

export default AboutMe;
import React, { useState, useEffect } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import './FeaturedProjects.css';

const FeaturedProjects = () => {
  const { apiCall, isLoading: langLoading, t } = useI18n();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      if (langLoading) return; // Wait for language to be determined
      
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await apiCall('/projects/featured');
        
        // Handle different response structures
        const projectsArray = Array.isArray(data) ? data : data.projects || [];
        setProjects(projectsArray.slice(0, 3)); // Get only first 3 projects
        
      } catch (err) {
        console.error('Failed to fetch featured projects:', err);
        setError(t('ui.error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, [apiCall, langLoading, t]);

  if (isLoading) {
    return (
      <section className="featured-projects">
        <div className="container">
          <h2>{t('sections.featuredProjects')}</h2>
          <div className="projects-grid">
            {[1, 2, 3].map(i => (
              <div key={i} className="project-card loading">
                <div className="loading-placeholder"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="featured-projects">
        <div className="container">
          <h2>{t('sections.featuredProjects')}</h2>
          <p className="error-message">{error}</p>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section className="featured-projects">
        <div className="container">
          <h2>{t('sections.featuredProjects')}</h2>
          <p className="no-projects">No featured projects available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-projects">
      <div className="container">
        <h2>{t('sections.featuredProjects')}</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              {project.image_url && (
                <div className="project-image">
                  <img src={project.image_url} alt={project.title} />
                </div>
              )}
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="project-technologies">
                    {project.tags.map((tag, index) => (
                      <span 
                        key={`${project.id}-tag-${index}`} 
                        className="tech-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="project-links">
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-link">
                      {t('ui.viewProject')}
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-link secondary">
                      {t('ui.github')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
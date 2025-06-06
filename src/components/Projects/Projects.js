// src/components/Projects/Projects.js
import React, { useState, useEffect } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import './projects.css';

const Projects = () => {
  const { apiCall, isLoading: langLoading, t } = useI18n();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories and technologies for filters
  const [categories, setCategories] = useState([]);
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (langLoading) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await apiCall('/projects');
        const projectsArray = Array.isArray(data) ? data : data.projects || [];
        
        setProjects(projectsArray);
        setFilteredProjects(projectsArray);
        
        // Extract unique categories and technologies
        const uniqueCategories = [...new Set(projectsArray.map(p => p.category).filter(Boolean))];
        const uniqueTechs = [...new Set(projectsArray.flatMap(p => p.tags || []))];
        
        setCategories(uniqueCategories);
        setTechnologies(uniqueTechs);
        
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError(t('projects.failedToLoad'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [apiCall, langLoading, t]);

  // Filter projects whenever filters change
  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by technology
    if (selectedTech !== 'all') {
      filtered = filtered.filter(project => 
        project.tags && project.tags.includes(selectedTech)
      );
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, selectedTech, searchTerm]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedTech('all');
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="projects-page">
        <div className="container">
          <div className="projects-header">
            <h1>{t('projects.title')}</h1>
            <p>{t('projects.loadingProjects')}</p>
          </div>
          <div className="projects-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="project-card loading">
                <div className="loading-placeholder"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-page">
        <div className="container">
          <div className="projects-header">
            <h1>{t('projects.title')}</h1>
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="container">
        {/* Header Section */}
        <div className="projects-header">
          <h1>{t('projects.title')}</h1>
          <p className="projects-subtitle">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Filters Section */}
        <div className="projects-filters">
          <div className="filters-row">
            {/* Search */}
            <div className="search-box">
              <input
                type="text"
                placeholder={t('projects.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label>{t('projects.category')}:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">{t('projects.allCategories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Technology Filter */}
            <div className="filter-group">
              <label>{t('projects.technology')}:</label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="filter-select"
              >
                <option value="all">{t('projects.allTechnologies')}</option>
                {technologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            <button onClick={resetFilters} className="reset-filters-btn">
              {t('projects.resetFilters')}
            </button>
          </div>

          {/* Results Count */}
          <div className="results-info">
            {t('projects.showingResults').replace('{count}', filteredProjects.length).replace('{total}', projects.length)}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="no-projects">
            <h3>{t('projects.noProjectsFound')}</h3>
            <p>{t('projects.tryAdjustingFilters')}</p>
            <button onClick={resetFilters} className="reset-btn">
              {t('projects.showAllProjects')}
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Project Card Component
const ProjectCard = ({ project }) => {
  const { t } = useI18n();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'completed': { text: t('projects.status.completed'), class: 'status-completed' },
      'in-progress': { text: t('projects.status.inProgress'), class: 'status-in-progress' },
      'planning': { text: t('projects.status.planning'), class: 'status-planning' },
      'on-hold': { text: t('projects.status.onHold'), class: 'status-on-hold' }
    };
    
    return statusMap[status] || { text: status, class: 'status-default' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const statusInfo = getStatusBadge(project.status);

  return (
    <div className="project-card">
      {/* Project Image */}
      <div className="project-image">
        {project.image_url && !imageError ? (
          <img 
            src={project.image_url} 
            alt={project.title}
            onError={handleImageError}
          />
        ) : (
          <div className="placeholder-image">
            <span className="placeholder-icon">📁</span>
          </div>
        )}
        {project.status && (
          <div className={`project-status ${statusInfo.class}`}>
            {statusInfo.text}
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          {project.category && (
            <span className="project-category">{project.category}</span>
          )}
        </div>

        <p className="project-description">{project.description}</p>

        {/* Technologies */}
        {project.tags && project.tags.length > 0 && (
          <div className="project-technologies">
            {project.tags.map((tag, index) => (
              <span key={index} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Project Details */}
        <div className="project-details">
          {project.start_date && (
            <span className="project-date">
              {t('projects.started')}: {formatDate(project.start_date)}
            </span>
          )}
          {project.end_date && (
            <span className="project-date">
              {t('projects.completed')}: {formatDate(project.end_date)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="project-actions">
          {project.live_url && (
            <a 
              href={project.live_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn primary"
            >
              <span className="btn-icon">🚀</span>
              {t('projects.viewLive')}
            </a>
          )}
          {project.github_url && (
            <a 
              href={project.github_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn secondary"
            >
              <span className="btn-icon">📂</span>
              {t('projects.viewCode')}
            </a>
          )}
          {project.case_study_url && (
            <a 
              href={project.case_study_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-btn tertiary"
            >
              <span className="btn-icon">📖</span>
              {t('projects.caseStudy')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
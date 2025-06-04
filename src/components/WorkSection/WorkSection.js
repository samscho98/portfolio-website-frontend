import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import ProjectCard from '../ProjectCard/ProjectCard';
import './WorkSection.css';

const WorkSection = () => {
  const { t } = useI18n();

  const projects = [
    {
      id: 1,
      title: t('work.project1.title'),
      description: t('work.project1.description')
    },
    {
      id: 2,
      title: t('work.project2.title'),
      description: t('work.project2.description')
    }
  ];

  return (
    <section className="work-section">
      <div className="work-container">
        <h2 className="section-title">{t('work.title')}</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
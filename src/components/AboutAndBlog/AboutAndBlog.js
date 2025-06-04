import React from 'react';
import AboutMe from '../AboutMe/AboutMe';
import LatestBlog from '../LatestBlog/LatestBlog';
import './AboutAndBlog.css';

const AboutAndBlog = () => {
  return (
    <section className="about-and-blog-section">
      <div className="container">
        <div className="about-blog-grid">
          <div className="about-column">
            <AboutMe />
          </div>
          <div className="blog-column">
            <LatestBlog />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAndBlog;
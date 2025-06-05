import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturedProjects from '../components/FeaturedProjects/FeaturedProjects';
import AboutAndBlog from '../components/AboutAndBlog/AboutAndBlog';

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProjects />
      <AboutAndBlog />
    </main>
  );
};

export default HomePage;
import React from 'react';
import { I18nProvider } from './contexts/I18nContext';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import FeaturedProjects from './components/FeaturedProjects/FeaturedProjects';
import AboutAndBlog from './components/AboutAndBlog/AboutAndBlog';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <I18nProvider>
      <div className="App">
        <Header />
        <main>
          <HeroSection />
          <FeaturedProjects />
          <AboutAndBlog />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
};

export default App;
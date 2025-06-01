// src/pages/Services.js - Services page with localization support
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLocalization } from '../context/LocalizationContext';
import { servicesApi } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const { currentLanguage } = useLocalization();

  // Dark mode styles
  const styles = {
    container: {
      backgroundColor: theme === 'dark' ? '#121212' : '#f9fafb',
      color: theme === 'dark' ? '#e6e6e6' : 'inherit',
    },
    heading: {
      color: theme === 'dark' ? '#ffffff' : '#111827',
    },
    subheading: {
      color: theme === 'dark' ? '#a3a3a3' : '#4b5563',
    },
    card: {
      backgroundColor: theme === 'dark' ? '#262626' : 'white',
      borderColor: theme === 'dark' ? '#444444' : '#e5e7eb',
    },
    cardHeading: {
      color: theme === 'dark' ? '#e6e6e6' : '#111827',
    },
    cardText: {
      color: theme === 'dark' ? '#a3a3a3' : '#4b5563',
    },
    priceText: {
      color: theme === 'dark' ? '#3391ff' : '#2563eb',
    },
    ctaSection: {
      backgroundColor: theme === 'dark' ? 'rgba(51, 145, 255, 0.1)' : '#eff6ff',
    },
    button: {
      backgroundColor: theme === 'dark' ? '#3391ff' : '#2563eb',
      color: 'white',
    },
    spinner: {
      borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(37, 99, 235, 0.2)',
      borderTopColor: theme === 'dark' ? '#3391ff' : '#2563eb',
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const data = await servicesApi.getAll(currentLanguage);
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
        
        // Fallback to dummy data in case of error
        setServices([
          {
            id: 1,
            name: "Full-Stack Web Development",
            description: "Complete web application development from concept to deployment. I build modern, responsive websites and web applications using React, Flask, and PostgreSQL.",
            features: [
              "Responsive Design",
              "Modern Frontend Frameworks",
              "RESTful API Development",
              "Database Design & Optimization",
              "Deployment & DevOps"
            ],
            price_range: "$2,000 - $8,000",
            duration_min_hours: 60,
            duration_max_hours: 200,
            icon: "code",
            is_active: true,
            display_order: 1
          },
          {
            id: 2,
            name: "AI Tool Development",
            description: "Custom AI-powered tools and automation solutions. I leverage AI APIs like Claude and ChatGPT to build intelligent applications that streamline workflows.",
            features: [
              "Custom AI Integrations",
              "Workflow Automation",
              "Data Processing Tools",
              "Intelligent Document Processing",
              "API Integration"
            ],
            price_range: "$1,500 - $5,000",
            duration_min_hours: 40,
            duration_max_hours: 120,
            icon: "brain",
            is_active: true,
            display_order: 2
          },
          {
            id: 3,
            name: "Database Design & API Development",
            description: "Robust backend solutions with clean database architecture and RESTful APIs. Perfect for applications that need to scale and handle complex data relationships.",
            features: [
              "Database Schema Design",
              "RESTful API Development",
              "Data Migration Services",
              "Performance Optimization",
              "Documentation & Testing"
            ],
            price_range: "$1,000 - $4,000",
            duration_min_hours: 30,
            duration_max_hours: 100,
            icon: "database",
            is_active: true,
            display_order: 3
          },
          {
            id: 4,
            name: "Website Modernization",
            description: "Upgrade your existing website with modern technologies, improved performance, and enhanced user experience. Includes responsive design and dark mode support.",
            features: [
              "Technology Stack Upgrade",
              "Performance Optimization",
              "Responsive Design Implementation",
              "Dark Mode Support",
              "SEO Improvements"
            ],
            price_range: "$800 - $3,000",
            duration_min_hours: 25,
            duration_max_hours: 80,
            icon: "refresh",
            is_active: true,
            display_order: 4
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [currentLanguage]); // Re-fetch when language changes

  // Icon component mapper
  const getIcon = (iconName) => {
    const iconProps = {
      className: "h-8 w-8",
      style: { color: theme === 'dark' ? '#3391ff' : '#2563eb' }
    };

    switch (iconName) {
      case 'code':
        return (
          <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'brain':
        return (
          <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      case 'database':
        return (
          <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        );
      case 'refresh':
        return (
          <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return (
          <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12" style={styles.container}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={styles.spinner}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12" style={styles.container}>
      {/* Header Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={styles.heading}>
          My Services
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8" style={styles.subheading}>
          I offer comprehensive development services to bring your ideas to life. 
          From concept to deployment, I handle every aspect of your project.
        </p>
      </section>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-8">
          {error}
        </div>
      )}

      {/* Services Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(service => (
            <div 
              key={service.id} 
              className="border rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              style={styles.card}
            >
              {/* Service Icon */}
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-bold" style={styles.cardHeading}>
                  {service.name}
                </h3>
              </div>

              {/* Service Description */}
              <p className="mb-6 text-lg" style={styles.cardText}>
                {service.description}
              </p>

              {/* Features List */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3" style={styles.cardHeading}>
                  What's Included:
                </h4>
                <ul className="space-y-2">
                  {service.features && service.features.map((feature, index) => (
                    <li key={index} className="flex items-center" style={styles.cardText}>
                      <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing and Duration */}
              <div className="border-t pt-6" style={{ borderColor: theme === 'dark' ? '#444444' : '#e5e7eb' }}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm" style={styles.cardText}>Starting from</p>
                    <p className="text-2xl font-bold" style={styles.priceText}>
                      {service.price_range}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm" style={styles.cardText}>Duration</p>
                    <p className="font-semibold" style={styles.cardHeading}>
                      {service.duration_min_hours}-{service.duration_max_hours} hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12" style={styles.heading}>
          My Development Process
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Discovery",
              description: "We discuss your project goals, requirements, and timeline to create a clear roadmap."
            },
            {
              step: "2", 
              title: "Design & Planning",
              description: "I create wireframes and technical specifications, ensuring we're aligned before development begins."
            },
            {
              step: "3",
              title: "Development",
              description: "I build your solution using modern technologies, keeping you updated with regular progress reports."
            },
            {
              step: "4",
              title: "Launch & Support",
              description: "After thorough testing, I deploy your project and provide ongoing support and maintenance."
            }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                style={styles.button}
              >
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-3" style={styles.cardHeading}>
                {item.title}
              </h3>
              <p style={styles.cardText}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-lg p-8 text-center" style={styles.ctaSection}>
        <h2 className="text-3xl font-bold mb-4" style={styles.heading}>
          Ready to Start Your Project?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto" style={styles.subheading}>
          Let's discuss your project requirements and how I can help bring your vision to life. 
          I offer free consultations to understand your needs and provide a detailed project proposal.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/contact" 
            className="px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            style={styles.button}
          >
            Get Free Consultation
          </Link>
          <Link 
            to="/projects" 
            className="px-8 py-3 rounded-lg font-semibold transition-colors border"
            style={{
              color: theme === 'dark' ? '#3391ff' : '#2563eb',
              borderColor: theme === 'dark' ? '#3391ff' : '#2563eb',
              backgroundColor: 'transparent'
            }}
          >
            View My Work
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
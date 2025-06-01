// src/pages/ProjectDetail.js - Updated with localization support
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { projectsApi } from '../services/api';
import { useLocalization } from '../context/LocalizationContext';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const { currentLanguage } = useLocalization();
  
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const data = await projectsApi.getBySlug(slug, currentLanguage);
        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        
        // Check if the error is "Project not found"
        if (err.message && err.message.includes('not found')) {
          setError('Project not found');
        } else {
          setError('Failed to load project. Please try again later.');
        }
        
        // Fallback to dummy data for the specific slug
        const dummyProjects = [
          {
            id: 1,
            title: "AI File Organizer",
            slug: "ai-file-organizer",
            tags: ["Python", "Flask"],
            description: "Organizes codebases for Claude AI analysis.",
            github_url: "https://github.com/samscho98/ai-organizer",
            live_url: null,
            is_private: false,
            is_featured: true,
            image_url: "/images/projects/ai-file-organizer.jpg",
            content: "# AI File Organizer\n\nThis project helps developers organize their codebases for AI analysis. It automatically scans through your project directories, identifies key components, and generates a structured representation that makes it easier for AI assistants to understand your codebase.\n\n## Features\n\n- Automatic file organization\n- Code structure analysis\n- Intelligent categorization\n- Integration with Claude AI\n\n## Technical Details\n\nBuilt with Python and Flask, the application uses advanced text processing algorithms to parse and organize code files."
          },
          {
            id: 2,
            title: "E-Commerce Dashboard",
            slug: "ecommerce-dashboard",
            tags: ["React", "Node.js", "MongoDB"],
            description: "Analytics dashboard for online retail stores.",
            github_url: "https://github.com/samscho98/ecommerce-dashboard",
            live_url: "https://ecommerce-dashboard-demo.com",
            is_private: false,
            is_featured: true,
            image_url: "/images/projects/ecommerce-dashboard.jpg",
            content: "# E-Commerce Dashboard\n\nA comprehensive analytics solution for online retail businesses. This dashboard provides real-time insights into sales, customer behavior, and inventory management.\n\n## Features\n\n- Real-time sales tracking\n- Customer behavior analysis\n- Inventory management\n- Customizable reports\n\n## Technical Details\n\nBuilt with a React frontend, Node.js backend, and MongoDB for data storage. Uses Chart.js for data visualization."
          },
          {
            id: 3,
            title: "Portfolio Website",
            slug: "portfolio-website",
            tags: ["React", "Flask", "Tailwind CSS"],
            description: "My personal portfolio website with dark mode support.",
            github_url: "https://github.com/samscho98/portfolio-website",
            live_url: "https://portfolio.schonenberg.dev",
            is_private: false,
            is_featured: true,
            image_url: "/images/projects/portfolio-website.jpg",
            content: "# Portfolio Website\n\nThis project is my personal portfolio website, designed to showcase my work and skills as a developer. It features a clean, responsive design with dark mode support.\n\n## Features\n\n- Responsive Design\n- Dark Mode Support\n- Project Showcase\n- Contact Form\n- Multi-language Support\n\n## Technical Details\n\nThe portfolio uses React for the frontend and Flask for the backend API. The site is deployed on Render.com with internationalization support."
          },
          {
            id: 4,
            title: "Task Management API",
            slug: "task-management-api",
            tags: ["Python", "Flask", "PostgreSQL"],
            description: "RESTful API for task management applications.",
            github_url: "https://github.com/samscho98/task-api",
            live_url: null,
            is_private: false,
            is_featured: false,
            image_url: "/images/projects/task-api.jpg",
            content: "# Task Management API\n\nA robust RESTful API built for task management applications, providing endpoints for task creation, organization, assignment, and team collaboration.\n\n## Features\n\n- User Authentication\n- Task Management\n- Task Organization\n- Team Collaboration\n\n## Technical Details\n\nBuilt with Python Flask and PostgreSQL, this API follows RESTful principles and incorporates modern authentication practices."
          },
          {
            id: 5,
            title: "Client CRM System",
            slug: "client-crm",
            tags: ["React", "PostgreSQL", "Express"],
            description: "Custom CRM solution for a marketing agency.",
            github_url: null,
            live_url: null,
            is_private: true,
            is_featured: false,
            image_url: "/images/projects/client-crm.jpg",
            content: "# Client CRM System\n\nA private project developed for a marketing agency to manage their client relationships, campaigns, and analytics in one place.\n\n*This is a private client project — detailed write-up available upon request.*\n\n## My Contribution\n\nI designed and implemented the full-stack solution, including:\n\n- Client database architecture\n- Campaign management tools\n- Reporting and analytics dashboard\n- Integration with existing marketing tools\n\n## Technologies Used\n\nReact, PostgreSQL, Express, and various marketing APIs for integration purposes."
          }
        ];
        
        const foundProject = dummyProjects.find(p => p.slug === slug);
        if (foundProject) {
          setProject(foundProject);
          // Clear error if we found a fallback project
          setError(null);
        } else {
          setError('Project not found');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [slug, currentLanguage]); // Re-fetch when language changes
  
  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded">
          {error}
        </div>
        <Link 
          to="/projects" 
          className="mt-4 inline-block bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Projects
        </Link>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-700 text-yellow-700 dark:text-yellow-200 px-4 py-3 rounded">
          Project not found
        </div>
        <Link 
          to="/projects" 
          className="mt-4 inline-block bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Projects
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/projects" 
        className="mb-4 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
      >
        &larr; Back to Projects
      </Link>
      
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md overflow-hidden">
        {/* Project image with placeholder fallback */}
        {project.image_url && !imageError ? (
          <div className="w-full h-64 md:h-80 overflow-hidden">
            <img 
              src={project.image_url} 
              alt={project.title} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className="w-full h-48 md:h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <svg 
              className="h-24 w-24 text-gray-400 dark:text-gray-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h1>
          
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags && project.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">{project.description}</p>
          
          <div className="mb-6 flex space-x-4">
            {!project.is_private && project.github_url && (
              <a 
                href={project.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gray-800 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-800 text-white px-4 py-2 rounded transition-colors"
              >
                View on GitHub
              </a>
            )}
            
            {project.live_url && (
              <a 
                href={project.live_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
          
          <div className="prose dark:prose-invert max-w-none mt-6">
            {project.content ? (
              <ReactMarkdown>{project.content}</ReactMarkdown>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">No detailed content available for this project.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
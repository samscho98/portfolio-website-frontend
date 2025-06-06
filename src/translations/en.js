// src/translations/en.js
const enTranslations = {
  nav: {
    home: 'Home',
    about: 'About Me',
    blog: 'Blog',
    projects: 'Projects',
    pricing: 'Pricing',
    contact: 'Contact'
  },
  sections: {
    featuredProjects: 'Featured Projects',
    latestBlog: 'Latest Blog Post',
    aboutMe: 'About Me',
    testimonials: 'What Clients Say',
    blog: 'Blog & Insights'
  },
  ui: {
    viewProject: 'View Project',
    github: 'GitHub',
    readMore: 'Read More',
    learnMore: 'Learn More',
    loading: 'Loading...',
    error: 'Something went wrong',
    copyright: 'All rights reserved.',
    language: 'Language',
    searchArticles: 'Search articles...',
    allCategories: 'All Categories',
    noArticlesFound: 'No articles found',
    tryAdjustingSearch: 'Try adjusting your search terms or check back later.',
    previous: 'Previous',
    next: 'Next',
    backToBlog: 'Back to Blog',
    shareThisArticle: 'Share this article',
    aboutTheAuthor: 'About the Author',
    relatedArticles: 'Related Articles',
    tableOfContents: 'Table of Contents',
    tags: 'Tags',
    comments: 'Comments',
    views: 'Views',
    likes: 'Likes',
    minRead: 'Min. read'
  },
  hero: {
    greeting: 'I am',
    role: 'a Backend Developer',
    expertise: '& Freelance Expert in Data Management'
  },
  footer: {
    contact: 'Contact',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    followUs: 'Follow Us',
    subscribe: 'Subscribe to our newsletter for updates and offers.',
    subscribeButton: 'Subscribe',
    thankYou: 'Thank you for subscribing!',
    error: 'Subscription failed. Please try again later.',
    rights: '© 2025 Schonberg Developments. All rights reserved.',
  },
  blog: {
    title: 'Blog & Insights',
    description: 'Thoughts on software development, tech trends, and lessons from building digital solutions.',
    searchPlaceholder: 'Search articles...',
    allCategories: 'All Categories',
    noArticlesFound: 'No articles found',
    tryAdjustingSearch: 'Try adjusting your search terms or check back later.',
    articleNotFound: 'Article not found',
    articleNotFoundDescription: 'The article you are looking for does not exist or has been removed.',
    loadingArticle: 'Loading article...',
    commentsSystem: 'Comments system integration would appear here (e.g., Disqus, custom solution)',
    linkCopied: 'Link copied to clipboard!',
    failedToCopy: 'Failed to copy link',
    loadingArticles: 'Loading articles...',
    viewAllArticles: 'View All Articles',
    readMoreArrow: 'Read More →',
    uncategorized: 'Uncategorized',
    minRead: 'min read',
    views: 'views',
    likes: 'likes',
    comments: 'comments'
  },
  projects: {
    title: 'My Projects',
    subtitle: 'A showcase of my work in backend development, data management, and full-stack solutions',
    searchPlaceholder: 'Search projects...',
    allCategories: 'All Categories',
    allTechnologies: 'All Technologies',
    category: 'Category',
    technology: 'Technology',
    resetFilters: 'Reset Filters',
    showingResults: 'Showing {count} of {total} projects',
    noProjectsFound: 'No projects found',
    tryAdjustingFilters: 'Try adjusting your filters or search terms.',
    showAllProjects: 'Show All Projects',
    started: 'Started',
    completed: 'Completed',
    viewLive: 'View Live',
    viewCode: 'View Code',
    caseStudy: 'Case Study',
    loadingProjects: 'Loading projects...',
    failedToLoad: 'Failed to load projects. Please try again later.',
    status: {
      completed: 'Completed',
      inProgress: 'In Progress',
      planning: 'Planning',
      onHold: 'On Hold'
    }
  },
  pricing: {
    title: 'Pricing',
    subtitle: 'Transparent pricing for freelance development services. Let\'s build something amazing together.',
    consultation: {
      title: 'Consultation',
      price: '€75/hour',
      description: 'Technical consultation, code review, and project planning',
      features: [
        'Technical assessment',
        'Architecture planning',
        'Code review',
        'Best practices guidance'
      ]
    },
    development: {
      title: 'Development',
      price: '€65/hour',
      description: 'Full-stack development and implementation',
      features: [
        'Frontend development',
        'Backend development',
        'Database design',
        'API development',
        'Testing & deployment'
      ],
      mostPopular: 'Most Popular'
    },
    project: {
      title: 'Project-Based',
      price: 'Fixed Price',
      description: 'Complete project delivery with defined scope',
      features: [
        'Detailed project scope',
        'Timeline milestones',
        'Regular updates',
        'Post-launch support'
      ]
    },
    cta: {
      title: 'Ready to get started?',
      subtitle: 'Let\'s discuss your project and find the best solution for your needs.',
      getInTouch: 'Get in Touch',
      emailDirectly: 'Email Directly'
    },
    alternative: {
      title: 'Prefer to reach out directly?',
      email: '📧 contact@schonenberg.dev',
      linkedin: '💼 LinkedIn'
    }
  },
  contact: {
    title: 'Get In Touch',
    subtitle: 'Ready to bring your project to life? Let\'s discuss how I can help you build scalable backend solutions and efficient data management systems.',
    form: {
      name: 'Name',
      nameRequired: 'Name is required',
      email: 'Email',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email address',
      company: 'Company',
      phone: 'Phone',
      projectType: 'Project Type',
      budgetRange: 'Budget Range',
      timeline: 'Timeline',
      referralSource: 'How did you find me?',
      message: 'Project Details',
      messageRequired: 'Message is required',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'your.email@example.com',
      companyPlaceholder: 'Your company name',
      phonePlaceholder: '+49 123 456 7890',
      messagePlaceholder: 'Tell me about your project. What are your goals, requirements, and any specific challenges you\'re facing?'
    },
    projectTypes: {
      select: 'Select project type',
      website: 'Website Development',
      api: 'API Development',
      database: 'Database Design',
      automation: 'Process Automation',
      dataProcessing: 'Data Processing',
      consultation: 'Technical Consultation',
      other: 'Other'
    },
    budgetRanges: {
      select: 'Select budget range',
      under200: 'Under 200€',
      range200500: '200€ - 500€',
      range5001000: '500€ - €1,000',
      range10002500: '1,000€ - 2,500€',
      over2500: 'Over €2,500',
      flexible: 'Flexible / To be discussed'
    },
    timelines: {
      select: 'Select timeline',
      asap: 'ASAP',
      oneMonth: '1 Month',
      twoThreeMonths: '2-3 Months',
      threeToSixMonths: '3-6 Months',
      flexible: 'Flexible'
    },
    referralSources: {
      select: 'Select source',
      googleSearch: 'Google Search',
      linkedin: 'LinkedIn',
      referral: 'Referral from friend/colleague',
      github: 'GitHub',
      socialMedia: 'Social Media',
      other: 'Other'
    },
    submit: {
      sending: 'Sending...',
      send: 'Send Message',
      success: 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.',
      error: 'Error: There was a problem sending your message. Please try again or email me directly.'
    },
    alternative: {
      title: 'Prefer to reach out directly?',
      email: '📧 contact@schonenberg.dev',
      linkedin: '💼 LinkedIn'
    }
  }
};

export default enTranslations;
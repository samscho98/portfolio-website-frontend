# Portfolio Website Frontend

A modern, responsive portfolio website built with React and Tailwind CSS, featuring dark mode support, internationalization, and a comprehensive contact system. This frontend connects to a Flask API backend for dynamic content management.

## 🌟 Features

### 🎨 **Modern Design & User Experience**
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes with system preference detection
- **Smooth Animations**: Subtle transitions and hover effects for enhanced interactivity
- **Clean Typography**: Using Inter and Poppins fonts for optimal readability

### 🌍 **Internationalization**
- **Multi-language Support**: Easy language switching with flag indicators
- **Localized Content**: Projects, services, and UI text in multiple languages
- **Language-Equal System**: All languages treated equally, no "default" language preference
- **Automatic Detection**: Detects user's browser language preference

### 📱 **Core Pages & Functionality**
- **Home**: Hero section with featured projects and call-to-action
- **About**: Personal introduction, skills showcase, and background information  
- **Projects**: Filterable project gallery with detailed project pages
- **Services**: Comprehensive service offerings with pricing and process overview
- **Contact**: Enhanced contact form with international address support

### 🛠 **Enhanced Contact System**
- **Comprehensive Form**: Name, email, company, phone, project type, budget, timeline
- **International Addresses**: Support for global address formats with country-specific validation
- **Lead Qualification**: Automatic priority and referral source tracking
- **Smart Validation**: Real-time form validation with helpful error messages

### ⚡ **Performance & Technical**
- **Fast Loading**: Optimized bundle size and lazy loading
- **SEO Ready**: Proper meta tags and semantic HTML structure
- **Modern Tech Stack**: React 18, React Router 6, Tailwind CSS 3
- **API Integration**: Clean API service layer with error handling and fallbacks

## 🔧 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend Framework** | React 18 |
| **Routing** | React Router DOM 6 |
| **Styling** | Tailwind CSS 3, Custom CSS |
| **Content Rendering** | React Markdown |
| **State Management** | React Context (Theme, Localization) |
| **Build Tool** | Create React App |
| **Deployment** | Render.com (Static Site) |

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager
- Access to the Portfolio API backend

## 📈 Performance

### Optimization Features
- **Code Splitting**: Automatic through Create React App
- **Image Optimization**: Lazy loading and error handling for project images
- **Bundle Size**: Minimized through tree shaking and dead code elimination
- **Caching**: Static assets cached through Render.com CDN

### Performance Tips
- Keep API responses lean (only fetch needed data)
- Use loading states to improve perceived performance
- Optimize images before uploading to reduce bundle size
- Consider implementing virtual scrolling for large project lists

## 🔐 Security

### Security Features
- **XSS Protection**: React's built-in XSS prevention
- **Content Security**: Proper sanitization of markdown content
- **API Security**: HTTPS-only API communication
- **No Sensitive Data**: No API keys or secrets in frontend code

## 📄 License

This project is part of a personal portfolio and freelance business. All rights reserved.

## 🤝 Contact

**Sam Schonenberg**
- Website: [schonenberg.dev](https://portfolio.schonenberg.dev)
- Email: sam@schonenberg.dev
- GitHub: [@samscho98](https://github.com/samscho98)
- LinkedIn: [linkedin.com/in/sams98](https://www.linkedin.com/in/sams98/)

---

*Built with ❤️ using React and Tailwind CSS*
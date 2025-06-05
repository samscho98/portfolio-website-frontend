import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import './BlogPost.css';

const BlogPost = ({ slug }) => {
  const { apiCall, isLoading: langLoading } = useI18n();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    if (slug && !langLoading) {
      fetchArticle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, langLoading]); // Disable eslint for this effect

  useEffect(() => {
    if (article) {
      setupReadingProgress();
      setupTableOfContents();
      setupShareButtons();
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]); // Disable eslint for this effect

  const fetchArticle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await apiCall(`/blog/articles/${slug}`);
      
      if (data.status === 'success' && data.article) {
        setArticle(data.article);
        
        // Fetch related articles
        fetchRelatedArticles(data.article.category?.slug);
      } else {
        throw new Error('Article not found');
      }
      
    } catch (err) {
      console.error('Failed to fetch article:', err);
      setError('Article not found');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedArticles = async (categorySlug) => {
    try {
      const data = await apiCall(`/blog/articles?category=${categorySlug}&per_page=3`);
      if (data.status === 'success') {
        // Filter out current article
        const related = data.articles.filter(a => a.slug !== slug).slice(0, 3);
        setRelatedArticles(related);
      }
    } catch (err) {
      console.error('Failed to fetch related articles:', err);
    }
  };

  const handleScroll = () => {
    const article = document.querySelector('.article-body');
    if (!article) return;

    const scrollTop = window.pageYOffset;
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    
    let progress = 0;
    if (scrollTop >= articleTop) {
      const scrollIntoArticle = Math.min(scrollTop - articleTop, articleHeight);
      progress = (scrollIntoArticle / articleHeight) * 100;
    }
    
    setReadingProgress(Math.min(progress, 100));

    // Update active section for TOC
    updateActiveSection();
  };

  const setupReadingProgress = () => {
    window.addEventListener('scroll', handleScroll);
  };

  const setupTableOfContents = () => {
    if (!article) return;
    
    // This would be called after article content is rendered
    setTimeout(() => {
      const headings = document.querySelectorAll('.article-body h2, .article-body h3, .article-body h4');
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = generateId(heading.textContent);
        }
      });
    }, 100);
  };

  const updateActiveSection = () => {
    const headings = document.querySelectorAll('.article-body h2, .article-body h3, .article-body h4');
    
    let current = '';
    headings.forEach(heading => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 100) {
        current = heading.id;
      }
    });
    
    setActiveSection(current);
  };

  const setupShareButtons = () => {
    // Share button functionality will be handled by click events
  };

  const generateId = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim('-');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareOnTwitter = () => {
    const url = window.location.href;
    const text = article.title;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy link');
    }
  };

  const showToast = (message) => {
    // Simple toast implementation
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // Generate table of contents from content
  const generateTOC = () => {
    if (!article?.content) return [];
    
    const headingRegex = /<h([2-4])[^>]*>(.*?)<\/h[2-4]>/gi;
    const toc = [];
    let match;
    
    while ((match = headingRegex.exec(article.content)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, ''); // Strip HTML tags
      const id = generateId(text);
      
      toc.push({
        level,
        text,
        id
      });
    }
    
    return toc;
  };

  if (isLoading) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading article...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-container">
          <div className="error-state">
            <h1>Article Not Found</h1>
            <p>The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog" className="back-to-blog">← Back to Blog</Link>
          </div>
        </div>
      </div>
    );
  }

  const toc = generateTOC();

  return (
    <div className="blog-post-page">
      {/* Reading Progress Bar */}
      <div 
        className="reading-progress" 
        style={{ width: `${readingProgress}%` }}
      ></div>

      <div className="container">
        <div className="back-button">
          <Link to="/blog">← Back to Blog</Link>
        </div>

        <div className="article-layout">
          <article className="article-content">
            <header className="article-header">
              {article.featured_image_url && (
                <div className="article-featured-image">
                  <img src={article.featured_image_url} alt={article.title} />
                </div>
              )}
              
              <div className="article-meta">
                <span 
                  className="article-category"
                  style={{ backgroundColor: article.category?.color || '#667eea' }}
                >
                  {article.category?.name || 'Uncategorized'}
                </span>
                <span>{formatDate(article.published_at)}</span>
                <span>{article.reading_time_minutes} min read</span>
              </div>
              
              <h1 className="article-title">{article.title}</h1>
              
              {article.excerpt && (
                <p className="article-excerpt">{article.excerpt}</p>
              )}

              <div className="article-stats">
                <span className="stat">
                  <span className="stat-icon">👁</span>
                  {article.view_count} views
                </span>
                <span className="stat">
                  <span className="stat-icon">❤️</span>
                  {article.like_count} likes
                </span>
              </div>
            </header>

            <div 
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {article.tags && article.tags.length > 0 && (
              <footer className="article-footer">
                <div className="article-tags">
                  <h4>Tags:</h4>
                  <div className="tag-list">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </footer>
            )}
          </article>

          <aside className="sidebar">
            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="sidebar-widget toc">
                <h3>Table of Contents</h3>
                <ul>
                  {toc.map((item, index) => (
                    <li key={index}>
                      <a
                        href={`#${item.id}`}
                        className={`toc-h${item.level} ${activeSection === item.id ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(item.id);
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Author Info */}
            <div className="sidebar-widget author-info">
              <h3>About the Author</h3>
              <div className="author-avatar">
                {article.author?.avatar_url ? (
                  <img src={article.author.avatar_url} alt={article.author.full_name} />
                ) : (
                  <span>👨‍💻</span>
                )}
              </div>
              <div className="author-name">{article.author?.full_name || 'Sam Schonenberg'}</div>
              <div className="author-bio">
                Full-stack developer specializing in Python, JavaScript, and database architecture. 
                Passionate about building scalable web applications.
              </div>
            </div>

            {/* Share Buttons */}
            <div className="sidebar-widget">
              <h3>Share This Article</h3>
              <div className="share-buttons">
                <button onClick={shareOnTwitter} className="share-btn twitter">
                  🐦 Twitter
                </button>
                <button onClick={shareOnLinkedIn} className="share-btn linkedin">
                  💼 LinkedIn
                </button>
                <button onClick={copyToClipboard} className="share-btn copy">
                  📋 Copy Link
                </button>
              </div>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="sidebar-widget">
                <h3>Related Articles</h3>
                {relatedArticles.map(relatedArticle => (
                  <div key={relatedArticle.id} className="related-post">
                    <div className="related-post-image">
                      {relatedArticle.featured_image_url ? (
                        <img src={relatedArticle.featured_image_url} alt={relatedArticle.title} />
                      ) : (
                        <span>📝</span>
                      )}
                    </div>
                    <div className="related-post-content">
                      <h4>
                        <Link to={`/blog/${relatedArticle.slug}`}>
                          {relatedArticle.title}
                        </Link>
                      </h4>
                      <div className="related-post-meta">
                        {relatedArticle.category?.name} • {relatedArticle.reading_time_minutes} min read
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>

        {article.x_post_url && (
          <section className="x-discussion-section">
            <div className="x-discussion-header">
              <h3 className="x-discussion-title">Join the Discussion</h3>
              <p className="x-discussion-subtitle">
                What are your thoughts on this topic? Share your experiences, ask questions, 
                or discuss best practices with the community on X.
              </p>
            </div>
            <a href={article.x_post_url} target="_blank" rel="noopener noreferrer" className="x-discussion-button">
              <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Discuss on X
            </a>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
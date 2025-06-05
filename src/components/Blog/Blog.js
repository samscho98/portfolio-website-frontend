import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import './Blog.css';

const Blog = () => {
  const { apiCall, isLoading: langLoading, t } = useI18n();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langLoading]); // Remove fetchCategories from dependencies

  useEffect(() => {
    fetchBlogArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentCategory, currentSearch, langLoading]); // Remove fetchBlogArticles from dependencies

  const fetchCategories = async () => {
    if (langLoading) return;
    
    try {
      const data = await apiCall('/blog/categories');
      if (data.status === 'success') {
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchBlogArticles = async () => {
    if (langLoading) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: '6'
      });
      
      if (currentCategory) params.append('category', currentCategory);
      if (currentSearch) params.append('search', currentSearch);
      
      const data = await apiCall(`/blog/articles?${params.toString()}`);
      
      if (data.status === 'success') {
        setArticles(data.articles || []);
        setPagination(data.pagination || {});
      } else {
        throw new Error('Invalid API response');
      }
      
    } catch (err) {
      console.error('Failed to fetch blog articles:', err);
      setError(t('ui.error') || 'Failed to load articles');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setCurrentSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setCurrentCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.pages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (categoryName) => {
    const icons = {
      'web development': '💻',
      'artifical intelligence': '🤖',
      'tutorials': '🚀',
      'technology': '🌐',
      'insights': '💡'
    };
    return icons[categoryName?.toLowerCase()] || '📝';
  };

  const openBlogPost = (article) => {
    // Navigate to individual blog post using React Router
    navigate(`/blog/${article.slug}`);
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentSearch !== '') {
        fetchBlogArticles();
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearch]); // Remove fetchBlogArticles from dependencies

  if (isLoading && articles.length === 0) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="page-header">
            <h1>{t('sections.blog') || 'Blog'}</h1>
            <p>Loading articles...</p>
          </div>
          <div className="blog-loading">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <div className="container">
          <div className="page-header">
            <h1>{t('sections.blog') || 'Blog'}</h1>
            <p className="error-message">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-container">
        <div className="page-header">
          <h1>{t('sections.blog') || 'Blog & Insights'}</h1>
          <p>Thoughts on software development, technology trends, and lessons learned from building digital solutions.</p>
        </div>

        {/* Search and Filter */}
        <div className="blog-filters">
          <div className="filter-row">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search articles..."
                value={currentSearch}
                onChange={handleSearchChange}
              />
            </div>
            <div className="category-filter">
              <select value={currentCategory} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {articles.length > 0 ? (
          <div className="blog-grid">
            {articles.map(article => (
              <article 
                key={article.id} 
                className="blog-card"
                onClick={() => openBlogPost(article)}
              >
                {article.featured_image_url && (
                  <div className="blog-image">
                    <img src={article.featured_image_url} alt={article.title} />
                  </div>
                )}
                {!article.featured_image_url && (
                  <div className="blog-image blog-image-placeholder">
                    {getCategoryIcon(article.category?.name)}
                  </div>
                )}
                <div className="blog-content">
                  <div className="blog-meta">
                    <span 
                      className="blog-category"
                      style={{ backgroundColor: article.category?.color || '#667eea' }}
                    >
                      {article.category?.name || 'Uncategorized'}
                    </span>
                    <span>{formatDate(article.published_at)}</span>
                    <span>{article.reading_time_minutes} min read</span>
                  </div>
                  <h3 className="blog-title">{article.title}</h3>
                  <p className="blog-excerpt">{article.excerpt}</p>
                  <div className="blog-stats">
                    <span className="stat">
                      <span className="stat-icon">👁</span>
                      {article.view_count}
                    </span>
                    <span className="stat">
                      <span className="stat-icon">❤️</span>
                      {article.like_count}
                    </span>
                    {article.comment_count > 0 && (
                      <span className="stat">
                        <span className="stat-icon">💬</span>
                        {article.comment_count}
                      </span>
                    )}
                  </div>
                  <div className="read-more">
                    Read More →
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No articles found</h3>
            <p>Try adjusting your search terms or check back later for new content.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!pagination.has_prev}
              className="pagination-btn"
            >
              ← Previous
            </button>
            
            {/* Page numbers */}
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page and adjacent pages
              if (
                page === 1 ||
                page === pagination.pages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="pagination-ellipsis">...</span>;
              }
              return null;
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!pagination.has_next}
              className="pagination-btn"
            >
              Next →
            </button>
          </div>
        )}

        {/* Loading overlay for page changes */}
        {isLoading && articles.length > 0 && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
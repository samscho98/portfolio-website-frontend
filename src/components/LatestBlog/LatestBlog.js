import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';
import './LatestBlog.css';

const LatestBlog = () => {
  const { apiCall, isLoading: langLoading, t } = useI18n();
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBlog = async () => {
      if (langLoading) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching latest blog post...');
        const data = await apiCall('/blog/articles?per_page=1&is_featured=true');
        console.log('Blog response:', data);
        
        // Handle the API response structure
        if (data.status === 'success' && data.articles && data.articles.length > 0) {
          setBlogPost(data.articles[0]);
        } else {
          // Try to get the latest published article if no featured
          const latestData = await apiCall('/blog/articles?per_page=1');
          if (latestData.status === 'success' && latestData.articles && latestData.articles.length > 0) {
            setBlogPost(latestData.articles[0]);
          } else {
            setBlogPost(null);
          }
        }
        
      } catch (err) {
        console.error('Failed to fetch latest blog post:', err);
        setError(t('ui.error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestBlog();
  }, [apiCall, langLoading, t]);

  if (isLoading) {
    return (
      <div className="latest-blog">
        <div className="blog-loading">
          <div className="loading-placeholder-blog"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="latest-blog">
        <h2>{t('sections.latestBlog')}</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="latest-blog">
        <h2>{t('sections.latestBlog')}</h2>
        <p className="no-blog">No blog posts available</p>
        <Link to="/blog" className="cta-button" style={{ marginTop: '1rem' }}>
          View All Articles
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="latest-blog">
      <h2>{t('sections.latestBlog')}</h2>
      <article className="blog-card">
        {blogPost.featured_image_url && (
          <div className="blog-image">
            <img src={blogPost.featured_image_url} alt={blogPost.title} />
          </div>
        )}
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-date">{formatDate(blogPost.published_at)}</span>
            {blogPost.reading_time_minutes && (
              <span className="reading-time">{blogPost.reading_time_minutes} min read</span>
            )}
          </div>
          <h3>{blogPost.title}</h3>
          <p>{blogPost.excerpt}</p>
          <div className="blog-stats">
            {blogPost.view_count !== undefined && (
              <span className="stat">
                <span className="material-icons">visibility</span>
                {blogPost.view_count}
              </span>
            )}
            {blogPost.like_count !== undefined && (
              <span className="stat">
                <span className="material-icons">favorite</span>
                {blogPost.like_count}
              </span>
            )}
          </div>
          <Link to={`/blog/${blogPost.slug}`} className="read-more-btn">
            {t('ui.readMore')}
          </Link>
        </div>
      </article>
    </div>
  );
};

export default LatestBlog;
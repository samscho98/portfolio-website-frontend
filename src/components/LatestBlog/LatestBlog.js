import React, { useState, useEffect } from 'react';
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
        
        const data = await apiCall('/blog/featured?limit=1');
        
        // Handle different response structures
        const articles = data.articles || data || [];
        setBlogPost(articles[0] || null);
        
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
            {blogPost.view_count && (
              <span className="stat">{blogPost.view_count} views</span>
            )}
            {blogPost.like_count && (
              <span className="stat">{blogPost.like_count} likes</span>
            )}
          </div>
          <a href={`/blog/${blogPost.slug}`} className="read-more-btn">
            {t('ui.readMore')}
          </a>
        </div>
      </article>
    </div>
  );
};

export default LatestBlog;
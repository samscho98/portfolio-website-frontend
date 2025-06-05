import React from 'react';
import { useI18n } from '../contexts/I18nContext';

const ContactPage = () => {
  const { t } = useI18n();
  
  return (
    <section style={{ 
      padding: '6rem 2rem', 
      background: '#0f172a', 
      color: 'white',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          {t('nav.contact') || 'Contact'}
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '2rem' }}>
          Get in touch for freelance projects, collaborations, or just to say hello.
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
          <a 
            href="mailto:contact@schonenberg.dev" 
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            Email Me
          </a>
          <a 
            href="https://www.linkedin.com/in/sams98/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              color: '#cbd5e1',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              border: '2px solid #475569'
            }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
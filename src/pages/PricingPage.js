import React from 'react';
import { useI18n } from '../contexts/I18nContext';

const PricingPage = () => {
  const { t } = useI18n();
  
  return (
    <section style={{ 
      padding: '6rem 2rem', 
      background: '#0f172a', 
      color: 'white',
      minHeight: '60vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            {t('pricing.title')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
            {t('pricing.subtitle')}
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Consultation Package */}
          <div style={{
            background: '#1e293b',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #334155',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
              {t('pricing.consultation.title')}
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#7c9ef8' }}>
              {t('pricing.consultation.price')}
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              {t('pricing.consultation.description')}
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              textAlign: 'left', 
              color: '#cbd5e1',
              marginBottom: '2rem'
            }}>
              {t('pricing.consultation.features').map((feature, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          {/* Development Package */}
          <div style={{
            background: '#1e293b',
            padding: '2rem',
            borderRadius: '12px',
            border: '2px solid #667eea',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#667eea',
              color: 'white',
              padding: '0.25rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}>
              {t('pricing.development.mostPopular')}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
              {t('pricing.development.title')}
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#7c9ef8' }}>
              {t('pricing.development.price')}
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              {t('pricing.development.description')}
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              textAlign: 'left', 
              color: '#cbd5e1',
              marginBottom: '2rem'
            }}>
              {t('pricing.development.features').map((feature, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          {/* Project Package */}
          <div style={{
            background: '#1e293b',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #334155',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
              {t('pricing.project.title')}
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#7c9ef8' }}>
              {t('pricing.project.price')}
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              {t('pricing.project.description')}
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              textAlign: 'left', 
              color: '#cbd5e1',
              marginBottom: '2rem'
            }}>
              {t('pricing.project.features').map((feature, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
            {t('pricing.cta.title')}
          </h3>
          <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
            {t('pricing.cta.subtitle')}
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <a 
              href="/contact" 
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600'
              }}
            >
              {t('pricing.cta.getInTouch')}
            </a>
            <a 
              href="mailto:contact@schonenberg.dev" 
              style={{
                padding: '0.75rem 2rem',
                background: 'transparent',
                color: '#cbd5e1',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                border: '2px solid #475569'
              }}
            >
              {t('pricing.cta.emailDirectly')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
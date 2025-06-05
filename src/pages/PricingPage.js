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
            {t('nav.pricing') || 'Pricing'}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
            Transparent pricing for freelance development services. Let's build something amazing together.
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
              Consultation
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#7c9ef8' }}>
              €75/hour
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              Technical consultation, code review, and project planning
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              textAlign: 'left', 
              color: '#cbd5e1',
              marginBottom: '2rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Technical assessment</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Architecture planning</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Code review</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Best practices guidance</li>
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
              Most Popular
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
              Development
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#7c9ef8' }}>
              €65/hour
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              Full-stack development and implementation
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              textAlign: 'left', 
              color: '#cbd5e1',
              marginBottom: '2rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Frontend development</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Backend development</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Database design</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ API development</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Testing & deployment</li>
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
              Project-Based
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#7c9ef8' }}>
              Fixed Price
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              Complete project delivery with defined scope
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              textAlign: 'left', 
              color: '#cbd5e1',
              marginBottom: '2rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Detailed project scope</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Timeline milestones</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Regular updates</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Post-launch support</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
            Ready to get started?
          </h3>
          <p style={{ color: '#cbd5e1', marginBottom: '2rem' }}>
            Let's discuss your project and find the best solution for your needs.
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
              Get in Touch
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
              Email Directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
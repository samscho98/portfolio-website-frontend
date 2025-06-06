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

        {/* Notice about web development pricing */}
        <div style={{
          background: '#1e293b',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #334155',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#7c9ef8' }}>
            🚧 Web Development Pricing Coming Soon
          </h3>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6' }}>
            I'm currently updating my web development service packages and pricing structure. 
            Please contact me directly to discuss your web development project requirements and get a custom quote.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Python Automation & Data Projects */}
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
              Available Now
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
              Python Automation & Data
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#7c9ef8' }}>
              €50/hour
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              Python automation, data processing, and AI development
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              textAlign: 'left', 
              color: '#cbd5e1',
              marginBottom: '2rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Process automation</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Data analysis & processing</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ AI/ML integration</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ API development</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Database optimization</li>
            </ul>
          </div>

          {/* Static Website Development */}
          <div style={{
            background: '#1e293b',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #334155',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
              Static Website Development
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#7c9ef8' }}>
              €50/hour
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              Fast, secure, and SEO-optimized static websites
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              textAlign: 'left', 
              color: '#cbd5e1',
              marginBottom: '2rem'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>✓ Portfolio websites</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Business landing pages</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Blog & content sites</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Mobile-responsive design</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Fast hosting setup</li>
            </ul>
          </div>

          {/* Fixed Price Projects */}
          <div style={{
            background: '#1e293b',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #334155',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
              Fixed Price Projects
            </h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#7c9ef8' }}>
              Custom Quote
            </div>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              Complete project delivery with defined scope and timeline
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
              <li style={{ marginBottom: '0.5rem' }}>✓ Regular progress updates</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Post-delivery support</li>
              <li style={{ marginBottom: '0.5rem' }}>✓ Documentation included</li>
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
import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';

const ContactPage = () => {
  const { t, apiCall } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    project_type: '',
    budget_range: '',
    timeline: '',
    message: '',
    referral_source: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [errors, setErrors] = useState({});

  const projectTypes = [
    { value: 'website', label: 'Website Development' },
    { value: 'api', label: 'API Development' },
    { value: 'database', label: 'Database Design' },
    { value: 'automation', label: 'Process Automation' },
    { value: 'data-processing', label: 'Data Processing' },
    { value: 'consultation', label: 'Technical Consultation' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: 'under-200', label: 'Under 200€' },
    { value: '200-500', label: '200€ - 500€' },
    { value: '500-1000', label: '500€ - €1,000' },
    { value: '1000-2500', label: '1,000€ - 2,500€' },
    { value: 'over-2500', label: 'Over €2,500' },
    { value: 'flexible', label: 'Flexible / To be discussed' }
  ];

  const timelines = [
    { value: 'asap', label: 'ASAP' },
    { value: '1-month', label: '1 Month' },
    { value: '2-3-months', label: '2-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const referralSources = [
    { value: 'google-search', label: 'Google Search' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'referral', label: 'Referral from friend/colleague' },
    { value: 'github', label: 'GitHub' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          project_type: '',
          budget_range: '',
          timeline: '',
          message: '',
          referral_source: ''
        });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: 'white',
      paddingTop: '80px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('nav.contact') || 'Get In Touch'}
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#cbd5e1', 
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Ready to bring your project to life? Let's discuss how I can help you build scalable backend solutions and efficient data management systems.
          </p>
        </div>

        {/* Contact Form */}
        <div style={{
          background: '#1e293b',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #334155'
        }}>
          {submitStatus === 'success' && (
            <div style={{
              background: '#22c55e',
              color: 'white',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <strong>Thank you!</strong> Your message has been sent successfully. I'll get back to you within 24 hours.
            </div>
          )}

          {submitStatus === 'error' && (
            <div style={{
              background: '#ef4444',
              color: 'white',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <strong>Error:</strong> There was a problem sending your message. Please try again or email me directly.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name and Email Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#cbd5e1'
                }}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#334155',
                    border: `2px solid ${errors.name ? '#ef4444' : '#475569'}`,
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                    {errors.name}
                  </span>
                )}
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#cbd5e1'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#334155',
                    border: `2px solid ${errors.email ? '#ef4444' : '#475569'}`,
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Company and Phone Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#cbd5e1'
                }}>
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#334155',
                    border: '2px solid #475569',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#cbd5e1'
                }}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#334155',
                    border: '2px solid #475569',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="+49 123 456 7890"
                />
              </div>
            </div>

            {/* Project Type and Budget Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#cbd5e1'
                }}>
                  Project Type
                </label>
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#334155',
                    border: '2px solid #475569',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select project type</option>
                  {projectTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#cbd5e1'
                }}>
                  Budget Range
                </label>
                <select
                  name="budget_range"
                  value={formData.budget_range}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#334155',
                    border: '2px solid #475569',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map(budget => (
                    <option key={budget.value} value={budget.value}>
                      {budget.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Timeline and Referral Source Row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#cbd5e1'
                }}>
                  Timeline
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#334155',
                    border: '2px solid #475569',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select timeline</option>
                  {timelines.map(timeline => (
                    <option key={timeline.value} value={timeline.value}>
                      {timeline.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#cbd5e1'
                }}>
                  How did you find me?
                </label>
                <select
                  name="referral_source"
                  value={formData.referral_source}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    background: '#334155',
                    border: '2px solid #475569',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Select source</option>
                  {referralSources.map(source => (
                    <option key={source.value} value={source.value}>
                      {source.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                color: '#cbd5e1'
              }}>
                Project Details *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="6"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: '#334155',
                  border: `2px solid ${errors.message ? '#ef4444' : '#475569'}`,
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1rem',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
                placeholder="Tell me about your project. What are your goals, requirements, and any specific challenges you're facing?"
              />
              {errors.message && (
                <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                  {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: isSubmitting 
                    ? '#475569' 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 3rem',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>

        {/* Alternative Contact Methods */}
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          padding: '2rem',
          background: '#334155',
          borderRadius: '12px'
        }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>
            Prefer to reach out directly?
          </h3>
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
                background: 'transparent',
                color: '#cbd5e1',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                border: '2px solid #475569',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.color = '#667eea';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = '#475569';
                e.target.style.color = '#cbd5e1';
              }}
            >
              📧 contact@schonenberg.dev
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
                border: '2px solid #475569',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.color = '#667eea';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = '#475569';
                e.target.style.color = '#cbd5e1';
              }}
            >
              💼 LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
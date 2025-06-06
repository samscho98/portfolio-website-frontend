import React, { useState, useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';

const ContactPage = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    project_type: '',
    budget_range: '',
    timeline: '',
    message: '',
    referral_source: '',
    // Bot protection fields
    website: '', // Honeypot field
    token: '' // JavaScript token
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [formStartTime, setFormStartTime] = useState(null);

  // Generate token and set form start time on component mount
  useEffect(() => {
    const token = btoa(new Date().toISOString() + Math.random());
    setFormData(prev => ({ ...prev, token }));
    setFormStartTime(Date.now());
  }, []);

  // Form options arrays
  const projectTypes = [
    { value: 'website', label: t('contact.projectTypes.website') },
    { value: 'api', label: t('contact.projectTypes.api') },
    { value: 'database', label: t('contact.projectTypes.database') },
    { value: 'automation', label: t('contact.projectTypes.automation') },
    { value: 'data-processing', label: t('contact.projectTypes.dataProcessing') },
    { value: 'consultation', label: t('contact.projectTypes.consultation') },
    { value: 'other', label: t('contact.projectTypes.other') }
  ];

  const budgetRanges = [
    { value: 'under-200', label: t('contact.budgetRanges.under200') },
    { value: '200-500', label: t('contact.budgetRanges.range200500') },
    { value: '500-1000', label: t('contact.budgetRanges.range5001000') },
    { value: '1000-2500', label: t('contact.budgetRanges.range10002500') },
    { value: 'over-2500', label: t('contact.budgetRanges.over2500') },
    { value: 'flexible', label: t('contact.budgetRanges.flexible') }
  ];

  const timelines = [
    { value: 'asap', label: t('contact.timelines.asap') },
    { value: '1-month', label: t('contact.timelines.oneMonth') },
    { value: '2-3-months', label: t('contact.timelines.twoThreeMonths') },
    { value: '3-6-months', label: t('contact.timelines.threeToSixMonths') },
    { value: 'flexible', label: t('contact.timelines.flexible') }
  ];

  const referralSources = [
    { value: 'google-search', label: t('contact.referralSources.googleSearch') },
    { value: 'linkedin', label: t('contact.referralSources.linkedin') },
    { value: 'referral', label: t('contact.referralSources.referral') },
    { value: 'github', label: t('contact.referralSources.github') },
    { value: 'social-media', label: t('contact.referralSources.socialMedia') },
    { value: 'other', label: t('contact.referralSources.other') }
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
      newErrors.name = t('contact.form.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.emailInvalid');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.messageRequired');
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
      // Calculate form fill time (bot protection)
      const formFillTime = formStartTime ? Date.now() - formStartTime : 0;
      
      // Prepare submission data with bot protection fields
      const submissionData = {
        ...formData,
        form_fill_time: formFillTime,
        user_agent: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        timestamp: new Date().toISOString()
      };
      
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
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
          referral_source: '',
          website: '',
          token: btoa(new Date().toISOString() + Math.random())
        });
        setFormStartTime(Date.now());
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
            {t('contact.title')}
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#cbd5e1', 
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Form */}
        <div style={{
          background: '#1e293b',
          borderRadius: '16px',
          padding: '2rem',
          border: '1px solid #334155'
        }}>
          {/* Success Message */}
          {submitStatus === 'success' && (
            <div style={{
              background: '#22c55e',
              color: 'white',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <strong>{t('contact.submit.success')}</strong>
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div style={{
              background: '#ef4444',
              color: 'white',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <strong>{t('contact.submit.error')}</strong>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* HONEYPOT FIELD - Hidden from users */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              style={{
                display: 'none',
                position: 'absolute',
                left: '-9999px',
                top: '-9999px'
              }}
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Hidden token field */}
            <input
              type="hidden"
              name="token"
              value={formData.token}
            />

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
                  {t('contact.form.name')} *
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
                  placeholder={t('contact.form.namePlaceholder')}
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
                  {t('contact.form.email')} *
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
                  placeholder={t('contact.form.emailPlaceholder')}
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
                  {t('contact.form.company')}
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
                  placeholder={t('contact.form.companyPlaceholder')}
                />
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  color: '#cbd5e1'
                }}>
                  {t('contact.form.phone')}
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
                  placeholder={t('contact.form.phonePlaceholder')}
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
                  {t('contact.form.projectType')}
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
                  <option value="">{t('contact.projectTypes.select')}</option>
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
                  {t('contact.form.budgetRange')}
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
                  <option value="">{t('contact.budgetRanges.select')}</option>
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
                  {t('contact.form.timeline')}
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
                  <option value="">{t('contact.timelines.select')}</option>
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
                  {t('contact.form.referralSource')}
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
                  <option value="">{t('contact.referralSources.select')}</option>
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
                {t('contact.form.message')} *
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
                placeholder={t('contact.form.messagePlaceholder')}
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
                {isSubmitting ? t('contact.submit.sending') : t('contact.submit.send')}
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
            {t('contact.alternative.title')}
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
            >
              {t('contact.alternative.email')}
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
            >
              {t('contact.alternative.linkedin')}
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
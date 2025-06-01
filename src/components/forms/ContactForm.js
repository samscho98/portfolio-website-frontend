// src/components/forms/ContactForm.js - Updated with enhanced fields
import React, { useState, useEffect } from 'react';
import { contactApi, countriesApi } from '../../services/api';

const ContactForm = () => {
  const [countries, setCountries] = useState([]);
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
    address: {
      address_line_1: '',
      address_line_2: '',
      city: '',
      state_province: '',
      postal_code: '',
      country_code: '',
      country_name: ''
    }
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  });

  const [showAddressFields, setShowAddressFields] = useState(false);

  // Load countries on mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesData = await countriesApi.getAll();
        setCountries(countriesData);
      } catch (error) {
        console.error('Failed to load countries:', error);
        // Fallback countries
        setCountries([
          { code: 'US', name: 'United States', postal_code_required: true, state_required: true, state_label: 'State' },
          { code: 'DE', name: 'Germany', postal_code_required: true, state_required: false, state_label: 'State' },
          { code: 'NL', name: 'Netherlands', postal_code_required: true, state_required: false, state_label: 'Province' },
          { code: 'FR', name: 'France', postal_code_required: true, state_required: false, state_label: 'Region' },
          { code: 'GB', name: 'United Kingdom', postal_code_required: true, state_required: false, state_label: 'County' },
        ]);
      }
    };

    loadCountries();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
          // Update country name when country code changes
          ...(addressField === 'country_code' && {
            country_name: countries.find(c => c.code === value)?.name || ''
          })
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please enter your name'
      });
      return false;
    }
    
    if (!formData.email.trim()) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please enter your email'
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please enter a valid email address'
      });
      return false;
    }
    
    if (!formData.message.trim()) {
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please enter a message'
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset status
    setFormStatus({
      isSubmitting: true,
      isSuccess: false,
      isError: false,
      errorMessage: ''
    });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      // Prepare form data, only include address if any address field is filled
      const hasAddressData = Object.values(formData.address).some(value => value.trim() !== '');
      const submitData = {
        ...formData,
        address: hasAddressData ? formData.address : undefined
      };

      // Use the contact API service to send the message
      await contactApi.sendMessage(submitData);
      
      // Clear the form on success
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
        address: {
          address_line_1: '',
          address_line_2: '',
          city: '',
          state_province: '',
          postal_code: '',
          country_code: '',
          country_name: ''
        }
      });
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errorMessage: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus(prevState => ({
          ...prevState,
          isSuccess: false
        }));
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // For development: simulate success if the API isn't ready
      if (process.env.NODE_ENV === 'development') {
        // Clear the form on simulated success
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
          address: {
            address_line_1: '',
            address_line_2: '',
            city: '',
            state_province: '',
            postal_code: '',
            country_code: '',
            country_name: ''
          }
        });
        
        setFormStatus({
          isSubmitting: false,
          isSuccess: true,
          isError: false,
          errorMessage: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus(prevState => ({
            ...prevState,
            isSuccess: false
          }));
        }, 5000);
        
        return;
      }
      
      setFormStatus({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: error.message || 'Something went wrong. Please try again later.'
      });
    }
  };

  const projectTypes = [
    'Website Development',
    'Web Application',
    'API Development',
    'AI/Automation Tool',
    'Database Design',
    'Other'
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
    'To be discussed'
  ];

  const timelines = [
    'Less than 1 month',
    '1-2 months',
    '2-3 months',
    '3-6 months',
    '6+ months',
    'Flexible'
  ];

  const referralSources = [
    'Google Search',
    'LinkedIn',
    'GitHub',
    'Referral from colleague',
    'Social Media',
    'Other'
  ];

  const selectedCountry = countries.find(c => c.code === formData.address.country_code);
  
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-8 w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Get in Touch</h2>
      
      {formStatus.isSuccess && (
        <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-200 px-4 py-3 rounded mb-6 flex items-start">
          <svg className="h-5 w-5 mr-2 mt-0.5 text-green-500 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Thank you for your message! I'll get back to you as soon as possible.</span>
        </div>
      )}
      
      {formStatus.isError && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6 flex items-start">
          <svg className="h-5 w-5 mr-2 mt-0.5 text-red-500 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{formStatus.errorMessage}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name*
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email*
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company
            </label>
            <input 
              type="text" 
              id="company" 
              name="company" 
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            />
          </div>
        </div>

        {/* Project Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="project_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Type
            </label>
            <select 
              id="project_type" 
              name="project_type" 
              value={formData.project_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            >
              <option value="">Select project type</option>
              {projectTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="budget_range" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Budget Range
            </label>
            <select 
              id="budget_range" 
              name="budget_range" 
              value={formData.budget_range}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            >
              <option value="">Select budget range</option>
              {budgetRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Timeline
            </label>
            <select 
              id="timeline" 
              name="timeline" 
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            >
              <option value="">Select timeline</option>
              {timelines.map(timeline => (
                <option key={timeline} value={timeline}>{timeline}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="referral_source" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              How did you find me?
            </label>
            <select 
              id="referral_source" 
              name="referral_source" 
              value={formData.referral_source}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            >
              <option value="">Select source</option>
              {referralSources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message*
          </label>
          <textarea 
            id="message" 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            rows="5" 
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
            required
          ></textarea>
        </div>

        {/* Optional Address Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Address (Optional)</h3>
            <button
              type="button"
              onClick={() => setShowAddressFields(!showAddressFields)}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 text-sm font-medium"
            >
              {showAddressFields ? 'Hide Address Fields' : 'Add Address Information'}
            </button>
          </div>

          {showAddressFields && (
            <div className="space-y-4">
              <div>
                <label htmlFor="address.address_line_1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address.address_line_1"
                  name="address.address_line_1"
                  value={formData.address.address_line_1}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="address.address_line_2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address.address_line_2"
                  name="address.address_line_2"
                  value={formData.address.address_line_2}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="address.city"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="address.state_province" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {selectedCountry?.state_label || 'State/Province'}
                  </label>
                  <input
                    type="text"
                    id="address.state_province"
                    name="address.state_province"
                    value={formData.address.state_province}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="address.postal_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="address.postal_code"
                    name="address.postal_code"
                    value={formData.address.postal_code}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address.country_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Country
                </label>
                <select
                  id="address.country_code"
                  name="address.country_code"
                  value={formData.address.country_code}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 transition-colors"
                >
                  <option value="">Select country</option>
                  {countries.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className={`w-full bg-primary-600 dark:bg-primary-700 hover:bg-primary-700 dark:hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-md transition-colors ${
            formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={formStatus.isSubmitting}
        >
          {formStatus.isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
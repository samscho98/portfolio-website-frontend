import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../translations';

const I18nContext = createContext();

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

// Use environment variable with fallback
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://portfolio-api-v936.onrender.com/api';

// Function to detect user's country via IP (with fallback)
const detectUserCountry = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; SchonenbergPortfolio/1.0)'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.country_code;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// Function to detect browser language
const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.toLowerCase().split('-')[0]; // 'en-US' -> 'en'
};

// Function to determine best language based on browser + optional IP
const determineBestLanguage = async (availableLanguages) => {
  const browserLang = detectBrowserLanguage();
  
  // Language priority mapping based on country
  const countryLanguageMap = {
    'PH': 'tl', // Philippines -> Tagalog
    'DE': 'de', // Germany -> German
    'AT': 'de', // Austria -> German
    'CH': 'de', // Switzerland -> German (assuming German-speaking region)
    'BE': 'nl', // Belgium -> Dutch (Flemish)
  };
  
  
  // Get available language codes
  const availableCodes = availableLanguages.map(lang => lang.code);
  
  // Try to detect country (but don't block on it)
  let userCountry = null;
  try {
    userCountry = await Promise.race([
      detectUserCountry(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
    ]);
  } catch (error) {
    // Silent fallback - no console noise
  }
  
  // Priority logic:
  // 1. Check browser language first (most reliable)
  if (availableCodes.includes(browserLang)) {
    // Special case: For Philippines, prefer Tagalog even if browser is English
    if (userCountry === 'PH' && availableCodes.includes('tl')) {
      return 'tl';
    }
    return browserLang;
  }
  
  // 2. If browser language not available, try country-based language
  if (userCountry) {
    const countryPreferredLang = countryLanguageMap[userCountry];
    if (countryPreferredLang && availableCodes.includes(countryPreferredLang)) {
      return countryPreferredLang;
    }
  }
  
  // 3. Fall back to primary language (usually English)
  const primaryLang = availableLanguages.find(lang => lang.is_primary);
  return primaryLang ? primaryLang.code : 'en';
};

export const I18nProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch available languages from API and auto-detect best language
  useEffect(() => {
    const initializeLanguages = async () => {
      try {
        setIsLoading(true);
        
        // Fetch available languages
        const response = await fetch(`${API_BASE_URL}/languages`);
        const languages = await response.json();
        
        setAvailableLanguages(languages);
        
        // Determine best language for user (non-blocking)
        const bestLanguage = await determineBestLanguage(languages);
        setCurrentLanguage(bestLanguage);
        
      } catch (error) {
        console.error('Failed to fetch languages:', error);
        // Fallback to basic setup
        const fallbackLanguages = [
          { code: 'en', name: 'English', native_name: 'English', flag_emoji: '🇺🇸', is_primary: true },
          { code: 'de', name: 'German', native_name: 'Deutsch', flag_emoji: '🇩🇪', is_primary: false },
          { code: 'tl', name: 'Tagalog', native_name: 'Tagalog', flag_emoji: '🇵🇭', is_primary: false }
        ];
        setAvailableLanguages(fallbackLanguages);
        
        // Even with fallback, try to determine best language
        try {
          const bestLanguage = await determineBestLanguage(fallbackLanguages);
          setCurrentLanguage(bestLanguage);
        } catch (langError) {
          console.warn('Language detection failed, using English:', langError);
          setCurrentLanguage('en');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguages();
  }, []);

  const setLanguage = (langCode) => {
    if (availableLanguages.some(lang => lang.code === langCode)) {
      setCurrentLanguage(langCode);
      // Optional: Save to localStorage for persistence
      try {
        localStorage.setItem('preferred-language', langCode);
      } catch (error) {
        console.warn('Could not save language preference:', error);
      }
    }
  };

  // Check for saved language preference on load
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('preferred-language');
      if (savedLanguage && availableLanguages.some(lang => lang.code === savedLanguage)) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.warn('Could not read language preference:', error);
    }
  }, [availableLanguages]);

  // Translation function for static UI text
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  // Helper function to make API calls with current language
  const apiCall = async (endpoint, options = {}) => {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    url.searchParams.append('lang', currentLanguage);
    
    const response = await fetch(url.toString(), options);
    return response.json();
  };

  const value = {
    currentLanguage,
    setLanguage,
    availableLanguages,
    isLoading,
    t, // For static UI translations
    apiCall // For database content with language parameter
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};
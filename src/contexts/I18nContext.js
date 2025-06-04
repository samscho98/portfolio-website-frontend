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

// Function to detect user's country via IP
const detectUserCountry = async () => {
  try {
    const response = await fetch('https://ip-api.com/json/');
    const data = await response.json();
    return data.countryCode; // Returns 'US', 'DE', 'PH', etc.
  } catch (error) {
    return null;
  }
};

// Function to detect browser language
const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  return browserLang.toLowerCase().split('-')[0]; // 'en-US' -> 'en'
};

// Function to determine best language based on IP + browser
const determineBestLanguage = async (availableLanguages) => {
  const browserLang = detectBrowserLanguage();
  const userCountry = await detectUserCountry();
  
  // Language priority mapping based on country
  const countryLanguageMap = {
    'PH': 'tl', // Philippines -> Tagalog (IP priority)
    'DE': 'de', // Germany -> German
    'AT': 'de', // Austria -> German
    'CH': 'de', // Switzerland -> German
  };
  
  // Check if we have a country-specific language preference
  const countryPreferredLang = countryLanguageMap[userCountry];
  
  // Get available language codes
  const availableCodes = availableLanguages.map(lang => lang.code);
  
  // Priority logic:
  // 1. For Philippines: Prefer Tagalog regardless of browser language
  // 2. For Germany/Austria: Check browser first, then country
  // 3. For others: Use browser language if available
  
  if (userCountry === 'PH' && availableCodes.includes('tl')) {
    return 'tl'; // Tagalog for Philippines
  }
  
  if (availableCodes.includes(browserLang)) {
    return browserLang; // Browser language if available
  }
  
  if (countryPreferredLang && availableCodes.includes(countryPreferredLang)) {
    return countryPreferredLang; // Country preference
  }
  
  // Default to primary language (usually English)
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
        
        // Determine best language for user
        const bestLanguage = await determineBestLanguage(languages);
        setCurrentLanguage(bestLanguage);
        
      } catch (error) {
        console.error('Failed to fetch languages:', error);
        // Fallback to basic setup
        setAvailableLanguages([
          { code: 'en', name: 'English', native_name: 'English', flag_emoji: '🇺🇸', is_primary: true },
          { code: 'de', name: 'German', native_name: 'Deutsch', flag_emoji: '🇩🇪', is_primary: false },
          { code: 'tl', name: 'Tagalog', native_name: 'Tagalog', flag_emoji: '🇵🇭', is_primary: false }
        ]);
        setCurrentLanguage('en');
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguages();
  }, []);

  const setLanguage = (langCode) => {
    if (availableLanguages.some(lang => lang.code === langCode)) {
      setCurrentLanguage(langCode);
    }
  };

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
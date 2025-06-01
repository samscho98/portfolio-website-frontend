import React, { createContext, useContext, useState, useEffect } from 'react';
import { languagesApi } from '../services/api';

const LocalizationContext = createContext(undefined);

export function LocalizationProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [staticTranslations, setStaticTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  // Initialize localization on mount
  useEffect(() => {
    const initializeLocalization = async () => {
      try {
        // Detect user's preferred language
        const userLang = navigator.language.split('-')[0];
        
        // Get saved language preference
        const savedLang = localStorage.getItem('language');
        
        // Get available languages
        const languages = await languagesApi.getAll();
        setAvailableLanguages(languages);
        
        // Set initial language (priority: saved > user preference > primary language > 'en')
        let initialLang = 'en';
        if (savedLang && languages.find(l => l.code === savedLang)) {
          initialLang = savedLang;
        } else if (userLang && languages.find(l => l.code === userLang)) {
          initialLang = userLang;
        } else {
          const primaryLang = languages.find(l => l.is_primary);
          if (primaryLang) {
            initialLang = primaryLang.code;
          }
        }
        
        setCurrentLanguage(initialLang);
        localStorage.setItem('language', initialLang);
        
      } catch (error) {
        console.error('Failed to initialize localization:', error);
        // Fallback to English if API fails
        setCurrentLanguage('en');
        setAvailableLanguages([
          { code: 'en', name: 'English', native_name: 'English', is_primary: true, flag_emoji: '🇺🇸' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    initializeLocalization();
  }, []);

  // Function to change language
  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('language', languageCode);
    // Clear cached translations when language changes
    setStaticTranslations({});
  };

  // Function to get translated text
  const t = async (key, fallback = key) => {
    // Return cached translation if available
    const cacheKey = `${key}_${currentLanguage}`;
    if (staticTranslations[cacheKey]) {
      return staticTranslations[cacheKey];
    }

    try {
      const response = await languagesApi.getStaticContent(key, currentLanguage);
      const translatedText = response.text;
      
      // Cache the translation
      setStaticTranslations(prev => ({
        ...prev,
        [cacheKey]: translatedText
      }));
      
      return translatedText;
    } catch (error) {
      console.warn(`Translation not found for key: ${key} in language: ${currentLanguage}`);
      return fallback;
    }
  };

  // Hook for getting translations in components
  const useTranslation = (key, fallback = key) => {
    const [text, setText] = useState(fallback);
    
    useEffect(() => {
      const getTranslation = async () => {
        const translatedText = await t(key, fallback);
        setText(translatedText);
      };
      
      getTranslation();
    }, [key, fallback, currentLanguage]);
    
    return text;
  };

  const value = {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    t,
    useTranslation,
    loading
  };

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
}

// Custom hook to use localization
export function useLocalization() {
  const context = useContext(LocalizationContext);
  
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  
  return context;
}

// Hook for components that need translations
export function useTranslation(key, fallback = key) {
  const { useTranslation } = useLocalization();
  return useTranslation(key, fallback);
}
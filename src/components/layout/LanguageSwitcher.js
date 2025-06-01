import React, { useState } from 'react';
import { useLocalization } from '../../context/LocalizationContext';
import { useTheme } from '../../context/ThemeContext';

const LanguageSwitcher = ({ className = '' }) => {
  const { currentLanguage, availableLanguages, changeLanguage } = useLocalization();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentLangData = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // Style definitions for dark mode compatibility
  const styles = {
    button: {
      backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      color: theme === 'dark' ? '#ffffff' : '#333333',
      border: `1px solid ${theme === 'dark' ? '#444444' : '#e5e7eb'}`,
    },
    dropdown: {
      backgroundColor: theme === 'dark' ? '#262626' : 'white',
      border: `1px solid ${theme === 'dark' ? '#444444' : '#e5e7eb'}`,
      boxShadow: theme === 'dark' 
        ? '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
        : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    item: {
      color: theme === 'dark' ? '#e6e6e6' : '#111827',
    },
    itemHover: {
      backgroundColor: theme === 'dark' ? '#374151' : '#f3f4f6',
    }
  };

  if (availableLanguages.length <= 1) {
    return null; // Don't show switcher if only one language available
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:opacity-80"
        style={styles.button}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-lg">{currentLangData?.flag_emoji || '🌐'}</span>
        <span className="hidden sm:inline">{currentLangData?.native_name || currentLanguage.toUpperCase()}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div 
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-20"
            style={styles.dropdown}
          >
            <div className="py-1" role="menu" aria-orientation="vertical">
              {availableLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center space-x-3 ${
                    language.code === currentLanguage ? 'font-medium' : ''
                  }`}
                  style={{
                    ...styles.item,
                    ...(language.code === currentLanguage ? { opacity: 0.7 } : {})
                  }}
                  onMouseEnter={(e) => {
                    if (language.code !== currentLanguage) {
                      Object.assign(e.target.style, styles.itemHover);
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language.code !== currentLanguage) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                  role="menuitem"
                >
                  <span className="text-lg">{language.flag_emoji}</span>
                  <div className="flex flex-col">
                    <span>{language.native_name}</span>
                    <span className="text-xs opacity-60">{language.name}</span>
                  </div>
                  {language.code === currentLanguage && (
                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
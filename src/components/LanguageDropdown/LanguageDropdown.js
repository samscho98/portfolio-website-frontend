import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import './LanguageDropdown.css';

const LanguageDropdown = () => {
  const { currentLanguage, setLanguage, availableLanguages, isLoading, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  // Don't render anything while loading
  if (isLoading || !availableLanguages.length) {
    return null;
  }

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  // Fallback if currentLang is still not found
  if (!currentLang) {
    return null;
  }

  return (
    <div className="language-dropdown">
      <button 
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('ui.language')}
      >
        {currentLang.flag_emoji || '🌐'} {currentLang.native_name || currentLang.name} ▼
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {availableLanguages.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`dropdown-item ${currentLanguage === lang.code ? 'active' : ''}`}
            >
              {lang.flag_emoji || '🌐'} {lang.native_name || lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
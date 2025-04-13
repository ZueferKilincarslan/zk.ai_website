import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage, setLanguage } = useLanguage();

  const switchLanguage = (lang: 'en' | 'de') => {
    // Get the current path without the language prefix
    const currentPath = location.pathname.replace(/^\/(en|de)/, '') || '/';
    
    // Navigate to the new language path
    navigate(`/${lang}${currentPath}`);
    setLanguage(lang);
    
    // Store the language preference
    localStorage.setItem('preferredLanguage', lang);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLanguage('en')}
        className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-300 ${
          currentLanguage === 'en'
            ? 'bg-purple-500/20 text-purple-400'
            : 'hover:bg-purple-500/10 text-gray-400 hover:text-white'
        }`}
        aria-label="Switch to English"
      >
        🇬🇧 EN
      </button>
      <span className="text-gray-600">|</span>
      <button
        onClick={() => switchLanguage('de')}
        className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-300 ${
          currentLanguage === 'de'
            ? 'bg-purple-500/20 text-purple-400'
            : 'hover:bg-purple-500/10 text-gray-400 hover:text-white'
        }`}
        aria-label="Switch to German"
      >
        🇩🇪 DE
      </button>
    </div>
  );
};
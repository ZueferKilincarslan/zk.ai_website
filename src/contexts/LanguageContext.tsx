import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type Language = 'en' | 'de';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Initialize with path language if available
    const pathLanguage = location.pathname.split('/')[1];
    if (pathLanguage === 'en' || pathLanguage === 'de') {
      return pathLanguage;
    }
    
    // Check stored preference
    const storedLanguage = localStorage.getItem('preferredLanguage') as Language;
    if (storedLanguage) {
      return storedLanguage;
    }

    // Default to browser language
    const browserLanguage = navigator.language.toLowerCase();
    return ['de', 'de-de', 'de-at', 'de-ch'].includes(browserLanguage) ? 'de' : 'en';
  });

  useEffect(() => {
    const handleLanguageRedirect = () => {
      const pathLanguage = location.pathname.split('/')[1];
      
      // If we're at the root path
      if (location.pathname === '/') {
        const targetLanguage = currentLanguage;
        navigate(`/${targetLanguage}${location.search}${location.hash}`, { replace: true });
        return;
      }

      // If the path has a language prefix that doesn't match current language
      if ((pathLanguage === 'en' || pathLanguage === 'de') && pathLanguage !== currentLanguage) {
        setCurrentLanguage(pathLanguage);
        localStorage.setItem('preferredLanguage', pathLanguage);
        return;
      }

      // If the path has no language prefix
      if (pathLanguage !== 'en' && pathLanguage !== 'de') {
        const targetLanguage = currentLanguage;
        const newPath = `/${targetLanguage}${location.pathname}${location.search}${location.hash}`;
        navigate(newPath, { replace: true });
      }
    };

    handleLanguageRedirect();
  }, [location, currentLanguage, navigate]);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    
    // Update the URL to reflect the new language
    const currentPath = location.pathname.replace(/^\/(en|de)/, '');
    const newPath = `/${lang}${currentPath || ''}${location.search}${location.hash}`;
    navigate(newPath, { replace: true });
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
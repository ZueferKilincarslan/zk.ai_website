import React, { useState, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslatedContent } from '../hooks/useTranslatedContent';
import LanguageSwitcher from './LanguageSwitcher';
import CountdownBanner from './CountdownBanner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  const { t } = useTranslatedContent();

  // Track scroll position to handle navbar positioning
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'services', name: t['services'], href: '#services' },
    { id: 'process', name: t['process'], href: '#process' },
    { id: 'why-choose-us', name: t['whyChooseUs'], href: '#comparison' },
    { id: 'pricing', name: t['pricing'], href: '#pricing' },
    { id: 'faq', name: t['faq'], href: `/${currentLanguage}/faq`, isPage: true }
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
      window.scrollTo(0, 0);
      setIsOpen(false);
      return;
    }

    const isOnHomePage = location.pathname === `/${currentLanguage}` || location.pathname === `/${currentLanguage}/`;
    
    if (!isOnHomePage) {
      navigate(`/${currentLanguage}`);
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="fixed w-full z-50 top-0">
      {/* Countdown Banner */}
      <CountdownBanner language={currentLanguage} />
      
      {/* Main Navigation */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md shadow-lg' 
          : 'bg-black/80 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to={`/${currentLanguage}`}
                className="text-2xl font-bold text-purple-400 glow cursor-pointer"
                onClick={() => window.scrollTo(0, 0)}
              >
                ZK.AI
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {/* Primary Navigation Items */}
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* About Us Link */}
              <Link
                to={`/${currentLanguage}/about`}
                className="group flex items-center gap-1.5 px-4 py-2 rounded-lg border border-purple-500/30 
                       text-purple-400 hover:text-white transition-all duration-300
                       hover:border-purple-500/50 hover:bg-purple-500/10
                       hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                onClick={() => window.scrollTo(0, 0)}
              >
                {t['aboutUs']}
                <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-300 
                                   group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {/* Contact Us Button */}
              <Link
                to={`/${currentLanguage}/contact`}
                className="button-secondary"
                onClick={() => window.scrollTo(0, 0)}
              >
                {t['contactUs']}
              </Link>

              {/* Language Switcher */}
              <LanguageSwitcher />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <LanguageSwitcher />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-purple-500/10 transition-all duration-300"
                >
                  {item.name}
                </button>
              ))}
              <Link
                to={`/${currentLanguage}/about`}
                className="flex items-center gap-1.5 w-full px-3 py-2 rounded-lg border border-purple-500/30 
                       text-purple-400 hover:text-white transition-all duration-300
                       hover:border-purple-500/50 hover:bg-purple-500/10"
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                {t['aboutUs']}
                <ExternalLink className="w-4 h-4 opacity-60" />
              </Link>
              <Link
                to={`/${currentLanguage}/contact`}
                className="button-secondary block text-center mx-3"
                onClick={() => {
                  setIsOpen(false);
                  window.scrollTo(0, 0);
                }}
              >
                {t['contactUs']}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
import { useLanguage } from '../contexts/LanguageContext';

export type TranslationKey = keyof typeof translations.en;

const translations = {
  en: {
    // Navigation
    services: 'Services',
    process: 'Process',
    whyChooseUs: 'Why Choose ZK.AI?',
    pricing: 'Pricing',
    faq: 'FAQ',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',

    // Rest of translations...
  },
  de: {
    // Navigation
    services: 'Dienstleistungen',
    process: 'Prozess',
    whyChooseUs: 'Warum ZK.AI?',
    pricing: 'Preise',
    faq: 'FAQ',
    aboutUs: 'Über uns',
    contactUs: 'Kontakt',

    // Rest of translations...
  }
};

export const useTranslations = () => {
  const { currentLanguage } = useLanguage();
  return translations[currentLanguage];
};
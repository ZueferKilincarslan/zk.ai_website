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

    // Common
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    backToHome: 'Back to Home',
    joinWaitlist: 'Join Waitlist',
    requestDemo: 'Request Demo',
    comingSoon: 'Coming Soon',
    submit: 'Submit',
    submitting: 'Submitting...',
    thankYou: 'Thank You!',
    error: 'Error',
    success: 'Success',
    loading: 'Loading...',

    // Form Labels
    fullName: 'Full Name',
    email: 'Email Address',
    message: 'Message',
    inquiry: 'How can we help?',
    required: 'Required',

    // Placeholders
    namePlaceholder: 'Enter your full name',
    emailPlaceholder: 'Enter your email address',
    messagePlaceholder: 'Tell us about your business needs...',

    // Error Messages
    errorRequired: 'This field is required',
    errorInvalidEmail: 'Please enter a valid email address',
    errorSubmission: 'Failed to submit form. Please try again later.',

    // Success Messages
    successSubmission: 'Thank you for your submission! We\'ll be in touch soon.',
    successWaitlist: 'You\'ve been added to our waitlist!'
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

    // Common
    getStarted: 'Jetzt starten',
    learnMore: 'Mehr erfahren',
    backToHome: 'Zurück zur Startseite',
    joinWaitlist: 'Warteliste beitreten',
    requestDemo: 'Demo anfordern',
    comingSoon: 'Demnächst verfügbar',
    submit: 'Absenden',
    submitting: 'Wird gesendet...',
    thankYou: 'Vielen Dank!',
    error: 'Fehler',
    success: 'Erfolg',
    loading: 'Lädt...',

    // Form Labels
    fullName: 'Vollständiger Name',
    email: 'E-Mail-Adresse',
    message: 'Nachricht',
    inquiry: 'Wie können wir helfen?',
    required: 'Erforderlich',

    // Placeholders
    namePlaceholder: 'Geben Sie Ihren vollständigen Namen ein',
    emailPlaceholder: 'Geben Sie Ihre E-Mail-Adresse ein',
    messagePlaceholder: 'Erzählen Sie uns von Ihren geschäftlichen Anforderungen...',

    // Error Messages
    errorRequired: 'Dieses Feld ist erforderlich',
    errorInvalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    errorSubmission: 'Fehler beim Senden des Formulars. Bitte versuchen Sie es später erneut.',

    // Success Messages
    successSubmission: 'Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.',
    successWaitlist: 'Sie wurden zur Warteliste hinzugefügt!'
  },
  tr: {
    // Navigation
    services: 'Hizmetler',
    process: 'Süreç',
    whyChooseUs: 'Neden ZK.AI?',
    pricing: 'Fiyatlandırma',
    faq: 'SSS',
    aboutUs: 'Hakkımızda',
    contactUs: 'İletişim',

    // Common
    getStarted: 'Hemen Başla',
    learnMore: 'Daha Fazla Bilgi',
    backToHome: 'Ana Sayfaya Dön',
    joinWaitlist: 'Bekleme Listesine Katıl',
    requestDemo: 'Demo Talep Et',
    comingSoon: 'Çok Yakında',
    submit: 'Gönder',
    submitting: 'Gönderiliyor...',
    thankYou: 'Teşekkürler!',
    error: 'Hata',
    success: 'Başarılı',
    loading: 'Yükleniyor...',

    // Form Labels
    fullName: 'Ad Soyad',
    email: 'E-posta Adresi',
    message: 'Mesaj',
    inquiry: 'Size nasıl yardımcı olabiliriz?',
    required: 'Zorunlu',

    // Placeholders
    namePlaceholder: 'Adınızı ve soyadınızı girin',
    emailPlaceholder: 'E-posta adresinizi girin',
    messagePlaceholder: 'İş ihtiyaçlarınızdan bahsedin...',

    // Error Messages
    errorRequired: 'Bu alan zorunludur',
    errorInvalidEmail: 'Lütfen geçerli bir e-posta adresi girin',
    errorSubmission: 'Form gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.',

    // Success Messages
    successSubmission: 'Mesajınız için teşekkürler! En kısa sürede size geri döneceğiz.',
    successWaitlist: 'Bekleme listesine eklendi!'
  }
};

export const useTranslations = () => {
  const { currentLanguage } = useLanguage();
  return translations[currentLanguage];
};
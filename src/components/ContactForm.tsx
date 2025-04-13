import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submitToAirtable } from '../services/airtable';
import { useLanguage } from '../contexts/LanguageContext';

interface FormData {
  fullName: string;
  email: string;
  inquiry: string;
}

const ContactForm: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    inquiry: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitToAirtable(formData);
      setIsSubmitted(true);
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : currentLanguage === 'de'
        ? 'Fehler beim Senden des Formulars. Bitte versuchen Sie es später erneut.'
        : 'Failed to submit form. Please try again later.';
      setError(errorMessage);
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const translations = {
    backToHome: currentLanguage === 'de' ? 'Zurück zur Startseite' : 'Back to Home',
    thankYou: currentLanguage === 'de' ? 'Vielen Dank!' : 'Thank You!',
    thankYouMessage: currentLanguage === 'de'
      ? 'Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen.'
      : 'We\'ve received your inquiry and will get back to you within 24 hours.',
    getStarted: currentLanguage === 'de' ? 'Starten Sie mit ZK.AI' : 'Get Started with ZK.AI',
    subtitle: currentLanguage === 'de'
      ? 'Erzählen Sie uns von Ihren geschäftlichen Anforderungen und wir erstellen eine maßgeschneiderte KI-Lösung für Sie.'
      : 'Tell us about your business needs and we\'ll create a custom AI solution for you.',
    fullName: currentLanguage === 'de' ? 'Vollständiger Name' : 'Full Name',
    email: currentLanguage === 'de' ? 'E-Mail-Adresse' : 'Email Address',
    inquiry: currentLanguage === 'de' ? 'Wie können wir helfen?' : 'How can we help?',
    submit: currentLanguage === 'de' ? 'Anfrage senden' : 'Submit Inquiry',
    submitting: currentLanguage === 'de' ? 'Wird gesendet...' : 'Submitting...',
    privacyNotice: currentLanguage === 'de'
      ? 'Mit dem Absenden des Formulars stimmen Sie unserer'
      : 'By submitting this form, you agree to our',
    privacyPolicy: currentLanguage === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy',
    placeholders: {
      fullName: currentLanguage === 'de' ? 'Geben Sie Ihren vollständigen Namen ein' : 'Enter your full name',
      email: currentLanguage === 'de' ? 'Geben Sie Ihre E-Mail-Adresse ein' : 'Enter your email address',
      inquiry: currentLanguage === 'de'
        ? 'Beschreiben Sie Ihre geschäftlichen Anforderungen und wie wir Ihnen helfen können...'
        : 'Tell us about your business needs and how we can help...'
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl p-8 max-w-md w-full text-center space-y-6"
        >
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold">{translations.thankYou}</h2>
          <p className="text-gray-300">
            {translations.thankYouMessage}
          </p>
          <Link
            to={`/${currentLanguage}`}
            className="button-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {translations.backToHome}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link
        to={`/${currentLanguage}`}
        className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {translations.backToHome}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/30 backdrop-blur-lg rounded-xl p-8"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{translations.getStarted}</h1>
            <p className="text-gray-300 text-lg">
              {translations.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                {translations.fullName} *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500"
                placeholder={translations.placeholders.fullName}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                {translations.email} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500"
                placeholder={translations.placeholders.email}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="inquiry" className="block text-sm font-medium text-gray-300 mb-2">
                {translations.inquiry} *
              </label>
              <textarea
                id="inquiry"
                name="inquiry"
                required
                value={formData.inquiry}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500 resize-none"
                placeholder={translations.placeholders.inquiry}
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`button-primary w-full py-4 text-lg font-medium ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? translations.submitting : translations.submit}
            </button>

            <p className="text-sm text-gray-400 text-center mt-4">
              {translations.privacyNotice}{' '}
              <Link to={`/${currentLanguage}/privacy`} className="text-purple-400 hover:text-purple-300">
                {translations.privacyPolicy}
              </Link>
              .
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
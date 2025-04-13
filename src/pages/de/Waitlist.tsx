import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ParticleBackground from '../../components/ParticleBackground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { submitToWaitlist } from '../../services/airtable';
import { useTranslatedContent } from '../../hooks/useTranslatedContent';

// These IDs must match the ones used in airtable.ts serviceNameMap
const services = [
  {
    id: 'cold-email',
    name: 'Cold Email Outreach',
    description: 'Senden Sie zielgerichtete Kalt-E-Mails mit KI-gesteuerter Personalisierung'
  },
  {
    id: 'personalized-email',
    name: 'Personalized Email Outreach',
    description: 'Hyperpersonalisierte E-Mail-Kampagnen mit KI'
  },
  {
    id: 'social-media',
    name: 'Social Media Outreach',
    description: 'KI-gesteuerte Interaktion und Messaging auf sozialen Plattformen'
  },
  {
    id: 'phone-callers',
    name: 'AI Phone Callers',
    description: 'KI führt und verwaltet Geschäftsanrufe für Kundeninteraktionen'
  },
  {
    id: 'instagram',
    name: 'Instagram Automation',
    description: 'KI übernimmt Posting, DM-Antworten, Kommentare und mehr'
  },
  {
    id: 'twitter',
    name: 'Twitter Terminal',
    description: 'KI denkt und postet automatisch Tweets basierend auf Trends'
  },
  {
    id: 'telegram',
    name: 'Telegram Bot',
    description: 'KI-gesteuerte Telegram-Automatisierung für Messaging und Kundenservice'
  }
];

const Waitlist: React.FC = () => {
  const location = useLocation();
  const preSelectedService = new URLSearchParams(location.search).get('service');
  const { t } = useTranslatedContent();
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    services: preSelectedService ? [preSelectedService] : [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitToWaitlist({
        fullName: formData.fullName,
        email: formData.email,
        services: formData.services,
        language: 'de' // Explicitly set German language
      });
      setIsSubmitted(true);
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Beitritt zur Warteliste. Bitte versuchen Sie es später erneut.';
      setError(errorMessage);
      console.error('Waitlist submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen gradient-bg">
        <ParticleBackground />
        <Navbar />
        
        <div className="pt-32 pb-16 px-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl p-8 max-w-md w-full text-center space-y-6"
          >
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold">Vielen Dank!</h2>
            <p className="text-gray-300">
              Sie wurden zur Warteliste hinzugefügt. Wir benachrichtigen Sie, sobald die ausgewählten Dienste verfügbar sind.
            </p>
            <Link
              to="/de"
              className="button-secondary inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Startseite
            </Link>
          </motion.div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Warteliste beitreten - ZK.AI</title>
        <meta name="description" content="Treten Sie der Warteliste für ZK.AI's kommende KI-gesteuerte Automatisierungsdienste bei." />
        <link rel="canonical" href="https://zk-ai.agency/de/waitlist" />
        <link rel="alternate" href="https://zk-ai.agency/en/waitlist" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de/waitlist" hreflang="de" />
      </Helmet>

      <ParticleBackground />
      <Navbar />

      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/de"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Startseite
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl p-8"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Warteliste beitreten</h1>
                <p className="text-gray-300 text-lg">
                  Seien Sie der Erste, der von unseren neuen KI-Diensten erfährt. Wählen Sie die Dienste aus, die Sie interessieren.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
                    Vollständiger Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="Geben Sie Ihren vollständigen Namen ein"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="Geben Sie Ihre E-Mail-Adresse ein"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Dienste auswählen *
                  </label>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer
                          ${formData.services.includes(service.id)
                            ? 'bg-purple-500/20 border-purple-500'
                            : 'bg-black/50 border-purple-500/30 hover:border-purple-500/50'
                          }`}
                        onClick={() => handleServiceToggle(service.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-1 transition-colors
                            ${formData.services.includes(service.id)
                              ? 'bg-purple-500 border-purple-500'
                              : 'border-purple-500/50'
                            }`}
                          >
                            {formData.services.includes(service.id) && (
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-sm text-gray-400">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || formData.services.length === 0}
                  className={`button-primary w-full py-4 text-lg font-medium flex items-center justify-center gap-2
                    ${(isSubmitting || formData.services.length === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Wird übermittelt...
                    </>
                  ) : (
                    'Warteliste beitreten'
                  )}
                </button>

                <p className="text-sm text-gray-400 text-center mt-4">
                  Mit dem Beitritt zur Warteliste stimmen Sie unserer{' '}
                  <Link to="/de/privacy" className="text-purple-400 hover:text-purple-300">
                    Datenschutzerklärung
                  </Link>
                  {' '}zu.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Waitlist;
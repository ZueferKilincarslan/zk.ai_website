import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ParticleBackground from '../../components/ParticleBackground';
import ContactForm from '../../components/ContactForm';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTranslatedContent } from '../../hooks/useTranslatedContent';

const Contact: React.FC = () => {
  const { t } = useTranslatedContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>{t['contactUs']} - ZK.AI</title>
        <meta name="description" content="Kontaktieren Sie ZK.AI für KI-gesteuerte Automatisierungslösungen, die auf Ihre Geschäftsanforderungen zugeschnitten sind." />
        <link rel="canonical" href="https://zk-ai.agency/de/contact" />
        <link rel="alternate" href="https://zk-ai.agency/en/contact" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de/contact" hreflang="de" />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Scale, FileText, Shield, AlertCircle, CreditCard, Book } from 'lucide-react';
import ParticleBackground from '../../components/ParticleBackground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTranslatedContent } from '../../hooks/useTranslatedContent';

const Terms: React.FC = () => {
  const sections = [
    {
      icon: Scale,
      title: 'Leistungsumfang',
      content: `ZK.AI Automation & AI Solutions bietet KI-gesteuerte Automatisierungsdienste, Lead-Generierung, CRM-Integration und Terminvereinbarungslösungen an. Diese Dienste werden auf Abonnement- oder Projektbasis angeboten.`
    },
    {
      icon: CreditCard,
      title: 'Zahlungs- und Abonnementbedingungen',
      content: `• Unsere Dienste werden monatlich abgerechnet und können jederzeit gekündigt werden.
• Die Preisgestaltung richtet sich nach der Komplexität und dem Umfang der benötigten KI-Lösung.`
    },
    {
      icon: FileText,
      title: 'Kündigungsbedingungen',
      content: `Kunden können ihr Abonnement jederzeit kündigen. Die Dienste bleiben bis zum Ende des bezahlten Zeitraums aktiv. Für teilweise genutzte Abrechnungszeiträume werden keine Rückerstattungen gewährt.`
    },
    {
      icon: Shield,
      title: 'Haftungsbeschränkung',
      content: `Wir bemühen uns, hochwertige KI-Lösungen bereitzustellen, garantieren jedoch keine spezifischen Geschäftsergebnisse. Wir haften nicht für direkte oder indirekte Schäden, die aus der Nutzung unserer Dienste entstehen.`
    },
    {
      icon: Book,
      title: 'Geltendes Recht',
      content: `Diese Bedingungen unterliegen dem Recht der Bundesrepublik Deutschland, wo sich unser Geschäftssitz befindet.`
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Nutzungsbedingungen - ZK.AI</title>
        <meta name="description" content="Lesen Sie die Nutzungsbedingungen von ZK.AI und verstehen Sie unsere Servicevereinbarungen." />
        <link rel="canonical" href="https://zk-ai.agency/de/terms" />
        <link rel="alternate" href="https://zk-ai.agency/en/terms" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de/terms" hreflang="de" />
      </Helmet>

      <ParticleBackground />
      <Navbar />

      <div className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">Nutzungsbedingungen</h1>
            <p className="text-xl text-gray-300">
              Zuletzt aktualisiert: Februar 2025
            </p>
          </motion.div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                    <div className="text-gray-300 space-y-4 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 bg-purple-900/20 backdrop-blur-lg rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Kontakt</h2>
            <p className="text-gray-300">
              Für rechtliche Anfragen kontaktieren Sie uns bitte unter{' '}
              <a href="mailto:info@zk-ai.agency" className="text-purple-400 hover:text-purple-300">
                info@zk-ai.agency
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
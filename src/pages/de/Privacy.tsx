import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server } from 'lucide-react';
import ParticleBackground from '../../components/ParticleBackground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTranslatedContent } from '../../hooks/useTranslatedContent';

const Privacy: React.FC = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Einführung',
      content: `ZK.AI Automation & AI Solutions ("wir", "uns" oder "unser") respektiert Ihre Privatsphäre und verpflichtet sich zum Schutz Ihrer personenbezogenen Daten. Diese Datenschutzerklärung erläutert, wie wir Ihre Informationen erfassen, verwenden und schützen, wenn Sie unsere Website besuchen oder unsere Dienste nutzen.`
    },
    {
      icon: Lock,
      title: 'Datenerfassung und -nutzung',
      content: `Wir erfassen und verarbeiten nur personenbezogene Daten, die Sie uns bei der Kontaktaufnahme über unsere Website zur Verfügung stellen (z.B. Name, E-Mail und Anfrage-Details). Wir verwenden derzeit keine Cookies, Tracking-Tools oder externe Analysedienste.`
    },
    {
      icon: Eye,
      title: 'Datenspeicherung und Sicherheit',
      content: `Ihre Daten werden sicher gespeichert und nur für Kommunikation und Dienstleistungserbringung verwendet. Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, es sei denn, dies ist gesetzlich vorgeschrieben.`
    },
    {
      icon: Server,
      title: 'Ihre Rechte',
      content: `Sie haben das Recht, Auskunft, Berichtigung oder Löschung Ihrer personenbezogenen Daten zu verlangen. Um Ihre Rechte auszuüben, kontaktieren Sie uns unter info@zk-ai.agency.`
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Datenschutzerklärung - ZK.AI</title>
        <meta name="description" content="Erfahren Sie, wie ZK.AI Ihre Privatsphäre schützt und mit Ihren Daten umgeht." />
        <link rel="canonical" href="https://zk-ai.agency/de/privacy" />
        <link rel="alternate" href="https://zk-ai.agency/en/privacy" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de/privacy" hreflang="de" />
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
            <h1 className="text-5xl font-bold mb-6">Datenschutzerklärung</h1>
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
              Für datenschutzbezogene Anfragen kontaktieren Sie uns bitte unter{' '}
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

export default Privacy;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Bot, Zap, Users, Globe, Target, Award } from 'lucide-react';
import ParticleBackground from '../../components/ParticleBackground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CTAButton from '../../components/CTAButton';
import { useTranslatedContent } from '../../hooks/useTranslatedContent';

const About: React.FC = () => {
  const { t } = useTranslatedContent();

  const teamValues = [
    {
      icon: Bot,
      title: 'KI-Exzellenz',
      description: 'Wir erweitern die Grenzen der KI-Technologie, um innovative Lösungen zu liefern.'
    },
    {
      icon: Users,
      title: 'Kunden zuerst',
      description: 'Ihr Erfolg ist unser Erfolg. Wir setzen uns für außergewöhnliche Ergebnisse ein.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Wir entwickeln uns ständig weiter, um technologisch führend zu bleiben.'
    },
    {
      icon: Award,
      title: 'Qualität',
      description: 'Wir halten die höchsten Standards bei jeder Lösung ein.'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Über uns - ZK.AI</title>
        <meta name="description" content="Erfahren Sie mehr über ZK.AI's Mission, Unternehmen durch intelligente Automatisierung und KI-Lösungen zu transformieren." />
        <link rel="canonical" href="https://zk-ai.agency/de/about" />
        <link rel="alternate" href="https://zk-ai.agency/en/about" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de/about" hreflang="de" />
      </Helmet>

      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Unternehmen transformieren durch <span className="text-purple-400">KI-Innovation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bei ZK.AI setzen wir uns leidenschaftlich dafür ein, Unternehmen dabei zu helfen, die Kraft der künstlichen Intelligenz zu nutzen, um beispielloses Wachstum und Effizienz zu erreichen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">Unsere Mission</h2>
              <p className="text-xl text-gray-300">
                Unsere Mission ist es, KI-Technologie zu demokratisieren und leistungsstarke Automatisierungslösungen für Unternehmen jeder Größe zugänglich zu machen. Unser Ziel ist es, Unternehmen dabei zu helfen, Betriebskosten zu senken, die Effizienz zu steigern und durch intelligente Automatisierung außergewöhnliche Kundenerlebnisse zu bieten.
              </p>
              <div className="flex gap-4">
                <CTAButton text="Jetzt starten" type="primary" />
                <CTAButton text="Mehr erfahren" type="secondary" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-96 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80"
                  alt="KI-Technologie"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Unsere Werte</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Unsere Kernwerte leiten alles, was wir tun, von der Produktentwicklung bis zum Kundenservice.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-6 hover:bg-black/40 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">Unsere Vision</h2>
              <p className="text-xl text-gray-300">
                Wir sehen eine Zukunft vor uns, in der Unternehmen jeder Größe fortschrittliche KI-Technologie nutzen können, um ihre Abläufe zu transformieren und bemerkenswerte Ergebnisse zu erzielen. Mit unserem Wachstum bleiben wir Innovation, Qualität und Kundenerfolg verpflichtet.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">KI</div>
                  <div className="text-gray-300">Innovation</div>
                </div>
                <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-gray-300">Support</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Globe className="w-full h-96 text-purple-400 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
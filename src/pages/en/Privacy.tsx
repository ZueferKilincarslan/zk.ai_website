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
      title: 'Introduction',
      content: `ZK.AI Automation & AI Solutions ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or use our services.`
    },
    {
      icon: Lock,
      title: 'Data Collection and Usage',
      content: `We only collect and process personal data that you provide to us when contacting us via our website (e.g., name, email, and inquiry details). We do not use cookies, tracking tools, or external analytics services at this time.`
    },
    {
      icon: Eye,
      title: 'Data Storage and Security',
      content: `Your data is securely stored and only used for communication and service provision. We do not share your personal information with third parties unless legally required.`
    },
    {
      icon: Server,
      title: 'Your Rights',
      content: `You have the right to request access, correction, or deletion of your personal data. To exercise your rights, contact us at info@zk-ai.agency.`
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Privacy Policy - ZK.AI</title>
        <meta name="description" content="Learn about how ZK.AI protects your privacy and handles your data." />
        <link rel="canonical" href="https://zk-ai.agency/en/privacy" />
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
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-300">
              Last updated: February 2025
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
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300">
              For any privacy-related inquiries, please contact us at{' '}
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
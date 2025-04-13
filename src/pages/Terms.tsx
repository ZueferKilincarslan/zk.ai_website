import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Scale, FileText, Shield, AlertCircle, CreditCard, Book } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms: React.FC = () => {
  const sections = [
    {
      icon: Scale,
      title: 'Scope of Service',
      content: `ZK.AI Automation & AI Solutions provides AI-driven automation services, lead generation, CRM integration, and appointment setting solutions. These services are offered on a subscription or project basis.`
    },
    {
      icon: CreditCard,
      title: 'Payment and Subscription Terms',
      content: `• Our services are billed monthly and can be canceled at any time.
• Pricing depends on the complexity and scale of the AI solution required.`
    },
    {
      icon: FileText,
      title: 'Cancellation Policy',
      content: `Clients can cancel their subscription at any time. Services will remain active until the end of the paid period. No refunds are provided for partially used billing cycles.`
    },
    {
      icon: Shield,
      title: 'Limitation of Liability',
      content: `We strive to provide high-quality AI solutions but do not guarantee specific business outcomes. We are not liable for any direct or indirect damages resulting from the use of our services.`
    },
    {
      icon: Book,
      title: 'Governing Law',
      content: `These terms are governed by the laws of Germany, where our operations are based.`
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Terms of Service - ZK.AI</title>
        <meta name="description" content="Read ZK.AI's terms of service and understand our service agreements." />
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
            <h1 className="text-5xl font-bold mb-6">Terms of Service</h1>
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
              For any legal inquiries, please contact us at{' '}
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
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Building, Mail, MapPin } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Impressum: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Impressum - ZK.AI</title>
        <meta name="description" content="Legal information and contact details for ZK.AI." />
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
            <h1 className="text-5xl font-bold mb-6">Impressum</h1>
            <p className="text-xl text-gray-300">
              Legal Notice according to § 5 TMG
            </p>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-lg rounded-xl p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Company Information</h2>
                  <div className="text-gray-300 space-y-2">
                    <p>ZK.AI Automation & AI Solutions</p>
                    <p>Owner: Hüseyin Züfer Kilincarslan</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-lg rounded-xl p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Business Address</h2>
                  <div className="text-gray-300 space-y-2">
                    <p>Not publicly listed</p>
                    <p>Germany</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-black/30 backdrop-blur-lg rounded-xl p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <div className="text-gray-300 space-y-2">
                    <p>Email: info@zk-ai.agency</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Impressum;
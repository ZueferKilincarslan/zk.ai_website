import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const Demo2: React.FC = () => {
  const features = [
    'Advanced Analytics Dashboard',
    'Real-time Data Synchronization',
    'Custom Report Generation',
    'Team Collaboration Tools',
    'Automated Workflow Builder',
    'Enterprise-grade Security'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-purple-50">
      <Helmet>
        <title>DataFlow - Enterprise Analytics Platform</title>
      </Helmet>

      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 text-transparent bg-clip-text">
              DataFlow
            </h1>
            <button className="bg-gradient-to-r from-emerald-600 to-purple-600 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-purple-600 text-transparent bg-clip-text">
              Transform Your Data Into Insights
            </h2>
            <p className="text-xl text-gray-600">
              Powerful analytics platform that helps enterprises make data-driven decisions with confidence.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-gradient-to-r from-emerald-600 to-purple-600 text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h3>
            <p className="text-xl text-gray-600">
              Comprehensive suite of tools for modern enterprises
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-purple-50 p-6 rounded-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">{feature}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-emerald-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">Ready to Get Started?</h3>
          <p className="text-xl mb-8">Join thousands of companies already using DataFlow</p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-full hover:bg-opacity-90 transition-opacity">
            Start Free Trial
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2025 DataFlow Analytics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Demo2;
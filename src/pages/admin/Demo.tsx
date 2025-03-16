import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Demo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Demo - ZK.AI Admin</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20"
        >
          <h1 className="text-3xl font-bold mb-4">Demo Environment</h1>
          <p className="text-gray-400">
            This is your demo environment. The custom Tixae bot is active on this page.
          </p>
        </motion.div>
      </div>

      {/* Background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Tixae bot container is managed by TixaeContext */}
    </div>
  );
};

export default Demo;
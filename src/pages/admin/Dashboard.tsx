import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { LogOut, Users, MessageSquare, Calendar, Store, Layout } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getMonthlyUsers } from '../../services/supabase';
import AnalyticsChart from '../../components/AnalyticsChart';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getMonthlyUsers();
        setAnalyticsData(data);
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234' },
    { icon: MessageSquare, label: 'Active Chats', value: '56' },
    { icon: Calendar, label: 'Appointments', value: '23' },
  ];

  const demos = [
    {
      id: 1,
      title: 'E-Commerce Demo',
      description: 'Modern e-commerce site with integrated chatbot',
      icon: Store,
      path: '/admin/demo/1'
    },
    {
      id: 2,
      title: 'Landing Page Demo',
      description: 'Standalone landing page with chatbot integration',
      icon: Layout,
      path: '/admin/demo/2'
    }
  ];

  const openDemoInNewTab = (path: string) => {
    window.open(path, '_blank');
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Admin Dashboard - ZK.AI</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg
              hover:bg-red-500/20 transition-colors duration-300"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          {loading ? (
            <div className="w-full h-[400px] bg-black/30 backdrop-blur-lg rounded-xl p-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : error ? (
            <div className="w-full bg-black/30 backdrop-blur-lg rounded-xl p-6 text-center text-red-400">
              {error}
            </div>
          ) : (
            <AnalyticsChart data={analyticsData} />
          )}
        </motion.div>

        <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-6">Demo Sites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-black/40 rounded-xl p-6 hover:bg-black/50 transition-all duration-300 cursor-pointer"
                onClick={() => openDemoInNewTab(demo.path)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <demo.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-gray-400 mt-1">{demo.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Dashboard;
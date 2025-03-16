import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { LogOut, Users, MessageSquare, Calendar, PlayCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

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

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/demo')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg
                hover:bg-purple-500/20 transition-colors duration-300"
            >
              <PlayCircle className="w-5 h-5" />
              Demo
            </button>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg
                hover:bg-red-500/20 transition-colors duration-300"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
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

        <div className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <p className="text-gray-400">No recent activity to display.</p>
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
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { signOut, lastLoginTime } = useAuth();
  const navigate = useNavigate();
  const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

  useEffect(() => {
    // Set up interval to check session expiry
    const checkSession = () => {
      if (lastLoginTime && (Date.now() - lastLoginTime > SESSION_TIMEOUT)) {
        handleSignOut();
      }
    };

    const interval = setInterval(checkSession, 1000); // Check every second

    return () => clearInterval(interval);
  }, [lastLoginTime]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Calculate remaining session time
  const remainingTime = lastLoginTime ? Math.max(0, SESSION_TIMEOUT - (Date.now() - lastLoginTime)) : 0;
  const remainingMinutes = Math.floor(remainingTime / 60000);
  const remainingSeconds = Math.floor((remainingTime % 60000) / 1000);

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Admin Dashboard - ZK.AI</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-gray-400">
              Session expires in: {remainingMinutes}m {remainingSeconds}s
            </p>
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

        {/* Add your dashboard content here */}
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
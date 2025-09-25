import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { LogOut, Users, MessageSquare, Calendar, Store, LayoutGrid as Layout, Plus, Trash2, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';

interface Countdown {
  id: string;
  title: string;
  target_date: string;
  is_active: boolean;
}

interface Contact {
  id: string;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { signOut, lastLoginTime } = useAuth();
  const navigate = useNavigate();
  const [countdowns, setCountdowns] = useState<Countdown[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [newCountdown, setNewCountdown] = useState({
    title: '',
    target_date: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Update current time every second for live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchCountdowns();
    fetchContacts();

    const subscription = supabase
      .channel('countdowns_admin')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'countdowns' 
      }, (payload) => {
        console.log('New countdown created:', payload.new);
        setCountdowns(prev => [...prev, payload.new as Countdown]);
      })
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'countdowns' 
      }, (payload) => {
        console.log('Countdown updated:', payload.new);
        setCountdowns(prev => prev.map(countdown => 
          countdown.id === payload.new.id ? payload.new as Countdown : countdown
        ));
      })
      .on('postgres_changes', { 
        event: 'DELETE', 
        schema: 'public', 
        table: 'countdowns' 
      }, (payload) => {
        console.log('Countdown deleted:', payload.old);
        setCountdowns(prev => prev.filter(countdown => countdown.id !== payload.old.id));
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Check session expiry based on current time
    const checkSession = () => {
      if (lastLoginTime && (currentTime - lastLoginTime > SESSION_TIMEOUT)) {
        handleSignOut();
      }
    };

    checkSession();
  }, [currentTime, lastLoginTime]);

  const fetchCountdowns = async () => {
    const { data, error } = await supabase
      .from('countdowns')
      .select('*')
      .order('target_date', { ascending: true });

    if (error) {
      console.error('Error fetching countdowns:', error);
      return;
    }

    setCountdowns(data || []);
  };

  const fetchContacts = async () => {
    setContactsLoading(true);
    try {
      const contactsData = await getContacts();
      setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setContactsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const createCountdown = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newCountdown.title || !newCountdown.target_date) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const newCountdownData = {
        title: newCountdown.title,
        target_date: new Date(newCountdown.target_date).toISOString(),
        is_active: true
      };

      const { data, error } = await supabase
        .from('countdowns')
        .insert([newCountdownData])
        .select()
        .single();

      if (error) {
        setError(error.message);
        return;
      }

      // Immediately update the local state with the new countdown
      if (data) {
        setCountdowns(prev => [...prev, data as Countdown]);
      }

      // Clear the form
      setNewCountdown({ title: '', target_date: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to create countdown');
    }
  };

  const toggleCountdown = async (id: string, currentState: boolean) => {
    try {
      const { data, error } = await supabase
        .from('countdowns')
        .update({ is_active: !currentState })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error toggling countdown:', error);
        return;
      }

      // Immediately update the local state
      if (data) {
        setCountdowns(prev => prev.map(countdown => 
          countdown.id === id ? data as Countdown : countdown
        ));
      }
    } catch (err) {
      console.error('Error toggling countdown:', err);
    }
  };

  const deleteCountdown = async (id: string) => {
    try {
      const { error } = await supabase
        .from('countdowns')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting countdown:', error);
        return;
      }

      // Immediately update the local state
      setCountdowns(prev => prev.filter(countdown => countdown.id !== id));
    } catch (err) {
      console.error('Error deleting countdown:', err);
    }
  };

  const stats = [
    { icon: Users, label: 'Total Contacts', value: contacts.length.toString() },
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

  // Calculate remaining session time using current time
  const remainingTime = lastLoginTime ? Math.max(0, SESSION_TIMEOUT - (currentTime - lastLoginTime)) : 0;
  const remainingMinutes = Math.floor(remainingTime / 60000);
  const remainingSeconds = Math.floor((remainingTime % 60000) / 1000);

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

        {/* Countdowns Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-purple-400" />
            Manage Countdowns
          </h2>

          <form onSubmit={createCountdown} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Countdown Title"
                value={newCountdown.title}
                onChange={(e) => setNewCountdown(prev => ({ ...prev, title: e.target.value }))}
                className="px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
              <input
                type="datetime-local"
                value={newCountdown.target_date}
                onChange={(e) => setNewCountdown(prev => ({ ...prev, target_date: e.target.value }))}
                className="px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Countdown
              </button>
            </div>
            {error && (
              <p className="text-red-400 mt-2">{error}</p>
            )}
          </form>

          <div className="space-y-4">
            {countdowns.map((countdown) => (
              <motion.div
                key={countdown.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center justify-between p-4 bg-black/20 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{countdown.title}</h3>
                  <p className="text-sm text-gray-400">
                    {new Date(countdown.target_date).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleCountdown(countdown.id, countdown.is_active)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      countdown.is_active
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {countdown.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => deleteCountdown(countdown.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
            {countdowns.length === 0 && (
              <p className="text-center text-gray-400">No countdowns yet</p>
            )}
          </div>
        </motion.div>

        {/* Contacts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-400" />
            Recent Contacts
          </h2>

          {contactsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {contacts.slice(0, 10).map((contact) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col p-4 bg-black/20 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{contact.full_name}</h3>
                    <span className="text-sm text-gray-400">
                      {new Date(contact.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{contact.email}</p>
                  <p className="text-sm text-gray-300">{contact.message}</p>
                </motion.div>
              ))}
              {contacts.length === 0 && (
                <p className="text-center text-gray-400">No contacts yet</p>
              )}
            </div>
          )}
        </motion.div>
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
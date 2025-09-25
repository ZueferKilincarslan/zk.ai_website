import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Mail, User, Calendar, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getContacts } from '../../services/contacts';
import { supabase } from '../../services/supabase';

interface Contact {
  id: string;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
}

const Kontaktformular: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('contacts_admin')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'contacts' 
      }, (payload) => {
        console.log('New contact received:', payload.new);
        setContacts(prev => [payload.new as Contact, ...prev]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const contactsData = await getContacts();
      setContacts(contactsData);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Kontakt löschen möchten?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting contact:', error);
        return;
      }

      setContacts(prev => prev.filter(contact => contact.id !== id));
      if (selectedContact?.id === id) {
        setSelectedContact(null);
      }
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Kontaktformular - Admin Dashboard</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Zurück zum Dashboard
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Kontaktformular</h1>
              <p className="text-gray-400">Verwalten Sie alle eingegangenen Kontaktanfragen</p>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-lg rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{contacts.length}</div>
                <div className="text-sm text-gray-400">Gesamt Anfragen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {contacts.filter(c => new Date(c.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-sm text-gray-400">Diese Woche</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {contacts.filter(c => new Date(c.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
                </div>
                <div className="text-sm text-gray-400">Heute</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl border border-purple-500/20"
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Noch keine Kontaktanfragen erhalten</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left py-4 px-6 font-semibold">ID</th>
                    <th className="text-left py-4 px-6 font-semibold">Name</th>
                    <th className="text-left py-4 px-6 font-semibold">E-Mail</th>
                    <th className="text-left py-4 px-6 font-semibold">Nachricht</th>
                    <th className="text-left py-4 px-6 font-semibold">Erstellt am</th>
                    <th className="text-left py-4 px-6 font-semibold">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => (
                    <motion.tr
                      key={contact.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-400 font-mono">
                          {contact.id.slice(0, 8)}...
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-purple-400" />
                          <span className="font-medium">{contact.full_name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-blue-400" />
                          <a 
                            href={`mailto:${contact.email}`}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            {contact.email}
                          </a>
                        </div>
                      </td>
                      <td className="py-4 px-6 max-w-xs">
                        <div className="truncate text-gray-300">
                          {contact.message.length > 50 
                            ? `${contact.message.substring(0, 50)}...` 
                            : contact.message
                          }
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-gray-300">
                            {formatDate(contact.created_at)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedContact(contact)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all"
                            title="Details anzeigen"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteContact(contact.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Löschen"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Contact Detail Modal */}
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-black/80 backdrop-blur-lg rounded-xl p-8 max-w-2xl w-full border border-purple-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Kontakt Details</h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                  <p className="text-lg">{selectedContact.full_name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">E-Mail</label>
                  <a 
                    href={`mailto:${selectedContact.email}`}
                    className="text-lg text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {selectedContact.email}
                  </a>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Nachricht</label>
                  <div className="bg-black/30 rounded-lg p-4 max-h-48 overflow-y-auto">
                    <p className="text-gray-300 whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Erstellt am</label>
                  <p className="text-lg">{formatDate(selectedContact.created_at)}</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: Ihre Anfrage&body=Hallo ${selectedContact.full_name},%0D%0A%0D%0AVielen Dank für Ihre Anfrage...`}
                    className="button-primary flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Antworten
                  </a>
                  <button
                    onClick={() => deleteContact(selectedContact.id)}
                    className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Löschen
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Background gradients */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Kontaktformular;
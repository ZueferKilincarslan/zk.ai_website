import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Calendar, Database, ShoppingCart, FileVideo, 
  Webhook, Palette, BarChart, Bot, Mic, Users, Mail, Phone,
  FileText, Image, Map, Link2, Layout, PieChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../../components/ParticleBackground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CTAButton from '../../components/CTAButton';

const features = [
  {
    id: 'support',
    icon: MessageSquare,
    title: 'Customer Support & Communication',
    description: 'Comprehensive communication solutions for your business',
    items: [
      'FAQ handling & free-text responses',
      'Voice chat with speech recognition & synthesis',
      'Escalation to live agents when needed',
      'Multi-channel support: Website, WhatsApp, Telegram, Instagram'
    ],
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'calendar',
    icon: Calendar,
    title: 'Appointment Scheduling & Calls',
    description: 'Seamless calendar and communication integration',
    items: [
      'Calendar-integrated appointment booking',
      'Live voice/video call scheduling'
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'crm',
    icon: Database,
    title: 'CRM & Data Collection',
    description: 'Efficient lead capture and data management',
    items: [
      'Lead capture (name, email, address, custom fields)',
      'Chat-based forms (e.g., embedded Google Forms)',
      'File upload support (contracts, images, PDFs)'
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    title: 'E-Commerce & Recommendations',
    description: 'Intelligent e-commerce features',
    items: [
      'Order tracking',
      'Order cancellations',
      'Personalized product recommendations',
      'Dynamic product carousels in chat'
    ],
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'media',
    icon: FileVideo,
    title: 'Media Integration',
    description: 'Comprehensive media support',
    items: [
      'Video player via iFrame (YouTube, Vimeo)',
      'Rich Media: image galleries, PDF viewer, interactive maps'
    ],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'integrations',
    icon: Webhook,
    title: 'Integrations & Databases',
    description: 'Flexible connections to external systems',
    items: [
      'External API connections (shipping, payments, CRM)',
      'Database support (Supabase, MySQL, Firestore)',
      'Webhook triggers'
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'design',
    icon: Palette,
    title: 'Design & Deployment',
    description: 'Customizable implementation options',
    items: [
      'Custom chat UI matching brand design',
      'Embedding options: Website, Mobile Apps, Messaging Apps'
    ],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80'
  },
  {
    id: 'analytics',
    icon: BarChart,
    title: 'Analytics & Reporting',
    description: 'Comprehensive insights and analysis',
    items: [
      'Live chat logs for review',
      'Usage metrics: chat volume, response times, conversion rates',
      'Top queries and drop-off rates'
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80'
  }
];

const ZKAgent: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>ZK Agent - Advanced AI Automation | ZK.AI</title>
        <meta name="description" content="Discover ZK Agent - our advanced AI solution for comprehensive business automation, customer support, and more." />
        <link rel="canonical" href="https://zk-ai.agency/en/zkagent" />
      </Helmet>

      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-purple-400">ZK Agent</span> - Your Next-Generation AI Assistant
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              An advanced AI solution that revolutionizes customer service, sales, and business processes
            </p>
            <div className="flex justify-center gap-4 pt-8">
              <CTAButton text="Request Demo" type="primary" />
              <CTAButton text="Explore Features" type="secondary" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6 order-2 lg:order-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <h2 className="text-2xl font-bold">{feature.title}</h2>
                    </div>
                    <p className="text-xl text-gray-300">{feature.description}</p>
                    <ul className="space-y-4">
                      {feature.items.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIndex * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-purple-400" />
                          </div>
                          <span className="text-gray-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative order-1 lg:order-2">
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready for the Future of Business Automation?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Contact us today for a personalized demo of ZK Agent
          </p>
          <CTAButton text="Request Demo" type="primary" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ZKAgent;
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, DollarSign, Calendar, Users, CheckCircle2, MessageSquare, Users2, CalendarClock, Bot, Clock3, Settings2, Scale, ChevronDown, ChevronUp, Code, Sparkles, Palette, Mail, MessageCircle, Phone, Instagram, Twitter, MessageSquareMore, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import Header from '../components/Header';
import ProcessSteps from '../components/ProcessSteps';
import PricingSection from '../components/PricingSection';
import ComparisonTable from '../components/ComparisonTable';
import Footer from '../components/Footer';
import CTAButton from '../components/CTAButton';

const painPoints = [
  { icon: Clock, text: 'Customers wait too long for replies' },
  { icon: DollarSign, text: 'Missed leads mean lost revenue' },
  { icon: Calendar, text: 'Manual appointment setting wastes time' },
  { icon: Users, text: 'Support teams are overworked' },
];

const services = [
  {
    icon: MessageSquare,
    title: 'AI Chatbots for Business',
    description: 'Automate customer interactions with human-like AI responses.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&q=80'
  },
  {
    icon: Users2,
    title: 'Lead Generation & CRM Integration',
    description: 'Capture and qualify leads, syncing seamlessly with your CRM.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80'
  },
  {
    icon: CalendarClock,
    title: 'Appointment Setting',
    description: 'Schedule calls & meetings instantly without back-and-forth emails.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop&q=80'
  },
  {
    icon: Code,
    title: 'AI-Powered Website Creation',
    description: 'Create stunning, animated websites with both frontend and backend functionality.',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop&q=80',
    featured: true
  }
];

const comingSoonService = {
  id: 'cold-email',
  title: "AI Automated Cold Email Outreach",
  description: "With AI Automated Cold Email Outreach, you can send hundreds of highly targeted cold emails to your selected potential clients—without manual effort. The AI drafts personalized messages and automates the entire sending process, allowing you to scale your outreach efficiently.",
  features: [
    "Smart email sequence automation",
    "Personalized content generation",
    "Response rate optimization",
    "CRM integration for lead tracking"
  ],
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&q=80"
};

const benefits = [
  {
    icon: Bot,
    title: 'AI that feels human',
    description: 'Natural language processing that creates authentic conversations'
  },
  {
    icon: Clock3,
    title: 'Saves 100+ hours per month',
    description: 'Automate repetitive tasks and focus on strategic growth'
  },
  {
    icon: Settings2,
    title: 'Fully customizable & integrated',
    description: 'Seamlessly connects with your existing business systems'
  },
  {
    icon: Scale,
    title: 'Scalable for all sizes',
    description: 'From startups to enterprises, grow at your own pace'
  }
];

const faqs = [
  {
    question: "How does AI improve customer support?",
    answer: "Our AI technology provides instant, 24/7 responses to customer inquiries, handles multiple conversations simultaneously, and learns from each interaction to improve accuracy. This results in faster response times, consistent service quality, and increased customer satisfaction while reducing support costs by up to 60%."
  },
  {
    question: "Can ZK.AI integrate with my CRM?",
    answer: "Yes! ZK.AI seamlessly integrates with major CRM platforms including Salesforce, HubSpot, and Zoho. Our system automatically updates customer records, tracks interactions, and syncs data in real-time."
  },
  {
    question: "What industries do you serve?",
    answer: "We serve a wide range of industries including e-commerce, SaaS, healthcare, finance, real estate, and professional services. Our AI solutions are customizable to meet industry-specific requirements and compliance standards."
  },
  {
    question: "How long does setup take?",
    answer: "Most clients are up and running within 72 hours. Our streamlined implementation process includes initial setup, CRM integration, and AI training with your business data."
  },
  {
    question: "Is the AI chatbot customizable to match our brand?",
    answer: "Absolutely! You can customize the chatbot's appearance, tone, responses, and behavior to align perfectly with your brand identity."
  },
  {
    question: "What kind of ROI can I expect?",
    answer: "Clients typically see ROI within the first month. On average, our solutions reduce support costs by 40-60%, increase lead conversion rates by 35%, and save 100+ hours in manual work monthly."
  }
];

const upcomingServices = [
  {
    id: 'personalized-email',
    icon: MessageSquare,
    title: "AI Automated Personalized Email Outreach",
    description: "Hyper-personalized email campaigns using AI",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 'social-media',
    icon: MessageCircle,
    title: "AI Automated Social Media Outreach",
    description: "AI-powered engagement and messaging on social platforms",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: 'phone-callers',
    icon: Phone,
    title: "AI Phone Callers",
    description: "AI making and managing business calls for customer interactions",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    id: 'instagram',
    icon: Instagram,
    title: "Instagram Automation",
    description: "AI handles posting, replying to DMs, commenting, and more",
    color: "from-pink-500/20 to-purple-500/20"
  },
  {
    id: 'twitter',
    icon: Twitter,
    title: "X (Twitter) Terminal",
    description: "AI autonomously thinks and posts tweets based on trends",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: 'telegram',
    icon: MessageSquareMore,
    title: "Telegram AI Bot",
    description: "AI-driven Telegram automation for messaging and customer support",
    color: "from-cyan-500/20 to-blue-500/20"
  }
];

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>ZK.AI - AI-Powered Business Automation</title>
        <meta name="description" content="Transform your business with AI-powered automation. Boost revenue, reduce response time, and automate customer interactions with our intelligent chatbots." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://zk.ai" />
      </Helmet>

      <ParticleBackground />
      <Header />
      
      {/* Problem Section */}
      <section id="problem" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Your Business is Losing <span className="text-purple-400">Time & Money</span> Without AI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="group flex items-start gap-4 p-8 bg-black/30 backdrop-blur-lg rounded-xl 
                          transition-all duration-300 hover:bg-black/40 hover:scale-105
                          hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] relative
                          before:absolute before:inset-0 before:rounded-xl before:border before:border-transparent
                          before:transition-all before:duration-300 hover:before:border-purple-500/50"
              >
                <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110" />
                <p className="text-xl text-gray-300 transition-colors duration-300 group-hover:text-white group-hover:font-medium">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center max-w-3xl mx-auto bg-purple-900/20 backdrop-blur-lg rounded-xl p-8 mt-16">
            <p className="text-xl text-gray-200">
              With ZK.AI, you can automate customer interactions, qualify leads, and schedule appointments 24/7, while you focus on growth.
            </p>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              AI-Powered <span className="text-purple-400">Automation</span> for Scalable Growth
            </h2>
          </div>

          <div className="space-y-8">
            {/* Top three services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(0, 3).map((service, index) => (
                <div 
                  key={index}
                  className="group relative bg-black/30 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <service.icon className="w-6 h-6 text-purple-400" />
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    </div>
                    <p className="text-gray-300">{service.description}</p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Featured service (Website Creation) */}
            <div className="mt-12">
              {services.slice(3).map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-black/30 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="h-64 lg:h-96 overflow-hidden">
                      <img 
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <service.icon className="w-8 h-8 text-purple-400" />
                          <h3 className="text-2xl lg:text-3xl font-bold">{service.title}</h3>
                        </div>
                        <p className="text-gray-300 text-lg lg:text-xl">{service.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-16">
            <CTAButton text="See How It Works" />
          </div>
        </div>

        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Coming Soon Service */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mt-24 mb-16"
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }}
            className="bg-purple-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Coming Soon
          </motion.div>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-8 h-8 text-purple-400" />
                  <h3 className="text-2xl font-bold">{comingSoonService.title}</h3>
                </div>
                <p className="text-gray-300 text-lg">{comingSoonService.description}</p>
                <ul className="space-y-4">
                  {comingSoonService.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link 
                    to={`/waitlist?service=${comingSoonService.id}`}
                    className="button-secondary inline-flex items-center gap-2"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Join Waitlist
                  </Link>
                </div>
              </motion.div>
            </div>
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={comingSoonService.image}
                alt="AI Cold Email Outreach"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
              <motion.div
                className="absolute inset-0 bg-purple-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Coming Soon Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mt-24 mb-16"
      >
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2
            }}
            className="bg-purple-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Coming Soon
          </motion.div>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 p-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Future AI Services</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Get ready for our next generation of AI-powered automation solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
                <div className="relative bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 group-hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center"
                    >
                      <service.icon className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    <h4 className="text-xl font-bold">{service.title}</h4>
                    <p className="text-gray-300">{service.description}</p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="pt-4"
                    >
                      <Link 
                        to={`/waitlist?service=${service.id}`}
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto transition-colors"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Join Waitlist
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          →
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <ProcessSteps />
      
      {/* Comparison Table */}
      <ComparisonTable />
      
      <PricingSection />

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Why Businesses Trust <span className="text-purple-400">ZK.AI</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group bg-black/30 backdrop-blur-lg rounded-xl p-6 hover:bg-black/40 
                          transition-all duration-300 relative overflow-hidden
                          before:absolute before:inset-0 before:bg-gradient-to-r 
                          before:from-purple-500/0 before:via-purple-500/5 before:to-purple-500/0 
                          before:translate-x-[-200%] hover:before:translate-x-[200%] 
                          before:transition-transform before:duration-1000"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    {index === 1 ? (
                      <motion.div
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <benefit.icon className="w-6 h-6 text-purple-400" />
                      </motion.div>
                    ) : (
                      <benefit.icon className="w-6 h-6 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>
                  <motion.h3 
                    className="text-xl font-bold relative inline-block"
                  >
                    {benefit.title}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-400 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.h3>
                  <p className="text-gray-300 transition-colors duration-300 group-hover:text-white">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <CTAButton text="Book a Free AI Strategy Call" />
          </div>
        </div>

        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Still Have <span className="text-purple-400">Questions?</span>
            </h2>
            <p className="text-xl text-gray-300">
              Find answers to common questions about our AI solutions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-black/40 transition-colors"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-6 pt-0">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
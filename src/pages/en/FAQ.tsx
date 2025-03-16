import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, MessageSquare, Users2, CalendarClock, Code, Bot, Clock3, Settings2, Scale } from 'lucide-react';
import ParticleBackground from '../../components/ParticleBackground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CTAButton from '../../components/CTAButton';
import { useTranslatedContent } from '../../hooks/useTranslatedContent';

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const { t } = useTranslatedContent();

  const categories = [
    {
      title: "General",
      icon: MessageSquare,
      questions: [
        {
          question: "What is ZK.AI?",
          answer: "ZK.AI is a leading provider of AI-powered automation solutions for businesses. We specialize in creating intelligent systems that handle customer interactions, lead generation, appointment setting, and website creation, helping businesses save time and resources while improving their operational efficiency."
        },
        {
          question: "How does AI improve customer support?",
          answer: "Our AI technology provides instant, 24/7 responses to customer inquiries, handles multiple conversations simultaneously, and learns from each interaction to improve accuracy. This results in faster response times, consistent service quality, and increased customer satisfaction while reducing support costs by up to 60%."
        },
        {
          question: "What industries do you serve?",
          answer: "We serve a wide range of industries including e-commerce, SaaS, healthcare, finance, real estate, and professional services. Our AI solutions are customizable to meet industry-specific requirements and compliance standards."
        }
      ]
    },
    {
      title: "Technical",
      icon: Settings2,
      questions: [
        {
          question: "Can ZK.AI integrate with my CRM?",
          answer: "Yes! ZK.AI seamlessly integrates with major CRM platforms including Salesforce, HubSpot, and Zoho. Our system automatically updates customer records, tracks interactions, and syncs data in real-time."
        },
        {
          question: "Is the AI chatbot customizable to match our brand?",
          answer: "Absolutely! You can customize the chatbot's appearance, tone, responses, and behavior to align perfectly with your brand identity."
        },
        {
          question: "How secure is the AI system?",
          answer: "We implement enterprise-grade security measures including end-to-end encryption, secure data storage, and regular security audits. All data is processed in compliance with GDPR and other relevant data protection regulations."
        }
      ]
    },
    {
      title: "Implementation",
      icon: Code,
      questions: [
        {
          question: "How long does setup take?",
          answer: "Most clients are up and running within 72 hours. Our streamlined implementation process includes initial setup, CRM integration, and AI training with your business data."
        },
        {
          question: "Do you provide training and support?",
          answer: "Yes, we provide comprehensive training for your team and ongoing support. Our support team is available 24/7 to help with any questions or issues that arise."
        },
        {
          question: "Can we migrate from our existing system?",
          answer: "Yes, we offer smooth migration paths from existing systems. Our team will work with you to ensure all your data is properly transferred and integrated into the new AI system."
        }
      ]
    },
    {
      title: "Business Impact",
      icon: Scale,
      questions: [
        {
          question: "What kind of ROI can I expect?",
          answer: "Clients typically see ROI within the first month. On average, our solutions reduce support costs by 40-60%, increase lead conversion rates by 35%, and save 100+ hours in manual work monthly."
        },
        {
          question: "How does AI help with lead generation?",
          answer: "Our AI system qualifies leads automatically, engages with them instantly, and nurtures them through personalized interactions. This results in higher quality leads and improved conversion rates."
        },
        {
          question: "What makes ZK.AI different from other solutions?",
          answer: "ZK.AI stands out through our advanced AI technology, comprehensive integration capabilities, and focus on delivering measurable business results. Our solutions are fully customizable and scale with your business needs."
        }
      ]
    }
  ];

  const toggleCategory = (title: string) => {
    setOpenCategory(openCategory === title ? null : title);
  };

  const toggleQuestion = (question: string) => {
    setOpenQuestions(prev => 
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>FAQ - ZK.AI</title>
        <meta name="description" content="Find answers to frequently asked questions about ZK.AI's AI-powered automation solutions." />
        <link rel="canonical" href="https://zk-ai.agency/en/faq" />
        <link rel="alternate" href="https://zk-ai.agency/en/faq" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de/faq" hreflang="de" />
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
            <h1 className="text-5xl font-bold mb-6">
              Frequently Asked <span className="text-purple-400">Questions</span>
            </h1>
            <p className="text-xl text-gray-300">
              Find answers to common questions about our AI solutions
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-12 py-4 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
              />
            </div>
          </motion.div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-black/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-xl font-bold">{category.title}</span>
                  </div>
                  {openCategory === category.title ? (
                    <ChevronUp className="w-5 h-5 text-purple-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-400" />
                  )}
                </button>

                {openCategory === category.title && (
                  <div className="border-t border-purple-500/20">
                    {category.questions.map((faq, faqIndex) => (
                      <motion.div
                        key={faq.question}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: faqIndex * 0.1 }}
                        className="border-b border-purple-500/10 last:border-b-0"
                      >
                        <button
                          onClick={() => toggleQuestion(faq.question)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-black/20 transition-colors"
                        >
                          <span className="text-lg font-medium pr-8">{faq.question}</span>
                          {openQuestions.includes(faq.question) ? (
                            <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
                          )}
                        </button>
                        {openQuestions.includes(faq.question) && (
                          <div className="px-6 pb-6">
                            <p className="text-gray-300">{faq.answer}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center space-y-8"
          >
            <p className="text-xl text-gray-300">
              Still have questions? We're here to help!
            </p>
            <CTAButton text="Contact Us" />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
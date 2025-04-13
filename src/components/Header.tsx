import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import NetworkGlobe from './NetworkGlobe';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullText = currentLanguage === 'de' 
    ? "Verwandeln Sie Gespräche in Conversions mit KI-Automatisierung"
    : "Turn Conversations into Conversions with AI Automation";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const getSubtitle = () => {
    return currentLanguage === 'de'
      ? "Steigern Sie Ihren Umsatz, reduzieren Sie die Reaktionszeit und automatisieren Sie Kundeninteraktionen mit KI-gesteuerten Chatbots."
      : "Boost your revenue, reduce response time, and automate customer interactions with AI-driven chatbots.";
  };

  const getCtaText = () => {
    return currentLanguage === 'de'
      ? "Kostenlose Beratung anfordern"
      : "Get a Free Consultation";
  };

  const getSocialProof = () => {
    return currentLanguage === 'de'
      ? "Kunden sparen bis zu "
      : "Clients save up to ";
  };

  const getSocialProofEnd = () => {
    return currentLanguage === 'de'
      ? " bei Kundenservice-Kosten und steigern Lead-Conversions um das "
      : " on customer support costs and increase lead conversions by ";
  };

  return (
    <>
      <Navbar />
      <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="max-w-5xl mx-auto space-y-16 float-animation mt-8">
          {/* Network Globe */}
          <div className="w-72 h-72 mx-auto">
            <NetworkGlobe />
          </div>
          
          {/* Main Content */}
          <div className="space-y-8">
            {/* Headline with Typewriter Effect */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight min-h-[120px] md:min-h-[144px] text-purple-400 glow">
              {displayText}
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: isTypingComplete ? 0 : 1 }}
                transition={{ duration: 0.5, repeat: isTypingComplete ? 0 : Infinity, repeatType: "reverse" }}
                className="inline-block ml-1 w-[3px] h-[1em] bg-purple-400 align-middle"
              />
            </h1>
            
            {/* Subheadline with Fade In */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isTypingComplete ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            >
              {getSubtitle()}
            </motion.p>
          </div>
          
          {/* CTA Button with Fade In */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <button 
              onClick={() => navigate(`/${currentLanguage}/contact`)}
              className="button-primary flex items-center justify-center gap-2 text-lg"
            >
              {getCtaText()} <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Social Proof with Fade In */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isTypingComplete ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 max-w-3xl mx-auto">
              <p className="text-lg text-gray-300">
                {getSocialProof()}
                <span className="text-purple-400 font-bold">40%</span>
                {getSocialProofEnd()}
                <span className="text-purple-400 font-bold">{currentLanguage === 'de' ? '3-fache' : '3X'}</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      </section>
    </>
  );
};

export default Header;
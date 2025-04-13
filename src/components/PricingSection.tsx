import React from 'react';
import { motion } from 'framer-motion';
import { Building, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import CTAButton from './CTAButton';

const PricingSection: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const pricingFeatures = currentLanguage === 'de' ? [
    {
      icon: Building,
      title: "Enterprise-Lösungen",
      description: "Maßgeschneiderte KI-Automatisierung für große Unternehmen",
      features: [
        "Fortschrittliche KI-Chatbots",
        "Abteilungsübergreifende Automatisierung",
        "Individuelle Integrationen",
        "24/7 Premium-Support"
      ]
    },
    {
      icon: Zap,
      title: "Wachstums-Lösungen",
      description: "Skalierbare Automatisierung für wachsende Unternehmen",
      features: [
        "Intelligente Chatbot-Automatisierung",
        "CRM-Integration",
        "Lead-Qualifizierung",
        "Support während der Geschäftszeiten"
      ]
    },
    {
      icon: Shield,
      title: "Starter-Lösungen",
      description: "Grundlegende Automatisierung für kleine Unternehmen",
      features: [
        "Basis-Chatbot-Funktionen",
        "Standard-Integrationen",
        "E-Mail-Support",
        "Regelmäßige Updates"
      ]
    }
  ] : [
    {
      icon: Building,
      title: "Enterprise Solutions",
      description: "Custom AI automation for large-scale operations",
      features: [
        "Advanced AI chatbots",
        "Multi-department automation",
        "Custom integrations",
        "24/7 priority support"
      ]
    },
    {
      icon: Zap,
      title: "Growth Solutions",
      description: "Scalable automation for growing businesses",
      features: [
        "Smart chatbot automation",
        "CRM integration",
        "Lead qualification",
        "Business hours support"
      ]
    },
    {
      icon: Shield,
      title: "Starter Solutions",
      description: "Essential automation for small businesses",
      features: [
        "Basic chatbot features",
        "Standard integrations",
        "Email support",
        "Regular updates"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {currentLanguage === 'de' ? (
              <>Flexible <span className="text-purple-400">Preise</span> für jedes Unternehmen</>
            ) : (
              <>Flexible <span className="text-purple-400">Pricing</span> for Every Business</>
            )}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {currentLanguage === 'de'
              ? 'Unsere Preise passen sich Ihren Bedürfnissen an. Von Startups bis zu Großunternehmen erstellen wir maßgeschneiderte Lösungen, die mit Ihrem Unternehmen wachsen.'
              : 'Our pricing adapts to your needs. From startups to enterprises, we create custom solutions that scale with your business.'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {pricingFeatures.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-lg rounded-xl p-8 hover:bg-black/40 transition-all duration-300 hover:shadow-glow"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center mb-6">
                  <plan.icon className="w-8 h-8 text-purple-400" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{plan.title}</h3>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <CTAButton 
                  text={currentLanguage === 'de' ? "Individuelles Angebot" : "Get Custom Quote"} 
                  type="secondary" 
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <div className="bg-purple-900/20 backdrop-blur-lg rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">
              {currentLanguage === 'de' ? 'Flexible monatliche Abrechnung' : 'Flexible Monthly Billing'}
            </h3>
            <p className="text-gray-300">
              {currentLanguage === 'de'
                ? 'Unsere Preise werden auf Basis Ihrer spezifischen Anforderungen und Nutzung individuell angepasst. Fortgeschrittenere KI-Lösungen oder größere Systeme haben angepasste Preise, die die Komplexität und den Umfang der Implementierung widerspiegeln.'
                : 'Our pricing is customized based on your specific needs and usage. More advanced AI solutions or larger systems will have adjusted pricing to reflect the complexity and scale of the implementation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black/30 backdrop-blur-lg rounded-xl p-6"
            >
              <h4 className="text-xl font-semibold mb-3">
                {currentLanguage === 'de' ? 'Keine langfristigen Verträge' : 'No Long-Term Contracts'}
              </h4>
              <p className="text-gray-300">
                {currentLanguage === 'de'
                  ? 'Monatliche Abrechnung mit der Flexibilität, Ihren Plan jederzeit zu kündigen oder anzupassen.'
                  : 'Monthly billing with the flexibility to cancel or adjust your plan at any time.'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-black/30 backdrop-blur-lg rounded-xl p-6"
            >
              <h4 className="text-xl font-semibold mb-3">
                {currentLanguage === 'de' ? 'Maßgeschneiderte Lösungen' : 'Custom Solutions'}
              </h4>
              <p className="text-gray-300">
                {currentLanguage === 'de'
                  ? 'Die Preise skalieren mit Ihren Bedürfnissen, Sie zahlen nur für das, was Sie nutzen.'
                  : 'Pricing scales with your needs, ensuring you only pay for what you use.'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default PricingSection;
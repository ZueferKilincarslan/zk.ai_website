import React from 'react';
import { Search, Code, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import ProcessStep from './ProcessStep';
import { useLanguage } from '../contexts/LanguageContext';

const ProcessSteps: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const processSteps = currentLanguage === 'de' ? [
    {
      number: '01',
      title: 'Analysieren',
      description: 'Wir bewerten Ihre Arbeitsabläufe, um KI-Möglichkeiten mit hoher Wirkung zu identifizieren.',
      icon: Search,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80'
    },
    {
      number: '02',
      title: 'Entwickeln & Implementieren',
      description: 'Wir entwickeln maßgeschneiderte KI-Lösungen mit Fokus auf Qualität und Sicherheit.',
      icon: Code,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80'
    },
    {
      number: '03',
      title: 'Warten & Verbessern',
      description: 'Wir bieten kontinuierliche Wartung und Leistungsverbesserungen zur Maximierung Ihrer KI-Investition.',
      icon: BarChart,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80'
    }
  ] : [
    {
      number: '01',
      title: 'Analyze',
      description: 'We assess your workflows to identify high-impact AI opportunities.',
      icon: Search,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80'
    },
    {
      number: '02',
      title: 'Build & Implement',
      description: 'We build tailored AI solutions, prioritizing quality and security at every step.',
      icon: Code,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80'
    },
    {
      number: '03',
      title: 'Maintain & Improve',
      description: 'We deliver ongoing maintenance and performance enhancements to maximize your AI investment.',
      icon: BarChart,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <section id="process" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {currentLanguage === 'de' ? (
              <>Der <span className="text-purple-400">Prozess</span></>
            ) : (
              <>The <span className="text-purple-400">Process</span></>
            )}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {currentLanguage === 'de'
              ? 'Unsere bewährte Methodik gewährleistet eine erfolgreiche KI-Implementierung und messbare Ergebnisse'
              : 'Our proven methodology ensures successful AI implementation and measurable results'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24"
        >
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              image={step.image}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </motion.div>
      </div>

      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default ProcessSteps;
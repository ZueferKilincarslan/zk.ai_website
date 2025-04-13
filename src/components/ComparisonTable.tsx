import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ComparisonTable: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const comparisonData = currentLanguage === 'de' ? [
    {
      feature: '24/7 Automatisierung',
      icon: '✅',
      zkAi: { status: 'yes', text: 'Ja' },
      others: { status: 'no', text: 'Nein' },
      manual: { status: 'no', text: 'Nein' }
    },
    {
      feature: 'KI-gestütztes Lead-Scoring',
      icon: '🔥',
      zkAi: { status: 'yes', text: 'Ja' },
      others: { status: 'limited', text: 'Begrenzt' },
      manual: { status: 'no', text: 'Nein' }
    },
    {
      feature: 'Vollständig anpassbar',
      icon: '🔄',
      zkAi: { status: 'yes', text: 'Ja' },
      others: { status: 'limited', text: 'Teilweise' },
      manual: { status: 'no', text: 'Nein' }
    },
    {
      feature: 'Kosteneffektiv',
      icon: '💰',
      zkAi: { status: 'yes', text: 'Spart Zeit & Geld' },
      others: { status: 'no', text: 'Teure Verträge' },
      manual: { status: 'no', text: 'Hohe Arbeitskosten' }
    },
    {
      feature: 'Monatlich kündbar',
      icon: '📅',
      zkAi: { status: 'yes', text: 'Ja' },
      others: { status: 'no', text: 'Nein (Langzeitverträge)' },
      manual: { status: 'no', text: 'Nein' }
    },
    {
      feature: 'Skalierbar für jedes Unternehmen',
      icon: '🚀',
      zkAi: { status: 'yes', text: 'Ja' },
      others: { status: 'limited', text: 'Begrenzt' },
      manual: { status: 'no', text: 'Nein' }
    }
  ] : [
    {
      feature: '24/7 Automation',
      icon: '✅',
      zkAi: { status: 'yes', text: 'Yes' },
      others: { status: 'no', text: 'No' },
      manual: { status: 'no', text: 'No' }
    },
    {
      feature: 'AI-Powered Lead Scoring',
      icon: '🔥',
      zkAi: { status: 'yes', text: 'Yes' },
      others: { status: 'limited', text: 'Limited' },
      manual: { status: 'no', text: 'No' }
    },
    {
      feature: 'Fully Customizable',
      icon: '🔄',
      zkAi: { status: 'yes', text: 'Yes' },
      others: { status: 'limited', text: 'Partially' },
      manual: { status: 'no', text: 'No' }
    },
    {
      feature: 'Cost-Effective',
      icon: '💰',
      zkAi: { status: 'yes', text: 'Saves time & money' },
      others: { status: 'no', text: 'Expensive contracts' },
      manual: { status: 'no', text: 'High labor costs' }
    },
    {
      feature: 'Monthly Cancelable',
      icon: '📅',
      zkAi: { status: 'yes', text: 'Yes' },
      others: { status: 'no', text: 'No (Long contracts)' },
      manual: { status: 'no', text: 'No' }
    },
    {
      feature: 'Scalable for Any Business',
      icon: '🚀',
      zkAi: { status: 'yes', text: 'Yes' },
      others: { status: 'limited', text: 'Limited' },
      manual: { status: 'no', text: 'No' }
    }
  ];

  const StatusIcon = ({ status }: { status: 'yes' | 'no' | 'limited' }) => {
    const iconSize = "w-7 h-7";
    const baseClasses = `${iconSize} transition-all duration-300 transform group-hover:scale-110`;

    switch (status) {
      case 'yes':
        return <CheckCircle2 className={`${baseClasses} text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]`} />;
      case 'no':
        return <XCircle className={`${baseClasses} text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]`} />;
      case 'limited':
        return <AlertTriangle className={`${baseClasses} text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]`} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="comparison" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {currentLanguage === 'de' ? (
              <>Warum <span className="text-purple-400 glow">ZK.AI</span> wählen?</>
            ) : (
              <>Why Choose <span className="text-purple-400 glow">ZK.AI</span>?</>
            )}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {currentLanguage === 'de'
              ? 'Vergleichen Sie unsere KI-gesteuerten Lösungen mit traditionellen Ansätzen'
              : 'See how our AI-powered solutions compare to traditional approaches'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Glowing background effect */}
          <div className="absolute inset-0 bg-purple-500/5 rounded-xl blur-3xl" />
          
          <div className="relative bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/30">
                    <th className="py-6 px-6 text-left">{currentLanguage === 'de' ? 'Funktion' : 'Feature'}</th>
                    <th className="py-6 px-6 text-center">
                      <span className="text-purple-400 font-bold text-lg">ZK.AI</span>
                    </th>
                    <th className="py-6 px-6 text-center">{currentLanguage === 'de' ? 'Andere Anbieter' : 'Other Providers'}</th>
                    <th className="py-6 px-6 text-center">{currentLanguage === 'de' ? 'Manuelle Lösungen' : 'Manual Solutions'}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <motion.tr
                      key={index}
                      variants={rowVariants}
                      className="group border-b border-purple-500/10 hover:bg-purple-500/10 transition-all duration-300
                               hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] relative"
                    >
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl transform transition-transform duration-300 group-hover:scale-110">
                            {row.icon}
                          </span>
                          <span className="font-medium text-lg group-hover:text-white transition-colors duration-300">
                            {row.feature}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex flex-col items-center gap-2">
                          <StatusIcon status={row.zkAi.status} />
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                            {row.zkAi.text}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex flex-col items-center gap-2">
                          <StatusIcon status={row.others.status} />
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                            {row.others.text}
                          </span>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <div className="flex flex-col items-center gap-2">
                          <StatusIcon status={row.manual.status} />
                          <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                            {row.manual.text}
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {currentLanguage === 'de'
              ? 'Erleben Sie die Zukunft der Geschäftsautomatisierung mit den intelligenten Lösungen von ZK.AI'
              : 'Experience the future of business automation with ZK.AI\'s intelligent solutions'}
          </p>
        </motion.div>
      </div>

      {/* Decorative background gradients */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
    </section>
  );
};

export default ComparisonTable;
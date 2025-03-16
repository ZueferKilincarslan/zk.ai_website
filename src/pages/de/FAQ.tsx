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
      title: "Allgemein",
      icon: MessageSquare,
      questions: [
        {
          question: "Was ist ZK.AI?",
          answer: "ZK.AI ist ein führender Anbieter von KI-gesteuerten Automatisierungslösungen für Unternehmen. Wir sind spezialisiert auf die Entwicklung intelligenter Systeme, die Kundeninteraktionen, Lead-Generierung, Terminvereinbarung und Website-Erstellung automatisieren und Unternehmen dabei helfen, Zeit und Ressourcen zu sparen und ihre betriebliche Effizienz zu verbessern."
        },
        {
          question: "Wie verbessert KI den Kundenservice?",
          answer: "Unsere KI-Technologie bietet sofortige, rund um die Uhr verfügbare Antworten auf Kundenanfragen, bearbeitet mehrere Gespräche gleichzeitig und lernt aus jeder Interaktion, um die Genauigkeit zu verbessern. Dies führt zu schnelleren Reaktionszeiten, konstanter Servicequalität und erhöhter Kundenzufriedenheit bei gleichzeitiger Reduzierung der Support-Kosten um bis zu 60%."
        },
        {
          question: "Welche Branchen bedienen Sie?",
          answer: "Wir bedienen ein breites Spektrum an Branchen, darunter E-Commerce, SaaS, Gesundheitswesen, Finanzen, Immobilien und professionelle Dienstleistungen. Unsere KI-Lösungen sind anpassbar, um branchenspezifische Anforderungen und Compliance-Standards zu erfüllen."
        }
      ]
    },
    {
      title: "Technisch",
      icon: Settings2,
      questions: [
        {
          question: "Kann ZK.AI mit meinem CRM integriert werden?",
          answer: "Ja! ZK.AI lässt sich nahtlos in große CRM-Plattformen wie Salesforce, HubSpot und Zoho integrieren. Unser System aktualisiert automatisch Kundendatensätze, verfolgt Interaktionen und synchronisiert Daten in Echtzeit."
        },
        {
          question: "Ist der KI-Chatbot an unsere Marke anpassbar?",
          answer: "Absolut! Sie können das Erscheinungsbild, den Ton, die Antworten und das Verhalten des Chatbots perfekt an Ihre Markenidentität anpassen."
        },
        {
          question: "Wie sicher ist das KI-System?",
          answer: "Wir implementieren Sicherheitsmaßnahmen auf Unternehmensebene, einschließlich Ende-zu-Ende-Verschlüsselung, sichere Datenspeicherung und regelmäßige Sicherheitsaudits. Alle Daten werden in Übereinstimmung mit der DSGVO und anderen relevanten Datenschutzbestimmungen verarbeitet."
        }
      ]
    },
    {
      title: "Implementierung",
      icon: Code,
      questions: [
        {
          question: "Wie lange dauert die Einrichtung?",
          answer: "Die meisten Kunden sind innerhalb von 72 Stunden einsatzbereit. Unser optimierter Implementierungsprozess umfasst die erste Einrichtung, CRM-Integration und KI-Training mit Ihren Geschäftsdaten."
        },
        {
          question: "Bieten Sie Schulungen und Support an?",
          answer: "Ja, wir bieten umfassende Schulungen für Ihr Team und kontinuierlichen Support. Unser Support-Team ist rund um die Uhr verfügbar, um bei Fragen oder Problemen zu helfen."
        },
        {
          question: "Können wir von unserem bestehenden System migrieren?",
          answer: "Ja, wir bieten reibungslose Migrationspfade von bestehenden Systemen. Unser Team arbeitet mit Ihnen zusammen, um sicherzustellen, dass alle Ihre Daten ordnungsgemäß in das neue KI-System übertragen und integriert werden."
        }
      ]
    },
    {
      title: "Geschäftlicher Nutzen",
      icon: Scale,
      questions: [
        {
          question: "Welchen ROI kann ich erwarten?",
          answer: "Kunden sehen typischerweise ROI innerhalb des ersten Monats. Im Durchschnitt reduzieren unsere Lösungen die Support-Kosten um 40-60%, erhöhen die Lead-Konversionsraten um 35% und sparen monatlich über 100 Stunden manuelle Arbeit."
        },
        {
          question: "Wie hilft KI bei der Lead-Generierung?",
          answer: "Unser KI-System qualifiziert Leads automatisch, interagiert sofort mit ihnen und pflegt sie durch personalisierte Interaktionen. Dies führt zu qualitativ hochwertigeren Leads und verbesserten Konversionsraten."
        },
        {
          question: "Was macht ZK.AI anders als andere Lösungen?",
          answer: "ZK.AI zeichnet sich durch unsere fortschrittliche KI-Technologie, umfassende Integrationsmöglichkeiten und Fokus auf messbare Geschäftsergebnisse aus. Unsere Lösungen sind vollständig anpassbar und wachsen mit Ihren Geschäftsanforderungen."
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
        <meta name="description" content="Finden Sie Antworten auf häufig gestellte Fragen zu den KI-gesteuerten Automatisierungslösungen von ZK.AI." />
        <link rel="canonical" href="https://zk-ai.agency/de/faq" />
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
              Häufig gestellte <span className="text-purple-400">Fragen</span>
            </h1>
            <p className="text-xl text-gray-300">
              Finden Sie Antworten auf häufige Fragen zu unseren KI-Lösungen
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
                placeholder="Fragen durchsuchen..."
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
              Noch Fragen? Wir sind hier, um zu helfen!
            </p>
            <CTAButton text="Kontaktieren Sie uns" />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
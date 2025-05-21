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
      title: "Genel",
      icon: MessageSquare,
      questions: [
        {
          question: "ZK.AI nedir?",
          answer: "ZK.AI, işletmeler için yapay zeka destekli otomasyon çözümlerinin önde gelen sağlayıcısıdır. Müşteri etkileşimleri, potansiyel müşteri oluşturma, randevu ayarlama ve web sitesi oluşturma konularında akıllı sistemler geliştirme konusunda uzmanız ve işletmelerin zaman ve kaynaklardan tasarruf etmesine ve operasyonel verimliliğini artırmasına yardımcı oluyoruz."
        },
        {
          question: "Yapay zeka müşteri desteğini nasıl iyileştirir?",
          answer: "Yapay zeka teknolojimiz, müşteri sorularına anında 7/24 yanıt sağlar, birden fazla görüşmeyi eş zamanlı olarak yönetir ve doğruluğu artırmak için her etkileşimden öğrenir. Bu, daha hızlı yanıt süreleri, tutarlı hizmet kalitesi ve destek maliyetlerini %60'a kadar azaltırken artan müşteri memnuniyeti ile sonuçlanır."
        },
        {
          question: "Hangi sektörlere hizmet veriyorsunuz?",
          answer: "E-ticaret, SaaS, sağlık, finans, gayrimenkul ve profesyonel hizmetler dahil olmak üzere geniş bir sektör yelpazesine hizmet veriyoruz. Yapay zeka çözümlerimiz, sektöre özel gereksinimleri ve uyumluluk standartlarını karşılayacak şekilde özelleştirilebilir."
        }
      ]
    },
    {
      title: "Teknik",
      icon: Settings2,
      questions: [
        {
          question: "ZK.AI CRM'imle entegre edilebilir mi?",
          answer: "Evet! ZK.AI, Salesforce, HubSpot ve Zoho gibi büyük CRM platformlarıyla sorunsuz bir şekilde entegre olur. Sistemimiz müşteri kayıtlarını otomatik olarak günceller, etkileşimleri takip eder ve verileri gerçek zamanlı olarak senkronize eder."
        },
        {
          question: "Yapay zeka chatbot markamıza uygun özelleştirilebilir mi?",
          answer: "Kesinlikle! Chatbotun görünümünü, tonunu, yanıtlarını ve davranışını marka kimliğinizle mükemmel bir şekilde uyumlu hale getirebilirsiniz."
        },
        {
          question: "Yapay zeka sistemi ne kadar güvenli?",
          answer: "Uçtan uca şifreleme, güvenli veri depolama ve düzenli güvenlik denetimleri dahil olmak üzere kurumsal düzeyde güvenlik önlemleri uyguluyoruz. Tüm veriler KVKK ve diğer ilgili veri koruma düzenlemelerine uygun olarak işlenir."
        }
      ]
    },
    {
      title: "Uygulama",
      icon: Code,
      questions: [
        {
          question: "Kurulum ne kadar sürer?",
          answer: "Çoğu müşteri 72 saat içinde hazır duruma gelir. Optimize edilmiş uygulama sürecimiz, ilk kurulum, CRM entegrasyonu ve iş verilerinizle yapay zeka eğitimini içerir."
        },
        {
          question: "Eğitim ve destek sağlıyor musunuz?",
          answer: "Evet, ekibiniz için kapsamlı eğitim ve sürekli destek sağlıyoruz. Destek ekibimiz, ortaya çıkabilecek sorular veya sorunlarda yardımcı olmak için 7/24 hizmetinizdedir."
        },
        {
          question: "Mevcut sistemimizden geçiş yapabilir miyiz?",
          answer: "Evet, mevcut sistemlerden sorunsuz geçiş yolları sunuyoruz. Ekibimiz, tüm verilerinizin yeni yapay zeka sistemine düzgün bir şekilde aktarılmasını ve entegre edilmesini sağlamak için sizinle birlikte çalışacaktır."
        }
      ]
    },
    {
      title: "İş Etkisi",
      icon: Scale,
      questions: [
        {
          question: "Nasıl bir ROI bekleyebilirim?",
          answer: "Müşteriler genellikle ilk ay içinde ROI görür. Ortalama olarak, çözümlerimiz destek maliyetlerini %40-60 azaltır, potansiyel müşteri dönüşüm oranlarını %35 artırır ve aylık 100+ saat manuel işten tasarruf sağlar."
        },
        {
          question: "Yapay zeka potansiyel müşteri oluşturmaya nasıl yardımcı olur?",
          answer: "Yapay zeka sistemimiz potansiyel müşterileri otomatik olarak değerlendirir, onlarla anında etkileşime geçer ve kişiselleştirilmiş etkileşimlerle besler. Bu, daha kaliteli potansiyel müşteriler ve gelişmiş dönüşüm oranları ile sonuçlanır."
        },
        {
          question: "ZK.AI'yi diğer çözümlerden farklı kılan nedir?",
          answer: "ZK.AI, gelişmiş yapay zeka teknolojimiz, kapsamlı entegrasyon yeteneklerimiz ve ölçülebilir iş sonuçları sunma odağımızla öne çıkar. Çözümlerimiz tamamen özelleştirilebilir ve işletme ihtiyaçlarınızla birlikte büyür."
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
        <title>SSS - ZK.AI</title>
        <meta name="description" content="ZK.AI'nin yapay zeka destekli otomasyon çözümleri hakkında sıkça sorulan soruların yanıtlarını bulun." />
        <link rel="canonical" href="https://zk-ai.agency/tr/faq" />
        <link rel="alternate" href="https://zk-ai.agency/en/faq" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de/faq" hreflang="de" />
        <link rel="alternate" href="https://zk-ai.agency/tr/faq" hreflang="tr" />
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
              Sıkça Sorulan <span className="text-purple-400">Sorular</span>
            </h1>
            <p className="text-xl text-gray-300">
              Yapay zeka çözümlerimiz hakkında sık sorulan soruların yanıtlarını bulun
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
                placeholder="Sorularda ara..."
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
              Başka sorularınız mı var? Size yardımcı olmaktan memnuniyet duyarız!
            </p>
            <CTAButton text="Bize Ulaşın" />
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
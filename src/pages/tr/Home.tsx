import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Calendar, Users, CheckCircle2, MessageSquare, Users2, CalendarClock, Bot, Clock3, Settings2, Scale, ChevronDown, ChevronUp, Code, Sparkles, Palette, Mail, MessageCircle, Phone, Instagram, Twitter, MessageSquareMore, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from '../../components/ParticleBackground';
import Header from '../../components/Header';
import ProcessSteps from '../../components/ProcessSteps';
import PricingSection from '../../components/PricingSection';
import ComparisonTable from '../../components/ComparisonTable';
import Footer from '../../components/Footer';
import CTAButton from '../../components/CTAButton';

const painPoints = [
  { icon: Clock, text: 'Müşteriler yanıt için çok uzun bekliyor' },
  { icon: DollarSign, text: 'Kaçırılan potansiyel müşteriler gelir kaybına neden oluyor' },
  { icon: Calendar, text: 'Manuel randevu ayarlama zaman kaybettiriyor' },
  { icon: Users, text: 'Destek ekipleri aşırı yüklenmiş durumda' },
];

const services = [
  {
    icon: MessageSquare,
    title: 'İşletmeler için Yapay Zeka Chatbotları',
    description: 'Müşteri etkileşimlerini insan benzeri yapay zeka yanıtlarıyla otomatikleştirin.',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&q=80'
  },
  {
    icon: Users2,
    title: 'Potansiyel Müşteri Oluşturma ve CRM Entegrasyonu',
    description: 'Potansiyel müşterileri yakalayın ve CRM\'iniz ile sorunsuz senkronize edin.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80'
  },
  {
    icon: CalendarClock,
    title: 'Randevu Ayarlama',
    description: 'Görüşme ve toplantıları e-posta yazışması olmadan anında planlayın.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop&q=80'
  },
  {
    icon: Bot,
    title: 'ZK Agent',
    description: 'Kapsamlı iş otomasyonu için en gelişmiş yapay zeka ajanımız.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&q=80',
    link: '/tr/zkagent'
  },
  {
    icon: Code,
    title: 'Yapay Zeka Destekli Web Sitesi Oluşturma',
    description: 'Frontend ve backend işlevselliğine sahip etkileyici, animasyonlu web siteleri oluşturun.',
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop&q=80',
    featured: true
  }
];

const comingSoonService = {
  id: 'cold-email',
  title: "Yapay Zeka ile Otomatik Soğuk E-posta Gönderimi",
  description: "Yapay Zeka ile Otomatik Soğuk E-posta Gönderimi sayesinde, seçtiğiniz potansiyel müşterilere manuel çaba harcamadan yüzlerce hedefli soğuk e-posta gönderebilirsiniz. Yapay zeka kişiselleştirilmiş mesajlar oluşturur ve tüm gönderim sürecini otomatikleştirir, böylece iletişim çalışmalarınızı verimli bir şekilde ölçeklendirebilirsiniz.",
  features: [
    "Akıllı e-posta sekansı otomasyonu",
    "Kişiselleştirilmiş içerik oluşturma",
    "Yanıt oranı optimizasyonu",
    "Potansiyel müşteri takibi için CRM entegrasyonu"
  ],
  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&q=80"
};

const upcomingServices = [
  {
    id: 'personalized-email',
    icon: MessageSquare,
    title: "Kişiselleştirilmiş E-posta Kampanyaları",
    description: "Yapay zeka ile ultra kişiselleştirilmiş e-posta kampanyaları",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 'social-media',
    icon: MessageCircle,
    title: "Sosyal Medya İletişimi",
    description: "Sosyal platformlarda yapay zeka destekli etkileşim ve mesajlaşma",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: 'phone-callers',
    icon: Phone,
    title: "Yapay Zeka Telefon Aramaları",
    description: "Müşteri etkileşimleri için yapay zeka ile iş aramalarını yönetme",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    id: 'instagram',
    icon: Instagram,
    title: "Instagram Otomasyonu",
    description: "Yapay zeka paylaşım, DM yanıtlama, yorum yapma ve daha fazlasını yönetir",
    color: "from-pink-500/20 to-purple-500/20"
  },
  {
    id: 'twitter',
    icon: Twitter,
    title: "X (Twitter) Terminal",
    description: "Yapay zeka trendlere göre otomatik düşünür ve tweet atar",
    color: "from-blue-500/20 to-indigo-500/20"
  },
  {
    id: 'telegram',
    icon: MessageSquareMore,
    title: "Telegram Bot",
    description: "Mesajlaşma ve müşteri desteği için yapay zeka destekli Telegram otomasyonu",
    color: "from-cyan-500/20 to-blue-500/20"
  }
];

const benefits = [
  {
    icon: Bot,
    title: 'İnsan gibi hissettiren yapay zeka',
    description: 'Gerçek konuşmalar oluşturan doğal dil işleme'
  },
  {
    icon: Clock3,
    title: 'Ayda 100+ saat tasarruf',
    description: 'Tekrarlayan görevleri otomatikleştirin ve stratejik büyümeye odaklanın'
  },
  {
    icon: Settings2,
    title: 'Tamamen özelleştirilebilir ve entegre',
    description: 'Mevcut iş sistemlerinizle sorunsuz bağlantı'
  },
  {
    icon: Scale,
    title: 'Her ölçek için ölçeklenebilir',
    description: 'Start-up\'lardan kurumsal şirketlere, kendi hızınızda büyüyün'
  }
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>ZK.AI - Yapay Zeka Destekli İş Otomasyonu</title>
        <meta name="description" content="İşletmenizi yapay zeka destekli otomasyon ile dönüştürün. Akıllı chatbotlarımız ile geliri artırın, yanıt süresini azaltın ve müşteri etkileşimlerini otomatikleştirin." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://zk-ai.agency/tr" />
        <link rel="alternate" href="https://zk-ai.agency/en" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de" hreflang="de" />
        <link rel="alternate" href="https://zk-ai.agency/tr" hreflang="tr" />
      </Helmet>

      <ParticleBackground />
      <Header />
      
      {/* Problem Section */}
      <section id="problem" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              İşletmeniz Yapay Zeka Olmadan <span className="text-purple-400">Zaman ve Para</span> Kaybediyor
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
              ZK.AI ile müşteri etkileşimlerini otomatikleştirin, potansiyel müşterileri değerlendirin ve siz büyümeye odaklanırken 7/24 randevuları planlayın.
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
              Ölçeklenebilir Büyüme için <span className="text-purple-400">Yapay Zeka Destekli</span> Otomasyon
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

            {/* ZK Agent */}
            <div className="mt-12">
              {services.slice(3, 4).map((service, index) => (
                <Link
                  key={index}
                  to={service.link}
                  className="block group relative bg-black/30 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
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
                        <div className="flex items-center gap-2 text-purple-400">
                          <span>Daha fazla bilgi</span>
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Link>
              ))}
            </div>

            {/* Featured service (Website Creation) */}
            <div className="mt-12">
              {services.slice(4).map((service, index) => (
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
            <CTAButton text="Nasıl Çalışır?" />
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
            Çok Yakında
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
                    to={`/tr/waitlist?service=${comingSoonService.id}`}
                    className="button-secondary inline-flex items-center gap-2"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Bekleme Listesine Katıl
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
            Çok Yakında
          </motion.div>
        </div>

        <div className="bg-black/40 backdrop-blur-lg rounded-xl overflow-hidden border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 p-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Gelecek Yapay Zeka Hizmetleri</h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Yapay zeka destekli otomasyon çözümlerimizin yeni nesli için hazır olun
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
                        to={`/tr/waitlist?service=${service.id}`}
                        className="text-purple-400 hover:text-purple-300 flex items-center gap-2 mx-auto transition-colors"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        Bekleme Listesine Katıl
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
      <ComparisonTable />
      <PricingSection />

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              İşletmeler Neden <span className="text-purple-400">ZK.AI</span>'ı Tercih Ediyor?
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
            <CTAButton text="Ücretsiz Yapay Zeka Strateji Görüşmesi" />
          </div>
        </div>

        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
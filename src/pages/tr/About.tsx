import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Bot, Zap, Users, Globe, Target, Award } from 'lucide-react';
import ParticleBackground from '../../components/ParticleBackground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import CTAButton from '../../components/CTAButton';
import { useTranslatedContent } from '../../hooks/useTranslatedContent';

const About: React.FC =() => {
  const { t } = useTranslatedContent();

  const teamValues = [
    {
      icon: Bot,
      title: 'Yapay Zeka Mükemmeliyeti',
      description: 'Yenilikçi çözümler sunmak için yapay zeka teknolojisinin sınırlarını zorluyoruz.'
    },
    {
      icon: Users,
      title: 'Önce Müşteri',
      description: 'Sizin başarınız bizim başarımız. Olağanüstü sonuçlar sunmaya kararlıyız.'
    },
    {
      icon: Target,
      title: 'İnovasyon',
      description: 'Teknolojik gelişmelerin önünde kalmak için sürekli gelişiyoruz.'
    },
    {
      icon: Award,
      title: 'Kalite',
      description: 'Sunduğumuz her çözümde en yüksek standartları koruyoruz.'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Hakkımızda - ZK.AI</title>
        <meta name="description" content="ZK.AI'nin akıllı otomasyon ve yapay zeka çözümleri ile işletmeleri dönüştürme misyonu hakkında bilgi edinin." />
        <link rel="canonical" href="https://zk-ai.agency/tr/about" />
        <link rel="alternate" href="https://zk-ai.agency/en/about" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de/about" hreflang="de" />
        <link rel="alternate" href="https://zk-ai.agency/tr/about" hreflang="tr" />
      </Helmet>

      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              İşletmeleri <span className="text-purple-400">Yapay Zeka İnovasyonu</span> ile Dönüştürüyoruz
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ZK.AI'de, işletmelerin benzeri görülmemiş büyüme ve verimlilik elde etmesi için yapay zekanın gücünden yararlanmasına yardımcı olmaya tutkuyla bağlıyız.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">Misyonumuz</h2>
              <p className="text-xl text-gray-300">
                Yapay zeka teknolojisini demokratikleştirme ve güçlü otomasyon çözümlerini her ölçekteki işletme için erişilebilir kılma misyonundayız. Amacımız, şirketlerin operasyonel maliyetleri azaltmasına, verimliliği artırmasına ve akıllı otomasyon yoluyla olağanüstü müşteri deneyimleri sunmasına yardımcı olmaktır.
              </p>
              <div className="flex gap-4">
                <CTAButton text="Hemen Başlayın" type="primary" />
                <CTAButton text="Daha Fazla Bilgi" type="secondary" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-96 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80"
                  alt="Yapay Zeka Teknolojisi"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Değerlerimiz</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Temel değerlerimiz, ürün geliştirmeden müşteri hizmetlerine kadar yaptığımız her şeye rehberlik eder.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-6 hover:bg-black/40 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold">Vizyonumuz</h2>
              <p className="text-xl text-gray-300">
                Her ölçekteki işletmenin gelişmiş yapay zeka teknolojisinden yararlanarak operasyonlarını dönüştürebileceği ve olağanüstü sonuçlar elde edebileceği bir gelecek öngörüyoruz. Büyürken, inovasyona, kaliteye ve müşteri başarısına olan bağlılığımızı sürdürüyoruz.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">YZ</div>
                  <div className="text-gray-300">İnovasyon</div>
                </div>
                <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">7/24</div>
                  <div className="text-gray-300">Destek</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Globe className="w-full h-96 text-purple-400 opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
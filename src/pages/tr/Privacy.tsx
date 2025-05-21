import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server } from 'lucide-react';
import ParticleBackground from '../../components/ParticleBackground';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useTranslatedContent } from '../../hooks/useTranslatedContent';

const Privacy: React.FC = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Giriş',
      content: `ZK.AI Automation & AI Solutions ("biz," "bizim," veya "bize") gizliliğinize saygı duyar ve kişisel verilerinizi korumaya kararlıdır. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu açıklar.`
    },
    {
      icon: Lock,
      title: 'Veri Toplama ve Kullanım',
      content: `Yalnızca web sitemiz aracılığıyla bizimle iletişime geçerken bize sağladığınız kişisel verileri (örn. ad, e-posta ve sorgu detayları) topluyor ve işliyoruz. Şu anda çerezler, izleme araçları veya harici analiz hizmetleri kullanmıyoruz.`
    },
    {
      icon: Eye,
      title: 'Veri Depolama ve Güvenlik',
      content: `Verileriniz güvenli bir şekilde depolanır ve yalnızca iletişim ve hizmet sağlama amacıyla kullanılır. Kişisel bilgilerinizi yasal olarak gerekmedikçe üçüncü taraflarla paylaşmıyoruz.`
    },
    {
      icon: Server,
      title: 'Haklarınız',
      content: `Kişisel verilerinize erişim, düzeltme veya silme talep etme hakkına sahipsiniz. Haklarınızı kullanmak için info@zk-ai.agency adresinden bizimle iletişime geçebilirsiniz.`
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Gizlilik Politikası - ZK.AI</title>
        <meta name="description" content="ZK.AI'nin gizliliğinizi nasıl koruduğu ve verilerinizi nasıl işlediği hakkında bilgi edinin." />
        <link rel="canonical" href="https://zk-ai.agency/tr/privacy" />
        <link rel="alternate" href="https://zk-ai.agency/en/privacy" hreflang="en" />
        <link rel="alternate" href="https://zk-ai.agency/de/privacy" hreflang="de" />
        <link rel="alternate" href="https://zk-ai.agency/tr/privacy" hreflang="tr" />
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
            <h1 className="text-5xl font-bold mb-6">Gizlilik Politikası</h1>
            <p className="text-xl text-gray-300">
              Son güncelleme: Şubat 2025
            </p>
          </motion.div>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                    <div className="text-gray-300 space-y-4 whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 bg-purple-900/20 backdrop-blur-lg rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Bize Ulaşın</h2>
            <p className="text-gray-300">
              Gizlilikle ilgili sorularınız için lütfen bizimle iletişime geç
              <a href="mailto:info@zk-ai.agency" className="text-purple-400 hover:text-purple-300">
                info@zk-ai.agency
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Bot, Zap, Users, Globe, Target, Award } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTAButton from '../components/CTAButton';

const About: React.FC = () => {
  const teamValues = [
    {
      icon: Bot,
      title: 'AI Excellence',
      description: 'We push the boundaries of AI technology to deliver cutting-edge solutions.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your success is our success. We\'re committed to delivering exceptional results.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly evolve and adapt to stay ahead of technological advances.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'We maintain the highest standards in every solution we deliver.'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>About Us - ZK.AI</title>
        <meta name="description" content="Learn about ZK.AI's mission to transform businesses through intelligent automation and AI solutions." />
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
              Transforming Business Through <span className="text-purple-400">AI Innovation</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              At ZK.AI, we're passionate about helping businesses harness the power of artificial intelligence to achieve unprecedented growth and efficiency.
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
              <h2 className="text-4xl font-bold">Our Mission</h2>
              <p className="text-xl text-gray-300">
                We're on a mission to democratize AI technology, making powerful automation solutions accessible to businesses of all sizes. Our goal is to help companies reduce operational costs, improve efficiency, and deliver exceptional customer experiences through intelligent automation.
              </p>
              <div className="flex gap-4">
                <CTAButton text="Get Started" type="primary" />
                <CTAButton text="Learn More" type="secondary" />
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
                  alt="AI Technology"
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
            <h2 className="text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our core values guide everything we do, from product development to customer service.
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
              <h2 className="text-4xl font-bold">Our Vision</h2>
              <p className="text-xl text-gray-300">
                We envision a future where businesses of all sizes can leverage advanced AI technology to transform their operations and achieve remarkable results. As we grow, we remain committed to innovation, quality, and customer success.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">AI</div>
                  <div className="text-gray-300">Innovation</div>
                </div>
                <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-gray-300">Support</div>
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
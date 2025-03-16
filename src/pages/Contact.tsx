import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ParticleBackground from '../components/ParticleBackground';
import ContactForm from '../components/ContactForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      <Helmet>
        <title>Contact Us - ZK.AI</title>
        <meta name="description" content="Get in touch with ZK.AI for AI-powered automation solutions tailored to your business needs." />
      </Helmet>

      <ParticleBackground />
      <Navbar />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Contact;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();

  const scrollToSection = (href: string) => {
    if (window.location.pathname !== `/${currentLanguage}`) {
      navigate(`/${currentLanguage}`);
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <footer className="relative pt-24 pb-12 px-4 border-t border-purple-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-purple-400 glow">ZK.AI</h3>
            <p className="text-gray-400">
              Transforming businesses through intelligent automation and AI solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('#services')}
                  className="text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 duration-200 cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#pricing')}
                  className="text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 duration-200 cursor-pointer"
                >
                  Pricing
                </button>
              </li>
              <li>
                <Link 
                  to={`/${currentLanguage}/about`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 duration-200 block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${currentLanguage}/contact`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 duration-200 block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to={`/${currentLanguage}/privacy`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 duration-200 block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${currentLanguage}/terms`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 duration-200 block"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to={`/${currentLanguage}/impressum`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-1 duration-200 block"
                >
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                <Mail className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                info@zk-ai.agency
              </li>
              <li className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
                <MapPin className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                Germany
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-900/30 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ZK.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
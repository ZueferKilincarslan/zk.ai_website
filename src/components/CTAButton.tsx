import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CTAButtonProps {
  text: string;
  type?: 'primary' | 'secondary';
  icon?: boolean;
  onClick?: () => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  text, 
  type = 'primary', 
  icon = true,
  onClick 
}) => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/${currentLanguage}/contact`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        type === 'primary' ? 'button-primary' : 'button-secondary'
      } flex items-center justify-center gap-2 text-lg group`}
    >
      {text}
      {icon && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
    </button>
  );
};

export default CTAButton;
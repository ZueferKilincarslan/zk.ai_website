import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, X } from 'lucide-react';
import { supabase } from '../services/supabase';

interface CountdownBannerProps {
  language: 'en' | 'de' | 'tr';
}

interface Countdown {
  id: string;
  title: string;
  target_date: string;
  is_active: boolean;
}

const CountdownBanner: React.FC<CountdownBannerProps> = ({ language }) => {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchActiveCountdown = async () => {
      const { data, error } = await supabase
        .from('countdowns')
        .select('*')
        .eq('is_active', true)
        .order('target_date', { ascending: true })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching countdown:', error);
        return;
      }

      if (data) {
        setCountdown(data);
      }
    };

    fetchActiveCountdown();

    // Subscribe to changes
    const subscription = supabase
      .channel('countdowns')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'countdowns' 
      }, () => {
        fetchActiveCountdown();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!countdown) return;

    const calculateTimeLeft = () => {
      const difference = new Date(countdown.target_date).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setCountdown(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  if (!countdown || !timeLeft || !isVisible) return null;

  const translations = {
    days: language === 'de' ? 'Tage' : language === 'tr' ? 'Gün' : 'Days',
    hours: language === 'de' ? 'Stunden' : language === 'tr' ? 'Saat' : 'Hours',
    minutes: language === 'de' ? 'Minuten' : language === 'tr' ? 'Dakika' : 'Minutes',
    seconds: language === 'de' ? 'Sekunden' : language === 'tr' ? 'Saniye' : 'Seconds',
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-gradient-to-r from-purple-600 to-purple-800 text-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <span className="font-medium">{countdown.title}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-2xl font-bold">{value.toString().padStart(2, '0')}</div>
                <div className="text-xs text-purple-200">{translations[unit as keyof typeof translations]}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white transition-colors"
          aria-label="Close countdown"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default CountdownBanner;
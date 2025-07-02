import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        .limit(1);

      if (error) {
        console.error('Error fetching countdown:', error);
        return;
      }

      if (data && data.length > 0) {
        setCountdown(data[0]);
      } else {
        setCountdown(null);
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

  const translations = {
    days: language === 'de' ? 'Tage' : language === 'tr' ? 'Gün' : 'Days',
    hours: language === 'de' ? 'Stunden' : language === 'tr' ? 'Saat' : 'Hours',
    minutes: language === 'de' ? 'Minuten' : language === 'tr' ? 'Dakika' : 'Minutes',
    seconds: language === 'de' ? 'Sekunden' : language === 'tr' ? 'Saniye' : 'Seconds',
  };

  // Don't render anything if no countdown or not visible
  if (!countdown || !timeLeft || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 py-1.5">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Timer className="w-3.5 h-3.5" />
              <span className="font-medium text-sm">{countdown.title}</span>
            </div>
            
            <div className="flex items-center gap-3">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className={`text-base font-bold text-white ${
                    unit === 'days' && value === 0 ? 'text-red-300' :
                    unit === 'hours' && value < 12 ? 'text-red-300' :
                    unit === 'minutes' && value < 30 ? 'text-red-300' :
                    unit === 'seconds' && value < 30 ? 'text-red-300' : ''
                  }`}>
                    {value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-xs text-purple-200">{translations[unit as keyof typeof translations]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountdownBanner;
import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  isLast?: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  title,
  description,
  icon: Icon,
  image,
  isLast = false
}) => {
  const stepVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      x: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={stepVariants}
      className="relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          variants={stepVariants}
          className="space-y-6"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-purple-400">{number}</span>
            <Icon className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-3xl font-bold">{title}</h3>
          <p className="text-xl text-gray-300">{description}</p>
        </motion.div>

        <motion.div
          variants={imageVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative bg-black/30 backdrop-blur-lg rounded-xl overflow-hidden"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </div>

      {!isLast && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: "6rem", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute left-[2.25rem] top-full w-px bg-gradient-to-b from-purple-400 to-transparent"
        />
      )}
    </motion.div>
  );
};

export default ProcessStep;
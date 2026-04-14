import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Preloader.css";

interface PreloaderProps {
  onLoadingComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoadingComplete) onLoadingComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  // Motion Variants
  const containerVariants = {
    exit: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.87, 0, 0.13, 1]
      }
    }
  };

  const heroVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -3 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: { 
        duration: 0.6, 
        ease: "backOut",
        delay: 0.4
      } 
    }
  };

  const stickerVariants = {
    initial: { x: -100, opacity: 0, rotate: 0 },
    animate: { 
      x: 0, 
      opacity: 1, 
      rotate: -12,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 1.2
      } 
    }
  };

  const marqueeText = "STUDIO DENY • STREETWEAR DEPT • COLLECTIONS 2025 • ";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader-container"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Background Marquees (The "Funky" Energy) */}
          <div className="marquee-container">
            <div className="marquee-row animate-left">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>{marqueeText}</span>
              ))}
            </div>
            <div className="marquee-row filled animate-right">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>{marqueeText}</span>
              ))}
            </div>
            <div className="marquee-row animate-left">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>{marqueeText}</span>
              ))}
            </div>
          </div>

          {/* Premium Sticker Tag */}
          <motion.div 
            className="sticker-tag"
            variants={stickerVariants}
          >
            VERIFIED_CULTURE // Q1-2025
          </motion.div>

          {/* Hero Content */}
          <div className="hero-wrapper">
            <motion.h1 
              className="street-title"
              variants={heroVariants}
            >
              <motion.span>DENY</motion.span>
              <motion.span 
                className="accent-word"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 1 }}
              >
                THE
              </motion.span>
              <motion.span>ORDINARY</motion.span>
            </motion.h1>
          </div>

          {/* Bottom Barcode Decorative */}
          <div className="barcode-visual" />
          
          {/* Status Bar */}
          <motion.div 
            className="status-bar"
            style={{
              position: 'absolute',
              bottom: '50px',
              fontFamily: 'JetBrains Mono',
              fontSize: '10px',
              letterSpacing: '0.3em',
              opacity: 0.5
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8 }}
          >
            PARSING_IDENTITY... [OK]
          </motion.div>

          {/* Acid Flash on Exit */}
          <motion.div 
            className="exit-flash"
            exit={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

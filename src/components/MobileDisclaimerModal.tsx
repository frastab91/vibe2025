import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

export const MobileDisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pointer-events-auto">
          {/* Backdrop Layer */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            onClick={handleDismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content Card */}
          <motion.div
            className="relative bg-white border border-gray-200 rounded-xl shadow-2xl p-8 max-w-lg w-full z-[9999]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Headline */}
            <h2 className="text-3xl font-bold font-['Instrument_Serif',serif] text-[#1A1A1A] mb-4">
              Desktop Privilege.
            </h2>

            {/* Body Text */}
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              This website features interactive scrollytelling elements designed for larger screens. 
              For the best viewing experience, I recommend switching to a computer, though you can still access the content here.
            </p>

            {/* Proceed Button */}
            <button
              onClick={handleDismiss}
              className="w-full bg-[#1A1A1A] text-white font-['JetBrains_Mono',monospace] py-3 px-6 rounded-md hover:bg-[#1A1A1A]/90 active:bg-[#1A1A1A]/80 transition-colors duration-200 text-sm font-medium"
            >
              I'll risk the aesthetic.
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

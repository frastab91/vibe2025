import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export const MobileDisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Check if we're on mobile and if user hasn't seen this warning yet
      const hasSeenWarning = sessionStorage.getItem("hasSeenMobileWarning");
      const isMobile = window.innerWidth < 768;

      console.log("Mobile check:", { isMobile, hasSeenWarning, width: window.innerWidth });

      if (isMobile && !hasSeenWarning) {
        setIsOpen(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("hasSeenMobileWarning", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
            onClick={handleDismiss}
          />

          {/* Modal Card - Slides up from bottom */}
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="fixed bottom-0 left-0 right-0 z-[101] p-4 pointer-events-none"
          >
            <div 
              className="bg-white border border-gray-200 rounded-lg shadow-2xl p-8 max-w-lg mx-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Headline */}
              <h2 className="text-3xl font-bold font-['Instrument_Serif',serif] text-[#1A1A1A] mb-4">
                Desktop Privilege.
              </h2>

              {/* Body Text */}
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                This experience was vibe-coded for the expansive luxury of a monitor, 
                not a vertical thumb-scrolling workout. Things might look cramped, 
                clipped, or chaotically artistic on this device.
              </p>

              {/* Proceed Button */}
              <button
                onClick={handleDismiss}
                className="w-full bg-[#1A1A1A] text-white font-['JetBrains_Mono',monospace] py-3 px-6 rounded-md hover:bg-[#1A1A1A]/90 active:bg-[#1A1A1A]/80 transition-colors duration-200 text-sm font-medium"
              >
                I'll risk the aesthetic.
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

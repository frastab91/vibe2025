import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export const MobileDisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        // Optional: Check session storage if we only want to show it once per session
        // For now, we'll show it once per page load to ensure the joke lands
        setIsOpen(true);
      }
    };

    checkMobile();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm md:hidden"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-[#F9F9F7] w-full max-w-sm p-6 rounded-2xl shadow-2xl border border-[#A3332D]/20 relative overflow-hidden"
          >
            {/* Decorative background vibe */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#A3332D]/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#2D5A27]/5 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-['Instrument_Serif',serif] text-2xl font-bold text-[#1A1A1A]">
                  Desktop Only-ish?
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X size={20} className="text-[#1A1A1A]/60" />
                </button>
              </div>

              <p className="font-['JetBrains_Mono',monospace] text-sm text-[#4A4A4A] leading-relaxed mb-6">
                Sorry, I didn't vibe-code to optimize this for mobile screens. Hope you understand! :)
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-[#1A1A1A] text-[#F9F9F7] font-['JetBrains_Mono',monospace] text-sm font-bold rounded-lg hover:bg-[#2D5A27] transition-colors"
              >
                I understand (I think)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Linkedin, X, Sparkles } from "lucide-react";

export const TopNavigation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Fixed Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-none mix-blend-multiply">
        {/* Left: LinkedIn Link */}
        <a 
          href="https://www.linkedin.com/in/frastab/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-3 text-[#1A1A1A] hover:opacity-70 transition-opacity group"
        >
          <span className="font-sans text-lg md:text-xl font-medium tracking-tight text-[#1A1A1A]">
            Francesco Stabilito
          </span>
          <Linkedin size={20} strokeWidth={1.5} className="text-[#1A1A1A]" />
        </a>

        {/* Right: Vibe Coded Trigger */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="pointer-events-auto flex items-center gap-2 text-[#1A1A1A] hover:text-[#A3332D] transition-colors group"
        >
          <span className="font-['JetBrains_Mono',monospace] text-xs md:text-sm font-medium tracking-wide uppercase border-b border-[#1A1A1A] pb-0.5">
            100% Vibe coded
          </span>
        </button>
      </nav>

      {/* Explanation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-[#F9F9F7]/90 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-black/5 relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 transition-colors text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
              >
                <X size={24} strokeWidth={1.5} />
              </button>

              <div className="mb-8 w-12 h-12 rounded-full bg-[#E5E5E5] flex items-center justify-center">
                <Sparkles size={24} className="text-[#1A1A1A]" strokeWidth={1.5} />
              </div>

              <h2 className="font-['Instrument_Serif',serif] text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
                The "Vibe Coding" Stack
              </h2>

              <p className="font-['JetBrains_Mono',monospace] text-base md:text-lg text-[#4A4A4A] leading-relaxed">
                Using <span className="text-[#2D5A27] font-bold">Gemini 3</span> custom gem to refine prompts and then copy-pasted the prompts to <span className="text-[#A3332D] font-bold">Figma Make</span>.
              </p>

              <div className="mt-8 pt-8 border-t border-black/5 flex justify-between items-center">
                <span className="text-xs font-['JetBrains_Mono',monospace] text-[#1A1A1A]/40 uppercase tracking-widest">
                  No Code Written By Human Hands
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

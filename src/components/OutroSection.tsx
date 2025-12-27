import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export const OutroSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#F9F9F7] min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden px-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="text-center z-10"
      >
        {/* Main Headline - Clickable to scroll top */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <h1 
            onClick={scrollToTop}
            className="font-['Instrument_Serif',serif] text-6xl md:text-8xl lg:text-9xl font-bold text-[#1A1A1A] cursor-pointer hover:opacity-80 transition-opacity"
          >
            Thank you
            <br />
            for reading.
          </h1>
        </motion.div>

        {/* Sub-text / Credits */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
          className="mt-12 md:mt-16 flex flex-col items-center gap-4"
        >
          <p className="font-['JetBrains_Mono',monospace] text-xs md:text-sm text-[#1A1A1A]/40 uppercase tracking-widest">
            2025 Vibe-Coding Wrapped • Francesco
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-['JetBrains_Mono',monospace] text-xs text-[#1A1A1A]/60 hover:text-[#A3332D] transition-colors mt-4"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>

      {/* Subtle decorative background element */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1A1A1A]/5 to-transparent pointer-events-none opacity-50"></div>
    </footer>
  );
};

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Info } from "lucide-react";

export const VibeTrapSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // --- Animation Transforms ---
  
  // 1. Setup (0% - 15%): Fade in Axes & Background
  const setupOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  
  // 2. The Hook (15% - 50%): Draw Green Line
  const greenPathLength = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  
  // 3. The Trap (50% - 85%): Draw Red Line
  const redPathLength = useTransform(scrollYProgress, [0.5, 0.85], [0, 1]);
  
  // 4. The Reveal (85% - 100%): Fade in Legend & Marker
  const markerOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  // SVG Configuration - Vertical Immersion
  const width = 1200; 
  const height = 900;
  const padding = 80;
  const zeroY = height * 0.55; // Slightly lower midpoint to give more headroom for the "Joy" peak

  // Paths
  // Green: Starts at zeroY, rises VERY high (top 10%), then drops deep
  // Control points adjusted for deep parabolic arc
  const greenPath = `M ${padding} ${zeroY} C ${width * 0.3} ${0}, ${width * 0.6} ${0}, ${width - padding} ${height - padding}`;
  
  // Red: Starts at bottom, stays flat, then rockets up to top right
  // Control points adjusted for exponential "hockey stick" curve
  const redPath = `M ${padding} ${height - padding} C ${width * 0.6} ${height - padding}, ${width * 0.85} ${height * 0.8}, ${width - padding} ${padding}`;

  // Intersection X
  const intersectionX = width * 0.78;

  return (
    <>
      {/* Text-Only Intro Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#F9F9F7] py-24 px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-['Instrument_Serif',serif] text-[#1A1A1A] mb-8 leading-tight">
            The Vibe Trap
          </h1>
          <p className="font-['JetBrains_Mono',monospace] text-base md:text-lg text-[#1A1A1A]/70 leading-relaxed max-w-3xl">
            It starts with magic. You prompt, it builds. But as complexity grows, the context window suffocates. 
            What begins as velocity turns into a cycle of debugging hallucinated logic. The marginal value plummets 
            while the cost of correction skyrockets.
          </p>
        </div>
      </motion.div>

      {/* Sticky Chart Container */}
      <div ref={containerRef} className="h-[400vh] relative bg-[#F9F9F7]">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-2 sm:p-4">
          
          {/* The Card - Maximized Height, Chart Only */}
          <div className="bg-white w-full max-w-[95vw] xl:max-w-7xl h-[90vh] min-h-[700px] rounded-2xl shadow-xl relative flex flex-col p-6 md:p-8 overflow-hidden">
            
            {/* Interactive Disclaimer - Repositioned to Top Right */}
            <div className="absolute top-6 right-6 z-30">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onMouseEnter={() => setShowDisclaimer(true)}
                onMouseLeave={() => setShowDisclaimer(false)}
                onClick={() => setShowDisclaimer(!showDisclaimer)}
                aria-label="Disclaimer Info"
              >
                <Info size={24} className="text-[#1A1A1A]/40" />
              </button>

              <AnimatePresence>
                {showDisclaimer && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white p-4 rounded-lg shadow-xl border border-gray-100 z-50 text-xs font-['JetBrains_Mono',monospace] text-[#1A1A1A]/80 leading-relaxed"
                  >
                    DISCLAIMER: For graphical storytelling and narrative only; not based on quantitative research.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chart Container - Full Height */}
            <div className="flex-1 w-full h-full relative">
            <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
              
              {/* --- Background Areas & Axes (Layer 1) --- */}
              <motion.g style={{ opacity: setupOpacity }}>
                {/* Background Areas */}
                <rect x={padding} y={padding} width={width - 2 * padding} height={zeroY - padding} fill="#2D5A27" fillOpacity="0.03" />
                
                {/* JOY LABEL - Top Left */}
                <text 
                  x={padding + 40} 
                  y={padding + 80} 
                  className="font-['Instrument_Serif',serif] text-4xl font-bold fill-[#2D5A27] opacity-80 tracking-widest uppercase"
                >
                  Joy / "Wow"
                </text>
                
                <rect x={padding} y={zeroY} width={width - 2 * padding} height={height - zeroY - padding} fill="#A3332D" fillOpacity="0.03" />
                
                {/* FRUSTRATION LABEL - Bottom Left */}
                <text 
                  x={padding + 40} 
                  y={height - padding - 40} 
                  className="font-['Instrument_Serif',serif] text-4xl font-bold fill-[#A3332D] opacity-80 tracking-widest uppercase"
                >
                  Frustration
                </text>

                {/* X Axis */}
                <line x1={padding} y1={zeroY} x2={width - padding} y2={zeroY} stroke="#1A1A1A" strokeWidth="1" strokeOpacity="0.1" />
                <text x={width / 2} y={zeroY + 30} textAnchor="middle" className="font-['JetBrains_Mono',monospace] text-sm fill-[#1A1A1A]/50 uppercase tracking-widest">
                  Number of prompts / interactions →
                </text>

                {/* Y Axes Labels */}
                <text x={padding - 20} y={zeroY} textAnchor="end" className="font-['JetBrains_Mono',monospace] text-xs md:text-sm fill-[#1A1A1A]/50 -rotate-90 origin-right translate-x-4">
                  Output Value
                </text>
                <text x={width - padding + 35} y={zeroY} textAnchor="start" className="font-['JetBrains_Mono',monospace] text-xs md:text-sm fill-[#1A1A1A]/50 -rotate-90 origin-left -translate-x-4">
                  Time / Sanity
                </text>
              </motion.g>

              {/* --- The Lines (Layer 2) --- */}
              
              {/* Green Line (Value) */}
              <motion.path
                d={greenPath}
                fill="none"
                stroke="#2D5A27"
                strokeWidth="8"
                strokeLinecap="round"
                style={{ pathLength: greenPathLength }}
              />

              {/* Red Line (Cost) */}
              <motion.path
                d={redPath}
                fill="none"
                stroke="#A3332D"
                strokeWidth="8"
                strokeLinecap="round"
                style={{ pathLength: redPathLength }}
              />

              {/* --- The Trap Marker (Layer 3) --- */}
              <motion.g style={{ opacity: markerOpacity }}>
                {/* Vertical Dashed Line */}
                <line 
                  x1={intersectionX} 
                  y1={padding} 
                  x2={intersectionX} 
                  y2={height - padding} 
                  stroke="#A3332D" 
                  strokeWidth="3" 
                  strokeDasharray="16 16" 
                />
                
                {/* Label */}
                <text 
                  x={intersectionX + 25} 
                  y={height * 0.45} 
                  className="font-['Instrument_Serif',serif] text-5xl fill-[#A3332D] font-bold"
                >
                  THE TRAP
                </text>
              </motion.g>

            </svg>

            {/* Legend Box - Extracted from SVG to HTML to prevent distortion */}
            <motion.div 
                style={{ opacity: markerOpacity }}
                className="absolute top-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-gray-100 shadow-xl text-sm font-['JetBrains_Mono',monospace]"
            >
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-4 h-4 rounded-full bg-[#2D5A27] shadow-sm shrink-0"></div>
                    <span className="text-[#1A1A1A]/90 font-medium tracking-tight">Perceived Value</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full bg-[#A3332D] shadow-sm shrink-0"></div>
                    <span className="text-[#1A1A1A]/90 font-medium tracking-tight">Hidden Cost</span>
                </div>
            </motion.div>
          </div>
        </div>

      </div>
      </div>
    </>
  );
};

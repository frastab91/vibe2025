import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

// Heatmap Grid Component
const Heatmap = ({ opacity }: { opacity: MotionValue<number> }) => {
  // 53 weeks x 7 days
  const cells = useMemo(() => Array.from({ length: 53 * 7 }), []);
  
  return (
    <motion.div 
      style={{ opacity }}
      className="grid grid-flow-col grid-rows-7 gap-1 w-full max-w-4xl mx-auto"
    >
      {cells.map((_, i) => {
        // Random opacity for "activity" simulation
        const cellOpacity = Math.random() * 0.9 + 0.1;
        return (
          <div
            key={i}
            className="w-2 h-2 rounded-[1px] bg-[#2D5A27]"
            style={{ opacity: cellOpacity }}
          />
        );
      })}
    </motion.div>
  );
};

export const PersonalExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Animation Stages ---

  // 1. Heatmap Reveal (0% - 30%)
  const heatmapOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.3, 0.6], [0, 1, 1, 0.5]);
  const heatmapY = useTransform(scrollYProgress, [0.05, 0.25], [50, 0]);

  // 2. Data Transformation (30% - 60%)
  // Title fade out
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0.3, 0.4], [0, -20]);
  
  // Subtitle fade in
  const subtitleOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.4, 0.5], [20, 0]);

  // 3. Narrative Reveal (60% - 80%)
  const narrativeOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const narrativeY = useTransform(scrollYProgress, [0.6, 0.7], [20, 0]);

  // 4. Vibe Trap Exit (80% - 100%)
  // Main content moves up
  const mainContentY = useTransform(scrollYProgress, [0.8, 1], [0, -1000]);
  const mainContentOpacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

  // Red text reveal
  const warningOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  
  // Typewriter effect logic
  // We map the scroll range 0.8 -> 1.0 to the character length of the string
  const warningText = "But what happens when your always-on copilot doesn't challenge your assumptions? That's when the Vibe Trap takes hold.";
  const textProgress = useTransform(scrollYProgress, [0.85, 1], [0, warningText.length]);
  
  return (
    <div ref={containerRef} className="h-[300vh] relative bg-[#F9F9F7]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* Main Content Group */}
        <motion.div 
            style={{ y: mainContentY, opacity: mainContentOpacity }}
            className="flex flex-col items-center justify-center w-full max-w-5xl space-y-12"
        >
            {/* Morphing Title Area */}
            <div className="relative h-24 w-full flex items-center justify-center">
                {/* Initial Title */}
                <motion.h2 
                    style={{ opacity: titleOpacity, y: titleY }}
                    className="absolute text-6xl md:text-8xl font-['Instrument_Serif',serif] text-[#1A1A1A] text-center leading-none"
                >
                    521 Contributions
                </motion.h2>

                {/* Transformed Title */}
                <motion.h2 
                    style={{ opacity: subtitleOpacity, y: subtitleY }}
                    className="absolute text-4xl md:text-6xl font-['JetBrains_Mono',monospace] text-[#1A1A1A] text-center"
                >
                    across 43 repositories
                </motion.h2>
            </div>

            {/* Heatmap */}
            <motion.div style={{ y: heatmapY }}>
                <Heatmap opacity={heatmapOpacity} />
            </motion.div>

            {/* Narrative Paragraph */}
            <motion.p 
                style={{ opacity: narrativeOpacity, y: narrativeY }}
                className="max-w-2xl text-center text-xl md:text-2xl font-serif text-[#1A1A1A] leading-relaxed"
            >
                "From fleeting idea to functional prototype. Each square represents a day where the line between product management and engineering blurred, powered by a 24/7 AI-driven copilot."
            </motion.p>
        </motion.div>

        {/* The Vibe Trap (Red Text) - Revealed behind/after */}
        <motion.div 
            style={{ opacity: warningOpacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none p-12"
        >
            <div className="max-w-3xl text-3xl md:text-5xl font-['JetBrains_Mono',monospace] text-[#A3332D] leading-tight text-center">
               <TypewriterText text={warningText} progress={textProgress} />
            </div>
        </motion.div>

      </div>
    </div>
  );
};

// Helper component for the typewriter effect linked to scroll
const TypewriterText = ({ text, progress }: { text: string; progress: MotionValue<number> }) => {
    // We can't simply render a substring because MotionValue is not a state.
    // We need to trigger re-renders or use a canvas/ref approach. 
    // However, for this specific effect, we can just render all chars and control opacity.
    
    // Splitting ensures we have individual control
    const chars = text.split("");
    
    return (
        <span className="inline-block">
            {chars.map((char, i) => (
                <Char key={i} char={char} index={i} progress={progress} />
            ))}
            <motion.span 
                className="inline-block w-[1ch] h-[1em] bg-[#A3332D] align-middle ml-1 animate-pulse" 
            />
        </span>
    );
};

const Char = ({ char, index, progress }: { char: string, index: number, progress: MotionValue<number> }) => {
    const opacity = useTransform(progress, [index, index + 1], [0, 1]);
    return <motion.span style={{ opacity }}>{char}</motion.span>;
}

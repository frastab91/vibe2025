import { motion } from "motion/react";

export const GlitchDivider = () => {
  // Generate random glitch points for the center waveform
  const generateGlitchPath = () => {
    const centerX = 50; // Center percentage
    const glitchWidth = 8; // Width percentage (~100px at 1200px viewport)
    const startX = centerX - glitchWidth / 2;
    const endX = centerX + glitchWidth / 2;
    const segments = 12; // Number of jagged segments
    
    let path = `M ${startX}% 50%`;
    
    for (let i = 1; i <= segments; i++) {
      const x = startX + (glitchWidth / segments) * i;
      const y = 50 + (Math.random() - 0.5) * 60; // Random Y between 20% and 80%
      path += ` L ${x}% ${y}%`;
    }
    
    return path;
  };

  const glitchPath = generateGlitchPath();
  const glitchPath2 = generateGlitchPath(); // Second path for multi-layer glitch
  const glitchPath3 = generateGlitchPath(); // Third path for depth

  return (
    <div className="w-full py-24 bg-[#F9F9F7] flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl px-6">
        <svg
          viewBox="0 0 100 4"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-10"
        >
          {/* Left Line - Clean Editorial */}
          <motion.line
            x1="0"
            y1="50%"
            x2="42%"
            y2="50%"
            stroke="#E5E5E5"
            strokeWidth="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          />

          {/* Right Line - Clean Editorial */}
          <motion.line
            x1="58%"
            y1="50%"
            x2="100"
            y2="50%"
            stroke="#E5E5E5"
            strokeWidth="0.15"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          />

          {/* Center Glitch - Layer 1 (Background) */}
          <motion.path
            d={glitchPath3}
            fill="none"
            stroke="#A3332D"
            strokeWidth="0.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ 
              pathLength: 1, 
              opacity: [0, 0.2, 0.15, 0.2],
            }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              opacity: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
            viewport={{ once: false }}
          />

          {/* Center Glitch - Layer 2 (Mid) */}
          <motion.path
            d={glitchPath2}
            fill="none"
            stroke="#A3332D"
            strokeWidth="0.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ 
              pathLength: 1, 
              opacity: [0, 0.4, 0.3, 0.4],
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut",
              opacity: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.2
              }
            }}
            viewport={{ once: false }}
          />

          {/* Center Glitch - Layer 3 (Foreground) */}
          <motion.path
            d={glitchPath}
            fill="none"
            stroke="#A3332D"
            strokeWidth="0.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ 
              pathLength: 1, 
              opacity: [0, 0.8, 0.6, 0.8],
            }}
            transition={{ 
              duration: 0.9,
              ease: "easeOut",
              opacity: {
                duration: 1.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.4
              }
            }}
            viewport={{ once: false }}
          />

          {/* Subtle vibration on the entire glitch group */}
          <motion.g
            animate={{
              x: [0, -0.1, 0.15, -0.05, 0],
              y: [0, 0.1, -0.1, 0.05, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          >
            {/* Additional glitch artifacts - Small pixelated blocks */}
            <motion.rect
              x="46%"
              y="40%"
              width="0.8"
              height="0.8"
              fill="#A3332D"
              opacity="0.6"
              animate={{
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            />
            <motion.rect
              x="52%"
              y="45%"
              width="0.6"
              height="0.6"
              fill="#A3332D"
              opacity="0.5"
              animate={{
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.3
              }}
            />
            <motion.rect
              x="49%"
              y="52%"
              width="0.7"
              height="0.7"
              fill="#A3332D"
              opacity="0.4"
              animate={{
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 0.6
              }}
            />
          </motion.g>
        </svg>
      </div>
    </div>
  );
};

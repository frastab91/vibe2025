import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react";

const PLATFORMS = [
  { name: "Lovable", color: "bg-blue-500", startX: "-100vw", startY: "20vh", delay: 0 },
  { name: "Replit", color: "bg-orange-500", startX: "100vw", startY: "-10vh", delay: 0.1 },
  { name: "v0", color: "bg-black", startX: "-80vw", startY: "-40vh", delay: 0.2 },
  { name: "Bolt.new", color: "bg-yellow-400 text-black", startX: "80vw", startY: "40vh", delay: 0.05 },
  { name: "Base44", color: "bg-purple-600", startX: "-20vw", startY: "80vh", delay: 0.15 },
  { name: "GitHub Copilot", color: "bg-gray-800", startX: "50vw", startY: "-80vh", delay: 0.25 },
];

const Brick = ({
  index,
  total,
  scrollProgress,
}: {
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
}) => {
  // Random shatter direction
  const x = useMemo(() => (Math.random() - 0.5) * 500, []);
  const y = useMemo(() => (Math.random() - 0.5) * 500, []);
  const r = useMemo(() => (Math.random() - 0.5) * 360, []);

  // Bricks start shattering around 0.4 progress
  // We stagger the shatter slightly based on index
  const triggerStart = 0.35 + (Math.random() * 0.1); 
  const triggerEnd = triggerStart + 0.2;

  const opacity = useTransform(scrollProgress, [triggerStart, triggerEnd], [1, 0]);
  const translateX = useTransform(scrollProgress, [triggerStart, triggerEnd], [0, x]);
  const translateY = useTransform(scrollProgress, [triggerStart, triggerEnd], [0, y]);
  const rotate = useTransform(scrollProgress, [triggerStart, triggerEnd], [0, r]);
  const scale = useTransform(scrollProgress, [triggerStart, triggerEnd], [1, 0.5]);

  return (
    <motion.div
      style={{ opacity, translateX, translateY, rotate, scale }}
      className="w-full h-full bg-[#E0E0DC] border border-[#D6D6D2] relative"
    >
      {/* Subtle brick texture/detail */}
      <div className="absolute inset-0 opacity-10 bg-repeat bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
    </motion.div>
  );
};

const Projectile = ({
  platform,
  scrollProgress,
}: {
  platform: (typeof PLATFORMS)[0];
  scrollProgress: MotionValue<number>;
}) => {
  // Projectiles fly in from 0 to 0.4
  const x = useTransform(scrollProgress, [0, 0.4], [platform.startX, "0vw"]);
  const y = useTransform(scrollProgress, [0, 0.4], [platform.startY, "0vh"]);
  const scale = useTransform(scrollProgress, [0, 0.4, 0.45], [0.5, 1, 0]); // Disappear on impact
  const opacity = useTransform(scrollProgress, [0, 0.1, 0.4, 0.45], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className={`absolute z-20 px-4 py-2 rounded-full font-['JetBrains_Mono',monospace] font-bold text-sm shadow-xl text-white whitespace-nowrap ${platform.color}`}
    >
      {platform.name}
    </motion.div>
  );
};

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  // Grid configuration
  const rows = 12;
  const cols = 16;
  const bricks = useMemo(() => Array.from({ length: rows * cols }), []);

  // Text reveal animation
  const textOpacity = useTransform(smoothProgress, [0.5, 0.7], [0, 1]);
  const textScale = useTransform(smoothProgress, [0.5, 0.8], [0.8, 1]);
  const textY = useTransform(smoothProgress, [0.5, 0.8], [50, 0]);

  return (
    <div ref={containerRef} className="h-[300vh] relative bg-[#F9F9F7]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* The Wall */}
        <div className="relative w-full max-w-6xl aspect-video grid z-10" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {bricks.map((_, i) => (
            <Brick key={i} index={i} total={bricks.length} scrollProgress={smoothProgress} />
          ))}
          
          {/* Central Impact Glow/Portal (Revealed behind) */}
          <motion.div 
             style={{ opacity: useTransform(smoothProgress, [0.4, 0.6], [0, 1]) }}
             className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
          >
             <div className="w-1/2 h-1/2 bg-gradient-to-r from-[#2D5A27] to-[#A3332D] blur-[100px] opacity-30 rounded-full"></div>
          </motion.div>
        </div>

        {/* Projectiles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          {PLATFORMS.map((p, i) => (
            <Projectile key={p.name} platform={p} scrollProgress={smoothProgress} />
          ))}
        </div>

        {/* Revealed Content */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="absolute z-40 text-center max-w-3xl px-6"
        >
          <h1 className="text-6xl md:text-8xl font-['Instrument_Serif',serif] text-[#1A1A1A] mb-6 leading-tight">
            2025
          </h1>
          <p className="text-xl md:text-3xl font-['Instrument_Serif',serif] italic text-[#1A1A1A]/80 leading-relaxed">
            The year the wall separating <br/>
            <span className="font-bold border-b-2 border-[#A3332D]">Idea</span> and <span className="font-bold border-b-2 border-[#2D5A27]">App</span> vanished.
          </p>
        </motion.div>

        <motion.div 
            style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#1A1A1A]/50 animate-bounce font-['JetBrains_Mono',monospace] text-sm"
        >
            ↓ Scroll to Break
        </motion.div>
      </div>
    </div>
  );
};

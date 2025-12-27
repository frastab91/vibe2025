import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

const LessonItem = ({
  number,
  title,
  body,
  opacity,
  y,
  scale,
}: {
  number: string;
  title: string;
  body: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="border-t border-black/10 pt-8"
    >
      <h3 className="font-['Instrument_Serif',serif] text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
        {number} {title}
      </h3>
      <p className="font-['JetBrains_Mono',monospace] text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-2xl">
        {body}
      </p>
    </motion.div>
  );
};

export const LessonsLearnedSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Animation Transforms ---

  // Item 1: 10% - 30%
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.1, 0.3], [20, 0]);
  const scale1 = useTransform(scrollYProgress, [0.1, 0.3], [0.98, 1]);

  // Item 2: 35% - 55%
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.55], [20, 0]);
  const scale2 = useTransform(scrollYProgress, [0.35, 0.55], [0.98, 1]);

  // Item 3: 60% - 80%
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.6, 0.8], [20, 0]);
  const scale3 = useTransform(scrollYProgress, [0.6, 0.8], [0.98, 1]);

  return (
    <>
      {/* 1. Dramatic Editorial Chapter Break (Static) */}
      <section className="bg-[#F9F9F7] py-32 md:py-48 px-6 border-b border-black/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-['Instrument_Serif',serif] text-6xl md:text-9xl font-bold text-[#1A1A1A] leading-[0.9]"
          >
            The Lessons
            <br />
            I Learned
          </motion.h2>
        </div>
      </section>

      {/* 2. Sticky Scrollytelling Container */}
      <div ref={containerRef} className="h-[300vh] relative bg-[#F9F9F7]">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center p-6">
          
          {/* The Card - Pure Content Now */}
          <div className="max-w-3xl w-full p-8 md:p-16 rounded-2xl shadow-sm border border-black/5 bg-white relative">
            
            <div className="space-y-12">
              <LessonItem
                number="01."
                title="Iterate Elsewhere, Execute Here"
                body="Define and iterate prompts in other LLMs, and then insert them in vibe-coding tools."
                opacity={opacity1}
                y={y1}
                scale={scale1}
              />
              
              <LessonItem
                number="02."
                title="Specificity > Detail"
                body="The focus must be on defining highly specific functional behavior over verbose, low-value implementation details."
                opacity={opacity2}
                y={y2}
                scale={scale2}
              />

              <LessonItem
                number="03."
                title="The Nuke Option"
                body="A procedural safeguard: the willingness to discard complex, failing feature branches entirely in favor of a simpler, faster-to-implement alternative."
                opacity={opacity3}
                y={y3}
                scale={scale3}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

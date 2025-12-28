import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    title: "AI Value Chain",
    description: "Sustainability questions & analysis.",
    url: "https://ai-value-chain-equity.vibe-playground.com/",
    image: "/projects/Ai-valuechain.jpeg",
  },
  {
    title: "The Digital Public Infrastructure 101",
    description: "Educational primer on DPI.",
    url: "https://intro-dpi.vibe-playground.com/",
    image: "/projects/DPI.jpeg",
  },
  {
    title: "TraMonti e Mare",
    description: "Our vacation rental in South Italy.",
    url: "https://www.tra-montiemare.it/",
    image: "/projects/tra-montiemare.jpeg",
  },
];

const BrowserCard = ({ project }: { project: typeof PROJECTS[0] }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      // Added 'shrink-0' to prevent squashing
      // 'card-sizing' (defined in <style>) handles the width
      className="card-sizing shrink-0 aspect-video block relative group rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1A1A1A]/30"
    >
      <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col transition-transform duration-300 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        {/* Browser Header */}
        <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200 flex-shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Visit Indicator */}
          <span className="ml-auto flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-1.5 rounded-md transition-all duration-300 group-hover:bg-black group-hover:scale-105 font-['JetBrains_Mono',monospace] text-xs font-medium">
            Visit <ExternalLink size={14} />
          </span>
        </div>

        {/* Image Container */}
        <div className="flex-1 relative bg-gray-50 overflow-hidden min-h-0">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-300 group-hover:bg-black/30" />
          
          {/* Text Content */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-16 pointer-events-none">
            <h3 className="text-2xl md:text-4xl font-['Instrument_Serif',serif] font-bold text-white mb-3 drop-shadow-md">
              {project.title}
            </h3>
            <p className="text-sm md:text-base font-['JetBrains_Mono',monospace] text-white/90 drop-shadow-md max-w-xl">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
};

export const ProjectsShowcaseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // -60% scroll usually aligns the last card well for a 3-card set
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]); 

  return (
    <div className="bg-[#F9F9F7]">

      {/* CSS Injection for robust card sizing */}
      <style>{`
        .card-sizing {
          width: 85vw;
          margin-right: 8vw;
        }
        @media (min-width: 768px) {
          .card-sizing {
            width: 70vw;
            margin-right: 15vw;
          }
        }
        .card-sizing:last-child {
          margin-right: 0;
        }
      `}</style>

      {/* Intro Text */}
      <div className="pt-24 pb-24 px-6 md:px-12 text-center">
        <h2 className="text-5xl md:text-7xl font-['Instrument_Serif',serif] font-bold text-[#1A1A1A] mb-8">
          The Ones That Survived
        </h2>
        <p className="font-['JetBrains_Mono',monospace] text-base md:text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
          I shipped 25+ websites in 2025. 90% are dead. The ones I think are worth sharing are:
        </p>
      </div>

      {/* Scroll Container */}
      <div ref={containerRef} className="h-[300vh] relative">
        
        {/* Sticky Wrapper 
            - sticky top-0: Stays in viewport
            - h-screen: Fills the screen height
            - flex flex-col justify-center: Vertically centers the content
            - py-[12vh]: CRITICAL FIX. Adds 12vh padding to top/bottom to force cards away from edges.
            - bg-[#F9F9F7] + z-20: Ensures this layer covers the intro text below it.
        */}
        <div className="sticky top-0 h-screen flex flex-col justify-center py-[12vh] overflow-hidden bg-[#F9F9F7] z-20">
          
          <motion.div
            style={{ x }}
            // Center the starting position
            className="flex flex-nowrap w-max px-[7.5vw] md:px-[15vw]"
          >
            {PROJECTS.map((project, index) => (
              <BrowserCard key={index} project={project} />
            ))}
          </motion.div>

        </div>
      </div>

      {/* Footer Padding */}
      <div className="h-24 md:h-32"></div>
    </div>
  );
};
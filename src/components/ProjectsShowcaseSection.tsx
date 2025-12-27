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

const BrowserCard = ({ 
  project, 
  isLast 
}: { 
  project: typeof PROJECTS[0], 
  isLast: boolean 
}) => {
  return (
    <div 
      className="flex-none aspect-video h-auto"
      style={{ 
        width: '70vw', 
        minWidth: '70vw',
        marginRight: isLast ? 0 : '15vw' // Hardcoded logic to guarantee spacing
      }}
    >
      <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
        {/* Browser Header */}
        <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200 flex-shrink-0">
          {/* Window Controls */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* Visit Button */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-1.5 rounded-md hover:bg-[#1A1A1A]/90 transition-colors font-['JetBrains_Mono',monospace] text-xs font-medium"
          >
            Visit <ExternalLink size={14} />
          </a>
        </div>

        {/* Image Container */}
        <div className="flex-1 relative bg-gray-50 overflow-hidden min-h-0">
          {/* The Image */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Darkening Layer for Text Contrast */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Info Overlay - Bottom */}
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
    </div>
  );
};

export const ProjectsShowcaseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform vertical scroll to horizontal movement
  // Moving left by 85% ensures we scroll past the first two cards and gaps to see the third one.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]); 

  return (
    <div className="bg-[#F9F9F7]">
      {/* Header Section - Normal Flow */}
      <div className="py-24 px-6 md:px-12 text-center">
        <h2 className="text-5xl md:text-7xl font-['Instrument_Serif',serif] font-bold text-[#1A1A1A] mb-8">
          The Ones That Survived
        </h2>
        <p className="font-['JetBrains_Mono',monospace] text-base md:text-lg text-[#1A1A1A]/70 max-w-3xl mx-auto leading-relaxed">
          I shipped 25+ websites in 2025. 90% are dead. The ones I think are worth sharing are:
        </p>
      </div>

      {/* Desktop: Horizontal Scroll Section */}
      <div className="hidden md:block">
        <div ref={containerRef} className="h-[300vh] relative">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.div
              style={{ x, paddingLeft: '15vw' }} // Padding to center the first card initially
              className="flex w-max"
            >
              {PROJECTS.map((project, index) => (
                <BrowserCard 
                  key={index} 
                  project={project} 
                  isLast={index === PROJECTS.length - 1} 
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Stack */}
      <div className="md:hidden py-8 space-y-12">
        {PROJECTS.map((project, index) => (
          <div key={index} className="w-full px-4">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 aspect-video flex flex-col">
              {/* Browser Header */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200 flex-shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-2 bg-[#1A1A1A] text-white px-3 py-1.5 rounded-md text-xs font-['JetBrains_Mono',monospace]"
                >
                  Visit <ExternalLink size={12} />
                </a>
              </div>

              {/* Content */}
              <div className="flex-1 relative bg-gray-50 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-12 pointer-events-none">
                  <h3 className="text-2xl font-['Instrument_Serif',serif] font-bold text-white mb-2 drop-shadow-md">
                    {project.title}
                  </h3>
                  <p className="text-xs font-['JetBrains_Mono',monospace] text-white/90 drop-shadow-md">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Padding */}
      <div className="h-24 md:h-32"></div>
    </div>
  );
};
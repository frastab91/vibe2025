import { motion } from "motion/react";
import { FlaskConical, GitPullRequest, Zap, ArrowRight, ArrowDown } from "lucide-react";

const WorkflowCard = ({ 
  icon: Icon, 
  title, 
  body, 
  step,
  themeClasses 
}: { 
  icon: any, 
  title: string, 
  body: string, 
  step: string,
  themeClasses: string
}) => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      className={`relative flex-1 flex flex-col items-start p-8 rounded-xl border-2 ${themeClasses} shadow-sm backdrop-blur-sm h-full`}
    >
      <div className="absolute top-4 right-4 font-['JetBrains_Mono',monospace] text-xs font-bold opacity-60 uppercase tracking-widest">
        Step {step}
      </div>
      
      <div className="mb-6 p-3 rounded-lg bg-white/50 w-fit">
        <Icon size={32} strokeWidth={1.5} />
      </div>
      
      <h3 className="font-['Instrument_Serif',serif] text-2xl font-bold mb-3">
        {title}
      </h3>
      
      <p className="font-sans text-sm md:text-base opacity-90 leading-relaxed">
        {body}
      </p>
    </motion.div>
  );
};

const ArrowConnector = () => {
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
      }}
      className="flex items-center justify-center text-gray-400 shrink-0 z-10"
    >
      <div className="hidden md:block">
        <ArrowRight size={32} strokeWidth={2} />
      </div>
      <div className="block md:hidden py-4">
        <ArrowDown size={32} strokeWidth={2} />
      </div>
    </motion.div>
  );
};

export const WorkflowSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#F9F9F7] px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-['Instrument_Serif',serif] text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            The Quality Pipeline
          </h2>
          <p className="font-['JetBrains_Mono',monospace] text-[#4A4A4A] text-sm md:text-base tracking-tight max-w-2xl mx-auto">
            MY WORKFLOW APPROACH TO MINIMIZE FRUSTRATION AND COST
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="flex flex-col md:flex-row items-center md:items-stretch gap-0 md:gap-4"
        >
          {/* Step 1 */}
          <WorkflowCard 
            step="01"
            icon={FlaskConical}
            title="Drafting & Hardening"
            body="Architectural experimentation in a flat LLM space. Focus on logic and recursive self-correction without execution constraints."
            themeClasses="border-blue-900/10 bg-blue-50/40 text-blue-900"
          />

          <ArrowConnector />

          {/* Step 2 */}
          <WorkflowCard 
            step="02"
            icon={GitPullRequest}
            title="External Validation"
            body="Independent audit to prevent the 'echo chamber' effect. Hardened logic is critiqued by a separate model for edge cases."
            themeClasses="border-purple-900/10 bg-purple-50/40 text-purple-900"
          />

          <ArrowConnector />

          {/* Step 3 */}
          <WorkflowCard 
            step="03"
            icon={Zap}
            title="Execution / Injection"
            body="Non-negotiable finality. Pre-validated code is injected for instant execution. Zero architectural failures expected."
            themeClasses="border-[#2D5A27]/20 bg-[#2D5A27]/5 text-[#2D5A27]"
          />

        </motion.div>

      </div>
    </section>
  );
};

import { FontLoader } from "./components/FontLoader";
import { HeroSection } from "./components/HeroSection";
import { PersonalExperienceSection } from "./components/PersonalExperienceSection";
import { VibeTrapSection } from "./components/VibeTrapSection";
import { WorkflowSection } from "./components/WorkflowSection";
import { LessonsLearnedSection } from "./components/LessonsLearnedSection";
import { MobileDisclaimerModal } from "./components/MobileDisclaimerModal";
import { TopNavigation } from "./components/TopNavigation";
import { OutroSection } from "./components/OutroSection";

export default function App() {
  return (
    <div className="bg-[#F9F9F7] min-h-screen text-[#1A1A1A]">
      <FontLoader />
      <TopNavigation />
      <MobileDisclaimerModal />
      <HeroSection />
      <PersonalExperienceSection />
      <VibeTrapSection />
      <LessonsLearnedSection />
      <WorkflowSection />
      <OutroSection />
    </div>
  );
}

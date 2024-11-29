import Image from "next/image";
import Header from "@/components/layout/Header";
import HowItWorksSection from "@/components/features/HowItWorksSection";
import HeroSection from "@/components/features/HeroSection";
import ConversationStarterScreen from "@/components/features/ConversationStarterScreen";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory">
      <div className="min-h-screen flex flex-col snap-start">
        <header className="flex justify-center items-center py-4">
          <Header />
        </header>
        <main className="flex flex-col flex-grow items-center justify-start p-4 md:p-8 lg:p-20">
          <HeroSection />
          <HowItWorksSection />
        </main>
      </div>
      <div className="min-h-screen snap-start">
        <ConversationStarterScreen />
      </div>
    </div>
  );
}
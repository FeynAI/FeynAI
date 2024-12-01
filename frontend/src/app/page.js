// import Image from "next/image";
// import Header from "@/components/layout/Header";
// import HowItWorksSection from "@/components/features/HowItWorksSection";
// import HeroSection from "@/components/features/HeroSection";
// import ConversationStarterScreen from "@/components/features/ConversationStarterScreen";

// export default function Home() {
//   return (
//     <div className="snap-y snap-mandatory">
//       <div className="min-h-screen flex flex-col snap-start">
//         <header className="flex justify-center items-center py-4">
//           <Header />
//         </header>
//         <main className="flex flex-col flex-grow items-center justify-start p-4 md:p-8 lg:p-20">
//           <HeroSection />
//           <HowItWorksSection />
//         </main>
//       </div>
//       <div className="min-h-screen snap-start">
//         <ConversationStarterScreen />
//       </div>
//     </div>
//   );
// }

// src/app/page.js

// export default function Home() {
//   return (
//     <div
//       className="h-screen flex flex-col items-center justify-center"
//       style={{
//         background: "linear-gradient(to bottom, #FFFFFF 0%, #E3F2FF 100%)",
//       }}
//     >
//       {/* Logo and Title */}
//       <div className="flex items-center mb-4">
//         <img src="/logo.png" alt="FeynAI Logo" className="w-16 h-16 mr-2" />
//         <h1
//           style={{
//             fontFamily: "'Plus Jakarta Sans', sans-serif",
//             fontWeight: 800,
//             fontSize: "45px",
//             lineHeight: "57px",
//             letterSpacing: "-0.013em",
//             color: "#1E293B",
//           }}
//         >
//           FeynAI
//         </h1>
//       </div>

//       {/* Subtitle */}
//       <p
//         className="text-center mb-10"
//         style={{
//           fontFamily: "'Plus Jakarta Sans', sans-serif",
//           fontWeight: 100,
//           fontSize: "17px",
//           color: "#1E293B",
//         }}
//       >
//         Log in with your FeynAI account to continue
//       </p>

//       {/* Buttons */}
//       <div className="flex space-x-4">
//         <a href="/login">
//           <button
//             className="rounded-lg hover:opacity-90"
//             style={{
//               width: "80px",
//               height: "45px",
//               backgroundColor: "#0065BD",
//               color: "#FFFFFF",
//               fontFamily: "'Manrope', sans-serif",
//               fontWeight: "bold",
//               fontSize: "16px",
//             }}
//           >
//             Log in
//           </button>
//         </a>

//         <a href="/signup">
//           <button
//             className="rounded-lg hover:opacity-90"
//             style={{
//               width: "96px",
//               height: "45px",
//               backgroundColor: "#ABABAB",
//               color: "#FFFFFF",
//               fontFamily: "'Manrope', sans-serif",
//               fontWeight: "bold",
//               fontSize: "16px",
//             }}
//           >
//             Sign up
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// }

// src/app/page.js
import Header from "@/components/layout/Header";
import HowItWorksSection from "@/components/features/HowItWorksSection";
import HeroSection from "@/components/features/HeroSection";
import { StartScreen } from "./start/page";

export default function Home() {
  return (
    <div
      className="snap-y snap-mandatory"
      style={{
        background: "linear-gradient(to bottom, #FFFFFF 0%, #E3F2FF 100%)",
      }}
    >
      <div className="min-h-screen flex flex-col snap-start">
        <header className="flex justify-center items-center py-4 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
          <Header />
        </header>
        <main className="flex flex-col flex-grow items-center justify-start p-4 md:p-8 lg:p-20">
          <HeroSection />
          <HowItWorksSection />
        </main>
      </div>
      <div className="min-h-screen snap-start">
        {/* <StartScreen /> */}
      </div>
    </div>
  );
}
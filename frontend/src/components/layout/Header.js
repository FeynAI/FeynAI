import Link from 'next/link';
import Button from "@/components/ui/Button";

export default function Header() {
  return (
    <header className="w-full max-w-[1440px] px-4 md:px-6 lg:px-8 relative flex items-center justify-between">
      {/* Logo and title */}
      <div className="flex items-center">
        <img src="/images/logo.png" alt="FeynAI Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "#1E293B"
          }}>
          Feyn
        </h1>
      </div>

      {/* Tagline - hidden on mobile */}
      <p className="hidden md:block text-sm md:text-base lg:text-lg text-gray-600 absolute left-1/2 transform -translate-x-1/2">
        "If you want to master something, teach it."
      </p>

      {/* Auth buttons */}
      <div className="mt-6 xl:mt-0 xl:absolute xl:right-8">
        <Button
          className="bg-[#e5e2df] hover:bg-[#d8d5d2] text-black font-normal py-2 px-8 rounded-lg transition-colors duration-200 text-sm md:text-base w-fit"
        >
          Meet Feyn
        </Button>
      </div>
    </header>
  );
}
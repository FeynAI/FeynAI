import Button from "@/components/ui/Button";

// Header reusable component.
// Header.js
export default function Header() {
  return (
    <header className="w-full max-w-[1440px] px-4 md:px-6 lg:px-8 relative flex flex-col items-center">
      {/* Center text container */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Feyn
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-gray-600 mt-1">
          "If you want to master something, teach it."
        </p>
      </div>
      
      {/* Button - underneath on mobile and tablet, right-aligned only on desktop */}
      <div className="mt-6 xl:mt-0 xl:absolute xl:right-8">
        <Button className="bg-[#e5e2df] hover:bg-[#d8d5d2] text-black font-normal py-2 px-8 rounded-lg transition-colors duration-200 text-sm md:text-base w-fit">
          Meet Feyn
        </Button>
      </div>
    </header>
  );
}
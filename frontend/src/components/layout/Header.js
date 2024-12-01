import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full max-w-[1440px] px-4 md:px-6 lg:px-8 relative flex items-center justify-between">
      {/* Logo and title */}
      <div className="flex items-center">
        <img src="/logo.png" alt="FeynAI Logo" className="w-8 h-8 mr-2" />
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
      <div className="flex space-x-4">
        <Link href="/login">
          <button
            className="rounded-lg hover:opacity-90 px-6 py-2"
            style={{
              backgroundColor: "#0065BD",
              color: "#FFFFFF",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Log in
          </button>
        </Link>
        <Link href="/signup">
          <button
            className="rounded-lg hover:opacity-90 px-6 py-2"
            style={{
              backgroundColor: "#ABABAB",
              color: "#FFFFFF",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Sign up
          </button>
        </Link>
      </div>
    </header>
  );
}
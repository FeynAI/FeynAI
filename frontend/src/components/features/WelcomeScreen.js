import Image from "next/image";

export default function WelcomePage() {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #FFFFFF 0%, #E3F2FF 100%)",
      }}
    >
      {/* Logo and Title */}
      <div className="flex items-center mb-4">
        <Image
          src="/logo.png"
          alt="FeynAI Logo"
          className="w-16 h-16 mr-2"
        />
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: "45px",
            lineHeight: "57px",
            letterSpacing: "-0.013em",
            color: "#1E293B",
          }}
        >
          FeynAI
        </h1>
      </div>

      {/* Subtitle */}
      <p
        className="text-center mb-10"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 100,
          fontSize: "17px",
          color: "#1E293B",
        }}
      >
        Log in with your FeynAI account to continue
      </p>

      {/* Buttons */}
      <div className="flex space-x-4">
        {/* Login Button */}
        <a href="/login">
          <button
            className="rounded-lg hover:opacity-90"
            style={{
              width: "80px",
              height: "45px",
              backgroundColor: "#0065BD",
              color: "#FFFFFF",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Log in
          </button>
        </a>

        {/* Signup Button */}
        <a href="/signup">
          <button
            className="rounded-lg hover:opacity-90"
            style={{
              width: "96px",
              height: "45px",
              backgroundColor: "#ABABAB",
              color: "#FFFFFF",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Sign up
          </button>
        </a>
      </div>
    </div>
  );
}

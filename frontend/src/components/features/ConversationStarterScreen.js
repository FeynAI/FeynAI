import Image from "next/image";
import Link from "next/link";

// Initial introduction screen featuring Feyn's character and invitation to start explaining.
export default function ConversationStarterScreen() {
  return (
    <div
      id="conversation-starter"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="flex items-start gap-16">
        <div className="relative w-[600px] h-[600px]">
          <Image
            src="/images/feyn1.png"
            alt="Feyn character"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col justify-between h-[600px]">
          <h1 className="text-7xl font-semibold w-[600px] text-center">
            Hi, I'm Feyn. I'm 12 years old and I love learning. I'm here to help you learn too!
          </h1>

          {/* Centering the buttons */}
          <div className="w-[600px] flex flex-col items-center">
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
          </div>
        </div>
      </div>
    </div>
  );
}

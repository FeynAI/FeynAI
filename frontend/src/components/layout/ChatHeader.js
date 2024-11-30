// src/components/layout/ChatHeader.js
export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      {/* Left side - Logo */}
      <div className="flex items-center">
        <span className="text-xl font-semibold">FeynAI</span>
      </div>

      {/* Right side - Theme & Icons */}
      <div className="flex items-center gap-4">
        <button className="p-2">🌤️</button>
        <button className="p-2">🌙</button>
        <button className="p-2">🏠</button>
        <button className="p-2">👤</button>
      </div>
    </header>
  );
}
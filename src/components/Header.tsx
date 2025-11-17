export default function Header() {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main content - Logos on sides, text in center */}
        <div className="flex items-center justify-between px-8 md:px-16">
          {/* 3MT Logo - Left side */}
          <div className="flex items-center">
            <img 
              src="/3mt-logo.jpg" 
              alt="3MT Logo" 
              className="h-14 w-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* 2025 Leaderboard - Centered */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold text-white text-shadow">
              2025 Leaderboard
            </h1>
            <p className="text-sm text-white opacity-80 mt-1">
              Three Minute Thesis Competition
            </p>
          </div>

          {/* CGLL Logo - Right side */}
          <div className="flex items-center">
            <img 
              src="/cgll-logo.png" 
              alt="Center for Graduate Life & Learning" 
              className="h-16 w-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </header>
  );
}


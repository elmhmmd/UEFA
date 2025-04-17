import MatchList from "@/components/match-list"

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black mb-4 glitch-effect uppercase tracking-wider" data-text="CHAMPIONS LEAGUE">
            CHAMPIONS LEAGUE
          </h1>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[rgb(var(--neon-pink))]"></div>
            <p className="text-xl font-bold text-[rgb(var(--neon-blue))]">QUARTER FINALS</p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[rgb(var(--neon-pink))]"></div>
          </div>
          <p className="text-gray-400 italic">2023/2024</p>
        </header>
        <MatchList />
      </div>
    </main>
  )
}

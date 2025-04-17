"use client"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Fixture } from "@/types/match" // Use Fixture type
import { Trophy, Zap } from "lucide-react"
import Image from 'next/image'; // Import Next Image

interface MatchCardProps {
  match: Fixture // Use Fixture type
}

export default function MatchCard({ match }: MatchCardProps) {
  const homeTeam = match.teams.home
  const awayTeam = match.teams.away
  // Use goals directly, handle null case (for upcoming matches)
  const homeScore = match.goals.home ?? '-'
  const awayScore = match.goals.away ?? '-'
  // Use fixture status
  const status = match.fixture.status.long
  const isFinished = match.fixture.status.short === "FT" || match.fixture.status.short === "AET" || match.fixture.status.short === "PEN";
  const isUpcoming = match.fixture.status.short === "NS";

  // Placeholder for Man of the Match - API-Football requires separate call or include=events
  // For now, we'll hide this section or show a placeholder if needed.
  const manOfTheMatch = undefined; // Example: Assume not fetched initially

  return (
    <Link href={`/match/${match.fixture.id}`}>
      <div className="cyberpunk-card rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(var(--neon-blue),0.4)]">
        <div className="bg-gradient-to-r from-[rgba(var(--neon-blue),0.2)] to-[rgba(var(--neon-pink),0.2)] p-3 border-b border-[rgba(var(--neon-blue),0.3)]">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-300 flex items-center">
              <Zap className="w-3 h-3 mr-1 text-[rgb(var(--neon-yellow))]" />
              {/* Use fixture timestamp */}
              {formatDate(match.fixture.timestamp)}
            </span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                isFinished
                  ? "bg-[rgba(var(--neon-green),0.15)] text-[rgb(var(--neon-green))]"
                  : isUpcoming
                  ? "bg-[rgba(var(--neon-yellow),0.15)] text-[rgb(var(--neon-yellow))]"
                  : "bg-[rgba(var(--neon-blue),0.15)] text-[rgb(var(--neon-blue))]"
              }`}
            >
              {/* Use short status */}
              {match.fixture.status.short}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-center mb-4 text-gray-400 uppercase tracking-wider">
            {/* Use league name and round */}
            {match.league.name} • {match.league.round}
          </div>

          <div className="flex items-center justify-between mb-6">
            {/* Home Team */}
            <div className="flex items-center flex-1">
              <div className="w-12 h-12 relative mr-4 flex items-center justify-center rounded-md bg-[rgba(var(--card-bg),0.5)] border border-[rgba(var(--neon-pink),0.3)]">
                {homeTeam.logo ? (
                     <Image src={homeTeam.logo} alt={`${homeTeam.name} logo`} width={36} height={36} className="object-contain" unoptimized/>
                ) : (
                     <span className="font-bold text-sm neon-text-pink">
                       {homeTeam.name.substring(0, 3).toUpperCase()}
                     </span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{homeTeam.name}</h3>
                {/* API-Football doesn't provide country directly in teams node */}
                {/* <p className="text-xs text-gray-400">{homeTeam.country?.name}</p> */}
              </div>
            </div>

            {/* Score */}
            <div className="px-4 py-2 bg-[rgba(var(--dark-bg),0.7)] rounded-md font-bold text-xl min-w-[60px] text-center border border-[rgba(var(--neon-blue),0.3)] neon-border">
              {isUpcoming ? "VS" : `${homeScore} - ${awayScore}`}
            </div>

            {/* Away Team */}
            <div className="flex items-center flex-1 justify-end text-right">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{awayTeam.name}</h3>
                {/* <p className="text-xs text-gray-400">{awayTeam.country?.name}</p> */}
              </div>
              <div className="w-12 h-12 relative ml-4 flex items-center justify-center rounded-md bg-[rgba(var(--card-bg),0.5)] border border-[rgba(var(--neon-blue),0.3)]">
                 {awayTeam.logo ? (
                     <Image src={awayTeam.logo} alt={`${awayTeam.name} logo`} width={36} height={36} className="object-contain" unoptimized/>
                 ) : (
                      <span className="font-bold text-sm neon-text-blue">
                        {awayTeam.name.substring(0, 3).toUpperCase()}
                      </span>
                 )}
              </div>
            </div>
          </div>

          {/* Man of the Match - Removed for now */}
          {/* {manOfTheMatch && (
            <div className="flex items-center mt-4 p-3 bg-[rgba(var(--neon-yellow),0.1)] rounded-md border border-[rgba(var(--neon-yellow),0.3)]">
              <Trophy className="w-5 h-5 text-[rgb(var(--neon-yellow))]" />
              <div className="ml-2">
                <span className="text-xs text-[rgb(var(--neon-yellow))] block">Man of the Match</span>
                <span className="font-medium">{manOfTheMatch.name}</span>
              </div>
            </div>
          )} */}

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500 inline-block border-b border-dashed border-gray-700 hover:text-[rgb(var(--neon-blue))] hover:border-[rgb(var(--neon-blue))] transition-colors">
              View match details
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
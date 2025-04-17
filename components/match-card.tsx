"use client"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Match } from "@/types/match"
import { Trophy, Zap } from "lucide-react"

interface MatchCardProps {
  match: Match
}

export default function MatchCard({ match }: MatchCardProps) {
  const homeTeam = match.homeTeam
  const awayTeam = match.awayTeam
  const homeScore = match.homeScore?.current || 0
  const awayScore = match.awayScore?.current || 0
  const status = match.status?.description || "Upcoming"
  const isFinished = match.status?.type === "finished"

  return (
    <Link href={`/match/${match.id}`}>
      <div className="cyberpunk-card rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(var(--neon-blue),0.4)]">
        <div className="bg-gradient-to-r from-[rgba(var(--neon-blue),0.2)] to-[rgba(var(--neon-pink),0.2)] p-3 border-b border-[rgba(var(--neon-blue),0.3)]">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-300 flex items-center">
              <Zap className="w-3 h-3 mr-1 text-[rgb(var(--neon-yellow))]" />
              {formatDate(match.startTimestamp)}
            </span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                isFinished
                  ? "bg-[rgba(var(--neon-green),0.15)] text-[rgb(var(--neon-green))]"
                  : "bg-[rgba(var(--neon-blue),0.15)] text-[rgb(var(--neon-blue))]"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="text-xs text-center mb-4 text-gray-400 uppercase tracking-wider">
            {match.tournament.uniqueTournament?.name || match.tournament.name} •{" "}
            {match.roundInfo?.name || "Quarter Finals"}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center flex-1">
              <div className="w-12 h-12 relative mr-4 flex items-center justify-center rounded-md bg-[rgba(var(--card-bg),0.5)] border border-[rgba(var(--neon-pink),0.3)]">
                <span className="font-bold text-sm neon-text-pink">
                  {homeTeam.nameCode || homeTeam.name.substring(0, 3).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{homeTeam.name}</h3>
                <p className="text-xs text-gray-400">{homeTeam.country?.name}</p>
              </div>
            </div>

            <div className="px-4 py-2 bg-[rgba(var(--dark-bg),0.7)] rounded-md font-bold text-xl min-w-[60px] text-center border border-[rgba(var(--neon-blue),0.3)] neon-border">
              {isFinished ? `${homeScore} - ${awayScore}` : "VS"}
            </div>

            <div className="flex items-center flex-1 justify-end text-right">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{awayTeam.name}</h3>
                <p className="text-xs text-gray-400">{awayTeam.country?.name}</p>
              </div>
              <div className="w-12 h-12 relative ml-4 flex items-center justify-center rounded-md bg-[rgba(var(--card-bg),0.5)] border border-[rgba(var(--neon-blue),0.3)]">
                <span className="font-bold text-sm neon-text-blue">
                  {awayTeam.nameCode || awayTeam.name.substring(0, 3).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {match.manOfTheMatch && (
            <div className="flex items-center mt-4 p-3 bg-[rgba(var(--neon-yellow),0.1)] rounded-md border border-[rgba(var(--neon-yellow),0.3)]">
              <Trophy className="w-5 h-5 text-[rgb(var(--neon-yellow))]" />
              <div className="ml-2">
                <span className="text-xs text-[rgb(var(--neon-yellow))] block">Man of the Match</span>
                <span className="font-medium">{match.manOfTheMatch.name}</span>
              </div>
            </div>
          )}

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

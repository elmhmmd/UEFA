"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useMatchStore } from "@/store/match-store"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Trophy, Clock, MapPin, Zap } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"

export default function MatchDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const matchId = params.id as string

  const { matches, loading, error, fetchMatches } = useMatchStore()

  useEffect(() => {
    if (matches.length === 0) {
      fetchMatches()
    }
  }, [matches.length, fetchMatches])

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center p-8 bg-[rgba(255,0,0,0.1)] rounded-lg border border-red-700">
            <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Match</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const match = matches.find((m) => m.id.toString() === matchId)

  if (!match) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center p-8 cyberpunk-card rounded-lg">
            <h2 className="text-xl font-bold mb-2">Match Not Found</h2>
            <p>The match you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 px-4 py-2 bg-[rgba(var(--neon-blue),0.2)] hover:bg-[rgba(var(--neon-blue),0.3)] rounded-md transition-colors border border-[rgba(var(--neon-blue),0.5)] hover:neon-border"
            >
              Back to Matches
            </button>
          </div>
        </div>
      </div>
    )
  }

  const homeTeam = match.homeTeam
  const awayTeam = match.awayTeam
  const homeScore = match.homeScore?.current || 0
  const awayScore = match.awayScore?.current || 0
  const status = match.status?.description || "Upcoming"
  const isFinished = match.status?.type === "finished"
  const venue = match.venue?.name
  const city = match.venue?.city?.name
  const tournament = match.tournament.uniqueTournament?.name || match.tournament.name
  const round = match.roundInfo?.name || "Quarter Finals"
  const aggregatedScore =
    match.homeScore?.aggregated !== undefined && match.awayScore?.aggregated !== undefined
      ? `${match.homeScore.aggregated} - ${match.awayScore.aggregated}`
      : null

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => router.push("/")}
          className="flex items-center mb-8 px-4 py-2 bg-[rgba(var(--neon-purple),0.2)] hover:bg-[rgba(var(--neon-purple),0.3)] rounded-md transition-colors border border-[rgba(var(--neon-purple),0.5)]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Matches
        </button>

        <div className="cyberpunk-card-alt rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[rgba(var(--neon-purple),0.2)] to-[rgba(var(--neon-pink),0.2)] p-4 border-b border-[rgba(var(--neon-pink),0.3)]">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-300 flex items-center">
                <Clock className="w-4 h-4 mr-1 text-[rgb(var(--neon-pink))]" />
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

          <div className="p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold neon-text-purple mb-1">{tournament}</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[rgb(var(--neon-pink))]"></div>
                <p className="text-gray-400">{round}</p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[rgb(var(--neon-pink))]"></div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-8">
              <div className="flex flex-col items-center text-center md:w-1/3">
                <div className="w-24 h-24 relative mb-4 flex items-center justify-center rounded-md bg-[rgba(var(--card-bg),0.5)] border border-[rgba(var(--neon-pink),0.5)]">
                  <span className="font-bold text-3xl neon-text-pink">
                    {homeTeam.nameCode || homeTeam.name.substring(0, 3).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-2xl mb-1">{homeTeam.name}</h3>
                <p className="text-gray-400 text-sm">{homeTeam.country?.name}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="px-8 py-4 bg-[rgba(var(--dark-bg),0.7)] rounded-md font-bold text-4xl min-w-[140px] text-center mb-3 border border-[rgba(var(--neon-blue),0.5)] neon-border">
                  {isFinished ? `${homeScore} - ${awayScore}` : "VS"}
                </div>

                {aggregatedScore && (
                  <div className="text-sm text-[rgb(var(--neon-yellow))] mt-2 px-3 py-1 bg-[rgba(var(--neon-yellow),0.1)] rounded-md border border-[rgba(var(--neon-yellow),0.3)]">
                    <span>Aggregate: {aggregatedScore}</span>
                  </div>
                )}

                {venue && (
                  <div className="flex items-center text-sm text-gray-400 mt-3">
                    <MapPin className="w-4 h-4 mr-1 text-[rgb(var(--neon-pink))]" />
                    <span>
                      {venue}
                      {city ? `, ${city}` : ""}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center text-center md:w-1/3">
                <div className="w-24 h-24 relative mb-4 flex items-center justify-center rounded-md bg-[rgba(var(--card-bg),0.5)] border border-[rgba(var(--neon-blue),0.5)]">
                  <span className="font-bold text-3xl neon-text-blue">
                    {awayTeam.nameCode || awayTeam.name.substring(0, 3).toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-2xl mb-1">{awayTeam.name}</h3>
                <p className="text-gray-400 text-sm">{awayTeam.country?.name}</p>
              </div>
            </div>

            {match.manOfTheMatch && (
              <div className="flex items-center justify-center mt-8 p-4 bg-[rgba(var(--neon-yellow),0.1)] rounded-md border border-[rgba(var(--neon-yellow),0.3)] max-w-md mx-auto">
                <Trophy className="w-6 h-6 text-[rgb(var(--neon-yellow))] mr-3" />
                <div>
                  <span className="text-sm text-[rgb(var(--neon-yellow))] block">Man of the Match</span>
                  <span className="font-medium text-lg">{match.manOfTheMatch.name}</span>
                </div>
              </div>
            )}

            {/* Additional match statistics could be added here */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[rgba(var(--dark-bg),0.7)] p-4 rounded-md border border-[rgba(var(--neon-pink),0.3)]">
                <h4 className="text-center text-gray-400 text-sm mb-2 uppercase tracking-wider">Tournament</h4>
                <p className="text-center font-medium">{tournament}</p>
                <p className="text-center text-sm text-gray-500">{match.season.name}</p>
              </div>

              <div className="bg-[rgba(var(--dark-bg),0.7)] p-4 rounded-md border border-[rgba(var(--neon-blue),0.3)]">
                <h4 className="text-center text-gray-400 text-sm mb-2 uppercase tracking-wider">Round</h4>
                <p className="text-center font-medium">{round}</p>
              </div>

              <div className="bg-[rgba(var(--dark-bg),0.7)] p-4 rounded-md border border-[rgba(var(--neon-purple),0.3)]">
                <h4 className="text-center text-gray-400 text-sm mb-2 uppercase tracking-wider">Match Time</h4>
                <p className="text-center font-medium flex items-center justify-center">
                  <Zap className="w-4 h-4 mr-1 text-[rgb(var(--neon-yellow))]" />
                  {formatDate(match.startTimestamp)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

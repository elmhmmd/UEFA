"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useMatchStore } from "@/store/match-store"
import { formatDate } from "@/lib/utils"
import { ArrowLeft, Trophy, Clock, MapPin, Zap } from "lucide-react"
import LoadingSpinner from "@/components/loading-spinner"
import Image from "next/image"; // Import Next Image

export default function MatchDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const matchId = params.id as string // Match ID from the URL

  // Use the store which now holds Fixture[] data
  const { matches, loading, error, fetchMatches } = useMatchStore()

  useEffect(() => {
    // Fetch matches if the store is empty
    if (matches.length === 0) {
      fetchMatches()
    }
  }, [matches.length, fetchMatches]) // Depend on matches.length and fetchMatches

  if (loading && matches.length === 0) { // Show loading only if matches aren't loaded yet
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
             <button
              onClick={() => fetchMatches()} // Add a retry button
              className="mt-4 px-4 py-2 bg-[rgba(var(--neon-blue),0.2)] hover:bg-[rgba(var(--neon-blue),0.3)] rounded-md transition-colors border border-[rgba(var(--neon-blue),0.5)] hover:neon-border"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Find the match by fixture.id
  const match = matches.find((m) => m.fixture.id.toString() === matchId)

  if (!match && !loading) { // Only show "Not Found" if not loading and match truly absent
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center p-8 cyberpunk-card rounded-lg">
            <h2 className="text-xl font-bold mb-2">Match Not Found</h2>
            <p>The match you're looking for (ID: {matchId}) doesn't exist in the current list.</p>
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

  // If match found, render details
  if (match) {
      const homeTeam = match.teams.home
      const awayTeam = match.teams.away
      const homeScore = match.goals.home ?? '-'
      const awayScore = match.goals.away ?? '-'
      const status = match.fixture.status.long
      const isFinished = match.fixture.status.short === "FT" || match.fixture.status.short === "AET" || match.fixture.status.short === "PEN";
      const isUpcoming = match.fixture.status.short === "NS";
      const venue = match.fixture.venue.name
      const city = match.fixture.venue.city
      const tournament = match.league.name
      const round = match.league.round
      const seasonYear = match.league.season // e.g., 2024
      const seasonName = `UCL ${seasonYear}/${seasonYear + 1}` // Construct season name

      // Aggregate score isn't directly provided by API-Football in this structure
      // It would typically be available for second-leg matches if requested or calculated
      const aggregatedScore = null; // Placeholder

      // Man of the Match - Placeholder, would require separate fetch/logic
      const manOfTheMatch = undefined;

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
                    {match.fixture.status.short}
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
                  {/* Home Team */}
                  <div className="flex flex-col items-center text-center md:w-1/3">
                     <div className="w-24 h-24 relative mb-4 flex items-center justify-center rounded-md bg-[rgba(var(--card-bg),0.5)] border border-[rgba(var(--neon-pink),0.5)]">
                       {homeTeam.logo ? (
                         <Image src={homeTeam.logo} alt={`${homeTeam.name} logo`} width={64} height={64} className="object-contain" unoptimized/>
                       ) : (
                         <span className="font-bold text-3xl neon-text-pink">
                           {homeTeam.name.substring(0, 3).toUpperCase()}
                         </span>
                       )}
                     </div>
                     <h3 className="font-bold text-2xl mb-1">{homeTeam.name}</h3>
                     {/* <p className="text-gray-400 text-sm">{match.league.country}</p> */}
                   </div>

                  {/* Score/Venue */}
                  <div className="flex flex-col items-center">
                    <div className="px-8 py-4 bg-[rgba(var(--dark-bg),0.7)] rounded-md font-bold text-4xl min-w-[140px] text-center mb-3 border border-[rgba(var(--neon-blue),0.5)] neon-border">
                      {isUpcoming ? "VS" : `${homeScore} - ${awayScore}`}
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

                   {/* Away Team */}
                   <div className="flex flex-col items-center text-center md:w-1/3">
                     <div className="w-24 h-24 relative mb-4 flex items-center justify-center rounded-md bg-[rgba(var(--card-bg),0.5)] border border-[rgba(var(--neon-blue),0.5)]">
                       {awayTeam.logo ? (
                         <Image src={awayTeam.logo} alt={`${awayTeam.name} logo`} width={64} height={64} className="object-contain" unoptimized/>
                       ) : (
                         <span className="font-bold text-3xl neon-text-blue">
                           {awayTeam.name.substring(0, 3).toUpperCase()}
                         </span>
                       )}
                     </div>
                     <h3 className="font-bold text-2xl mb-1">{awayTeam.name}</h3>
                      {/* <p className="text-gray-400 text-sm">{match.league.country}</p> */}
                   </div>
                </div>

                {/* Man of the Match - Placeholder */}
                {/* {manOfTheMatch && (
                  <div className="flex items-center justify-center mt-8 p-4 bg-[rgba(var(--neon-yellow),0.1)] rounded-md border border-[rgba(var(--neon-yellow),0.3)] max-w-md mx-auto">
                    <Trophy className="w-6 h-6 text-[rgb(var(--neon-yellow))] mr-3" />
                    <div>
                      <span className="text-sm text-[rgb(var(--neon-yellow))] block">Man of the Match</span>
                      <span className="font-medium text-lg">{manOfTheMatch.name}</span>
                    </div>
                  </div>
                )} */}

                {/* Additional match statistics */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[rgba(var(--dark-bg),0.7)] p-4 rounded-md border border-[rgba(var(--neon-pink),0.3)]">
                    <h4 className="text-center text-gray-400 text-sm mb-2 uppercase tracking-wider">Tournament</h4>
                    <p className="text-center font-medium">{tournament}</p>
                    <p className="text-center text-sm text-gray-500">{seasonName}</p>
                  </div>

                  <div className="bg-[rgba(var(--dark-bg),0.7)] p-4 rounded-md border border-[rgba(var(--neon-blue),0.3)]">
                    <h4 className="text-center text-gray-400 text-sm mb-2 uppercase tracking-wider">Round</h4>
                    <p className="text-center font-medium">{round}</p>
                  </div>

                  <div className="bg-[rgba(var(--dark-bg),0.7)] p-4 rounded-md border border-[rgba(var(--neon-purple),0.3)]">
                    <h4 className="text-center text-gray-400 text-sm mb-2 uppercase tracking-wider">Status</h4>
                    <p className="text-center font-medium flex items-center justify-center">
                      <Zap className="w-4 h-4 mr-1 text-[rgb(var(--neon-yellow))]" />
                      {status} {match.fixture.status.elapsed ? `(${match.fixture.status.elapsed}')` : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }

  // Fallback if match is not found but still loading (should be rare with current logic)
  return (
      <div className="min-h-screen py-8 px-4">
          <div className="container mx-auto max-w-6xl">
              <LoadingSpinner />
          </div>
      </div>
  );
}
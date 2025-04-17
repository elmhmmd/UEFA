"use client"

import { useEffect } from "react"
import { useMatchStore } from "@/store/match-store"
import MatchCard from "./match-card"
import Pagination from "./pagination"
import LoadingSpinner from "./loading-spinner"

export default function MatchList() {
  const { matches, loading, error, currentPage, fetchMatches } = useMatchStore()

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  // Calculate matches for current page (2 per page)
  const matchesPerPage = 2
  const indexOfLastMatch = currentPage * matchesPerPage
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch)

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-900/20 rounded-lg border border-red-700">
        <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Matches</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div>
      {matches.length === 0 ? (
        <div className="text-center p-8 bg-gray-800/50 rounded-lg">
          <h2 className="text-xl font-bold mb-2">No Matches Found</h2>
          <p>There are no matches available for the selected date.</p>
        </div>
      ) : (
        <>
       
 
       <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
         {currentMatches.map((match) => (
           // Use fixture.id for the key
           <MatchCard key={match.fixture.id} match={match} />
         ))}
       </div>
 
          <Pagination totalMatches={matches.length} matchesPerPage={matchesPerPage} />
        </>
      )}
    </div>
  )
}

// /store/match-store.ts
import { create } from "zustand"
import type { Fixture, MatchStateData } from "@/types/match" // Import the new types

// Use the new MatchStateData interface which uses Fixture[]
export const useMatchStore = create<MatchStateData>((set, get) => ({
  matches: [],
  loading: false,
  error: null,
  currentPage: 1,

  fetchMatches: async () => {
    // Don't fetch if we already have matches and aren't currently loading/erroring
    if (get().matches.length > 0 && !get().loading && !get().error) return

    set({ loading: true, error: null })

    try {
      // Use our proxy API route that now fetches from API-FOOTBALL
      const response = await fetch("/api/matches")

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: `HTTP error ${response.status}` }))
        throw new Error(errorData.error || `Failed to fetch matches: ${response.statusText}`)
      }

      // The API route now returns an array of Fixture objects directly
      const matches: Fixture[] = await response.json()

      // Sort matches by timestamp (optional, but good practice)
      matches.sort((a, b) => a.fixture.timestamp - b.fixture.timestamp)

      set({ matches, loading: false })
    } catch (error) {
      console.error("Error fetching matches:", error)
      set({
        error: error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
        matches: [], // Clear matches on error
      })
    }
  },

  setCurrentPage: (page) => {
    set({ currentPage: page })
  },
}))
import { create } from "zustand"
import type { Match } from "@/types/match"

interface MatchState {
  matches: Match[]
  loading: boolean
  error: string | null
  currentPage: number
  fetchMatches: () => Promise<void>
  setCurrentPage: (page: number) => void
}

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  loading: false,
  error: null,
  currentPage: 1,

  fetchMatches: async () => {
    // Don't fetch if we already have matches
    if (get().matches.length > 0) return

    set({ loading: true, error: null })

    try {
      // Use our proxy API route that now returns mock data
      const response = await fetch("/api/matches")

      if (!response.ok) {
        throw new Error(`Failed to fetch matches: ${response.status}`)
      }

      const data = await response.json()

      // Our API now returns { events: [...matches] }
      const matches = data.events

      set({ matches, loading: false })
    } catch (error) {
      console.error("Error fetching matches:", error)
      set({
        error: error instanceof Error ? error.message : "An unknown error occurred",
        loading: false,
      })
    }
  },

  setCurrentPage: (page) => {
    set({ currentPage: page })
  },
}))

// /types/match.ts

// Main Fixture type from API-FOOTBALL
export interface Fixture {
  fixture: FixtureDetails
  league: LeagueInfo
  teams: {
    home: TeamInfo
    away: TeamInfo
  }
  goals: GoalsInfo
  score: ScoreInfo
  events?: MatchEvent[] // Make events optional as they might not always be present
}

// Sub-interfaces matching API-FOOTBALL structure
export interface FixtureDetails {
  id: number
  referee: string | null
  timezone: string
  date: string // ISO 8601 date string
  timestamp: number // Unix timestamp (seconds)
  periods: {
    first: number | null
    second: number | null
  }
  venue: VenueInfo
  status: StatusInfo
}

export interface LeagueInfo {
  id: number
  name: string
  country: string
  logo: string
  flag: string | null
  season: number // Year (e.g., 2024)
  round: string // e.g., "Quarter-finals"
}

export interface TeamInfo {
  id: number
  name: string
  logo: string
  winner: boolean | null // Indicates if this team won the match
}

export interface GoalsInfo {
  home: number | null // Goals scored by home team
  away: number | null // Goals scored by away team
}

export interface ScoreInfo {
  halftime: GoalsInfo
  fulltime: GoalsInfo
  extratime: GoalsInfo | null
  penalty: GoalsInfo | null
}

export interface VenueInfo {
  id: number | null
  name: string | null
  city: string | null
}

export interface StatusInfo {
  long: string // e.g., "Match Finished", "Not Started"
  short: string // e.g., "FT", "NS"
  elapsed: number | null // Minutes played if live
}

// --- Interfaces for potential future use (like MVP) ---
export interface MatchEvent {
    time: {
        elapsed: number;
        extra: number | null;
    };
    team: {
        id: number;
        name: string;
        logo: string;
    };
    player: PlayerInfo;
    assist: PlayerInfo | null;
    type: string; // e.g., "Goal", "Card", "subst"
    detail: string; // e.g., "Normal Goal", "Yellow Card", "Man of the Match"
    comments: string | null;
    // Specific field for MVP mentioned in API-Football docs (may vary)
    players_of_the_match?: PlayerInfo[]; // Check actual API response for this field
    important?: boolean; // SportMonks uses this, API-Football might use detail === "Man of the Match"
}

export interface PlayerInfo {
    id: number;
    name: string;
}

// --- Interface for the Zustand store state (using the new Fixture type) ---
export interface MatchStateData {
  matches: Fixture[]
  loading: boolean
  error: string | null
  currentPage: number
  fetchMatches: () => Promise<void>
  setCurrentPage: (page: number) => void
}
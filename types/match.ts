export interface Team {
  id: number
  name: string
  slug: string
  shortName: string
  nameCode?: string
  country: {
    name: string
    slug: string
  }
  teamColors?: {
    primary: string
    secondary: string
    text: string
  }
}

export interface Score {
  current: number
  display: number
  period1: number
  period2: number
  normaltime: number
  aggregated?: number
}

export interface Status {
  code: number
  description: string
  type: string
}

export interface Venue {
  id?: number
  name?: string
  capacity?: number
  city?: {
    name: string
    country: string
  }
}

export interface Tournament {
  name: string
  slug: string
  uniqueTournament?: {
    name: string
    slug: string
  }
}

export interface Season {
  name: string
  year: string
}

export interface RoundInfo {
  round: number
  name: string
  cupRoundType?: number
}

export interface Player {
  id: number
  name: string
  teamId: number
}

export interface Match {
  id: number
  slug: string
  homeTeam: Team
  awayTeam: Team
  homeScore?: Score
  awayScore?: Score
  status: Status
  startTimestamp: number
  tournament: Tournament
  season: Season
  roundInfo?: RoundInfo
  venue?: Venue
  winnerCode?: number
  aggregatedWinnerCode?: number
  manOfTheMatch?: Player
}

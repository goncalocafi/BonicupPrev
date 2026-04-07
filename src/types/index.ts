export type Tournament = {
  id: number
  name: string
  location: string
  dates: string
  edition: string
  status: "active" | "finished"
  phase: string
  totalCategories: number
  totalTeams: number
  totalMatches: number
  champion?: string
}

export type Category = {
  id: number
  tournamentId: number
  name: string
  ageGroup: string
  format: "F7" | "F11"
  groups: number
  teams: number
}

export type Team = {
  id: number
  name: string
  countryCode: "PT" | "ES" | "FR" | "EN" | string
  categoryId: number
  group: string
}

export type Match = {
  id: number
  categoryId: number
  group: string | "SF" | "F"         // grupo ou fase eliminatória
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  date: string
  time: string
  venue: string
  phase: "group" | "semi" | "final"
}

export type StandingRow = {
  position: number
  teamName: string
  teamInitials: string
  countryCode: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDiff: number
  points: number
  qualified: boolean
}

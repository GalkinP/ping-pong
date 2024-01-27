import type{ Player } from "../Player/type"


export type Tournament = {
    id: number
    title: string
    description: string
   date: string
   status: boolean
    players: number
    gameType: string
    Players: Player[]
}

export type TournamentId = Tournament['id']
import React from 'react'
import type{ Player } from '../Player/type'
import type{ Tournament } from '../Tournament/type'
import TeamEl from '../Team/TeamEl'

function Game ({teams,tournament}: {teams: Player[][], tournament: Tournament}) : JSX.Element {
  return (
    <div className='game'>{teams.map((team)=> <TeamEl key={team[0].id} players={team} tournament={tournament} />)}</div>
  )
}

export default Game
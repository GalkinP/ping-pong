import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TournamentEl from './TournamentEl'
import type{ RootState } from '../../store/store'
import CreateTournament from './CreateTournament'

function TournamentsPage  () : JSX.Element {
    const tournaments = useSelector((store:RootState) => store.tournaments.tournaments)
    const user = useSelector((store:RootState) => store.user.user)
    const[showForm, setShowForm] = useState(false)



  return (
    <div className='tournamentsPage'>
     {tournaments.map((tournament) => (
        <TournamentEl key={tournament.id} tournament={tournament} />
     ))}
     <br />
     {showForm && <CreateTournament setShowForm={setShowForm}/>}{user && user.isAdmin && <button type='button' onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Create NewTournament'}</button>}
    </div>
  )
}
 
export default TournamentsPage
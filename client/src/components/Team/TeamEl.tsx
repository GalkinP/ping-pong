import React from 'react';
import { useSelector } from 'react-redux';
import PlayerEl from '../Player/PlayerEl';
import type { Tournament } from '../Tournament/type';
import type { Player } from '../Player/type';
import{ useAppDispatch, type RootState } from '../../store/store';


function TeamEl({ players, tournament }: { players: Player[], tournament: Tournament }): JSX.Element {
const dispatch = useAppDispatch();
const admin = useSelector((store: RootState) => store.user.user)?.isAdmin;




function teamStatusFetch(playes: Player[]): void {
  playes.forEach((player: Player) => {
    fetch(`/api/players/${player.id}/isWin`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isWin: !player.isWin }),
    }).then((res) => res.json()).then((data: { message: string }) => {
      if (data.message === 'success') {
        dispatch({ type: 'players/update', payload: player.id });
        dispatch({ type: 'tournaments/players/update', payload: {playerId: player.id , id: tournament.id} });
      }
    }).catch((err) => console.log(err));
  })
}


  return (
    <div className='team' style={{
      backgroundColor: players[0].isWin ? 'rgba(85, 255, 0, 0.5)' : ' rgba(85, 255, 0, 0.1)'
    }}>
      {
        players.map((player: Player) => <PlayerEl key={player.id} player={player} tournament={tournament} />)
      }
      {admin && <button type='button' onClick={() => teamStatusFetch(players)}>⛔</button>}
    </div>
  );
}

export default TeamEl;
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { Player } from './type';
import type { Tournament } from '../Tournament/type';
import { useAppDispatch, type RootState } from '../../store/store';

function PlayerUpdateForm({
  player,tournament}: {player: Player; tournament:Tournament;}): JSX.Element {
  const users = useSelector((store: RootState) => store.users.users);
const dispatch = useAppDispatch();

const[teamId, setTeamId] = useState(player.teamId);
const[playerName, setPlayerName] = useState(player.User.name);

function updatePlayerFetch(e: React.FormEvent<HTMLFormElement>): void {
  e.preventDefault();
  console.log(teamId, playerName);
  fetch(`/api/players/${player.id}/change`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ teamId, playerName }),
  }).then((res) => res.json()).then((data: { message: string, playerN?: Player }) =>{ if(data.playerN){dispatch({type:'tournaments/player/change', payload:{player:data.playerN, id:tournament.id}});
dispatch({type:'players/change', payload:data.playerN})}}).catch((err) => console.log(err));
}



  return (
    <div className="playerUpdateForm">
    <form onSubmit={updatePlayerFetch}>
      <label htmlFor="teamId">New team</label>
      <input type="number" name="teamId" onChange={(e) => setTeamId(Number(e.target.value))} placeholder={player.teamId.toString()} />
  
      <label htmlFor="player">Change on:</label>
      <input name="playerName" list="players" type="text" placeholder={player.User.name} onChange={(e) => setPlayerName(e.target.value)}/>
      <datalist id="players">
        {users.map((user) => (
          <option key={user.id} value={user.name} />
        ))}
      </datalist>
      <button type="submit">✅</button>
    </form>
  </div>
  );
}

export default PlayerUpdateForm;

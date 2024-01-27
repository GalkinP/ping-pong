import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { Player } from './type';
import { useAppDispatch, type RootState } from '../../store/store';
import type { Tournament } from '../Tournament/type';
import PlayerUpdateForm from './PlayerUpdateForm';


function PlayerEl({ player, tournament }: { player: Player; tournament: Tournament }): JSX.Element {
  const admin = useSelector((store: RootState) => store.user.user)?.isAdmin;
  const user = useSelector((store: RootState) => store.users.users).find(
    (el) => el.id === player.userId,
  );
  const dispatch = useAppDispatch();
const use = useSelector((store: RootState) => store.user.user);
  function removalFetch(tourn: Tournament): void {
    if (user) {
      fetch(`/api/players/${tourn.id}/${user.id}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data: { message: string; id: number }) => {
          if (data.message === 'success') {
            dispatch({
              type: 'tournaments/players/remove',
              payload: { playerId: data.id, id: tourn.id },
            });
            dispatch({ type: 'players/remove', payload: data.id });
          }
        })
        .catch((err) => console.log(err));
    }
  }
  if (player) {
    return (
      <div className="playerCard">
        <Link to={use ? `/users/${player.userId}` : `/`}> <h3>{player.User.name}</h3>
        <h3>team {player.teamId}</h3></Link>
       
        {admin && (<> <button type="button" onClick={() => removalFetch(tournament)}>
            remove
          </button>
         <PlayerUpdateForm tournament={tournament} player={player} /></>
         )}{' '}
       
      </div>
    );
  }
  return <div>Loading...</div>;
}

export default PlayerEl;

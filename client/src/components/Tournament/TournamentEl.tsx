import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { Tournament } from './type';
import { useAppDispatch, type RootState } from '../../store/store';
import type { Player } from '../Player/type';

function TournamentEl({ tournament }: { tournament: Tournament }): JSX.Element {
  const formattedDate = new Date(tournament.date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const user = useSelector((store: RootState) => store.user.user);
  const dispatch = useAppDispatch();

  function engageFetch(tourn: Tournament): void {
    if (!user) {
      <Link to="/login">Login</Link>;
    } else {
      fetch(`/api/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tournamentId: tourn.id, userId: user.id }),
      })
        .then((res) => res.json())
        .then((data: { message: string; player?: Player }) => {
          if (data.player) {
            dispatch({ type: 'tournaments/players/add', payload: data.player });
            dispatch({ type: 'players/add', payload: data.player });
          }
        })
        .catch((err) => console.log(err));
    }
  }

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

  function deleteTournamentFetch(tourn: Tournament): void {
    fetch(`/api/tournaments/${tourn.id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data: { message: string }) => {
        if (data.message === 'success') dispatch({ type: 'tournaments/remove', payload: tourn.id });
      })
      .catch((err) => console.log(err));
  }
  

  return (
    <div className="tournamentCard">
      <Link to={`/tournaments/${tournament.id}`}>{tournament.title}</Link>
      <p>{tournament.description}({tournament.gameType})</p>
      <p>
        {' '}
        {formattedDate}year {tournament.Players?.length}/{tournament.players} players
      </p>
      <div className="buttons">
        {' '}
        {user && 
        tournament.Players &&
           tournament.Players.length < tournament.players &&
          tournament.Players.filter((player) => player.userId === user.id).length === 0 && (
            <button type="button" onClick={() => engageFetch(tournament)}>
              engage
            </button>
          )}
        {user &&
          tournament.Players &&
          tournament.Players.find((player: Player) => player.userId === user.id) && (
            <button type="button" onClick={() => removalFetch(tournament)}>
              removal
            </button>
          )}{' '}
        {user && user.isAdmin && (
          <button type="button" onClick={() => deleteTournamentFetch(tournament)}>
            delete
          </button>
        )}
      </div>
    </div>
  );
}

export default TournamentEl;

import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { Tournament } from './type';
import { useAppDispatch, type RootState } from '../../store/store';
import type { Player } from '../Player/type';
import TeamEl from '../Team/TeamEl';

function TournamentPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { tournamentId } = useParams();
  const tournament: Tournament | undefined = useSelector((store: RootState) =>
    store.tournaments.tournaments.find((t: Tournament) => t.id === Number(tournamentId)),
  );

  const players: Player[] = useSelector((store: RootState) => store.players.players)
    .filter((player: Player) => player.tournamentId === +tournamentId!)
    .sort((a: Player, b: Player) => a.teamId - b.teamId);

  const result = players.reduce((acc: Player[][], player) => {
    const lastArray = acc[acc.length - 1];
    if (lastArray && lastArray[0].teamId === player.teamId) {
      lastArray.push(player);
    } else {
      acc.push([player]);
    }
    return acc;
  }, []);

  // const resultForGame = result.reduce((acc, team, index) => {
  //   if (index % 2 === 0) {
  //     acc.push([team, result[index + 1]]);
  //   }
  //   return acc;
  // }, []);

  const user = useSelector((store: RootState) => store.user.user);
  const admin = user?.isAdmin;
  if (!tournament) {
    return <div>Loading...</div>;
  }

  function randomizeTeams(tourn: Tournament): void {
    const arr1 = [...Array(tourn.players / 2).keys()].map((x) => x + 1);
    const arr2 =
      tourn.gameType === '2x2'
        ? [...arr1, ...arr1]
        : [...Array(tourn.players).keys()].map((x) => x + 1);

    for (let i = 0; i < players.length; i += 1) {
      const randomIndex = Math.floor(Math.random() * arr2.length);
      players[i].teamId = arr2[randomIndex];
      arr2.splice(randomIndex, 1);
    }

    players.forEach((player) => {
      fetch(`/api/players/${player.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ teamId: player.teamId }),
      })
        .then((res) => res.json())
        .then((data: { message: string; teamId: number }) => {
          dispatch({
            type: 'tournaments/team/update',
            payload: { teamId: data.teamId, playerId: player.id, id: tourn.id },
          });
        })
        .catch((err) => console.log(err));
    });
  }

  function nextGameFetch(tourn: Tournament): void {
    const playersToRemove = players.filter((player) => player.isWin === false);
    const playersToAvard = players.filter((player) => player.isWin === true);
    playersToAvard.forEach((player) => {
      fetch(`/api/users/${player.userId}/award`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => res.json()).then((data: { message: string; id: number }) => {
          if (data.message === 'success') {
            dispatch({ type: 'users/award', payload: player.userId });
          }
        }).catch((err) => console.log(err));
    })
    playersToRemove.forEach((player) => {
      fetch(`/api/players/${player.id}`, {
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
            dispatch({type:'users/loose', payload: player.userId})
          }
        })
        .catch((err) => console.log(err));
    });
  }

  const formattedDate = new Date(tournament.date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return (
    <div>
      <h3>{tournament.title}</h3>
      <p>{tournament.description}</p>
      <p>
        {' '}
        {formattedDate}year {tournament.players} players, ({tournament.gameType})
      </p>

      <div>
        {result.map((players, i) =>
          i % 2 === 0 ? (
            <>
              <div className="divider" data-id={(i + 2) / 2}>
                game{(i + 2) / 2}
              </div>
              <TeamEl players={players} tournament={tournament} key={players[0].id} />
            </>
          ) : (
            <>
              <div className="vs">
                <img
                  src="../src/img/people.png"
                  alt=""
                />
              </div>
              <TeamEl players={players} tournament={tournament} key={players[0].id} />
            </>
          ),
        )}
      </div>
      {admin && players.length > 2 && (
        <>
          {' '}
          <button type="button" onClick={() => randomizeTeams(tournament)}>
            randomize teams
          </button>
          <button type="button" onClick={() => nextGameFetch(tournament)}>
            next level
          </button>
        </>
      )}
    </div>
  );
}

export default TournamentPage;

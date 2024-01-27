import React, { useState } from 'react';
import type{ Tournament } from './type';
import { useAppDispatch } from '../../store/store';

function CreateTournament({ setShowForm }: { setShowForm: React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const [gameType, setGameType] = useState('2x2');
  const [players, setPlayers] = useState(4);

  const arrOne = [2, 4, 8];
  const arrTwo = [4, 8, 16];

  const[errMessage,setErrMessage]=useState('')

  const dispatch = useAppDispatch();

  function createTournamentFetch(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    fetch('/api/tournaments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, players, date, gameType }),
    })
      .then((res) => res.json())
      .then((data: { tournament?: Tournament, message: string }) => {if(data.tournament){dispatch({ type: 'tournaments/add', payload: data.tournament });setShowForm(false)} else{setErrMessage(data.message)}})
      .catch((err) => console.log(err));

  }

  return (
    <div className="createTournament">
      <button className="closeBtn" type="button" onClick={() => setShowForm(false)}>✖</button>
      <form className="createTournamentForm" onSubmit={createTournamentFetch}>
        title:
        <label htmlFor="title">
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        description:
        <label htmlFor="description">
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        type of game:
        <label htmlFor="type of game">
          <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
            <option value='2x2'>🏓🏓x🏓🏓</option>
            <option value='1x1'>🏓x🏓</option>
          </select>
        </label>
        participants:
        <label htmlFor="participants">
          <select value={players} onChange={(e) => setPlayers(Number(e.target.value))}>
            {gameType === '1x1'
              ? arrOne.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))
              : arrTwo.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
          </select>
        </label>
        choose date:
        <label htmlFor="date">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button type="submit">Create</button>
        <p>{errMessage}</p>
      </form>
    </div>
  );
}

export default CreateTournament;

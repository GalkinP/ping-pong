import React, { useEffect } from 'react';
import '../app/App.css';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import type { Player } from '../components/Player/type';
import type { Tournament } from '../components/Tournament/type';
import Navbar from '../components/navbar/Navbar';
import TournamentsPage from '../components/Tournament/TournamentsPage';
import UsersPage from '../components/User/UsersPage';
import type { User } from '../components/User/type';
import RegistrationPage from '../components/Auth/RegPage';
import AuthorizationPage from '../components/Auth/AuthPage';
import TournamentPage from '../components/Tournament/TournamentPage';
import UserPage from '../components/User/UserPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/api/players')
      .then((res) => res.json())
      .then((data: { players: Player[] }) => {
        dispatch({ type: 'players/set', payload: data.players });
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch('/api/tournaments')
      .then((res) => res.json())
      .then((data: { tournaments: Tournament[] }) => {
        dispatch({ type: 'tournaments/set', payload: data.tournaments });
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data: {message: string, users: User[] }) => {
        dispatch({ type: 'users/set', payload: data.users });
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch('/api/auth/check').then((res) => res.json()).then((data: { user?: User })=>{if(data.user){dispatch({type: 'auth/auth', payload: data.user})}}).catch((err) => console.log(err)) },[])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TournamentsPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/tournaments/:tournamentId" element={<TournamentPage />} />
      </Routes>{' '}
    </>
  );
}

export default App;

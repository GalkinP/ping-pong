import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { type RootState, useAppDispatch } from '../../store/store';

function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();

  async function logoutFetch(): Promise<void> {
    await fetch('/api/auth/logout', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data: { message: string }) => {
        if (data.message === 'logout') {
          dispatch({ type: 'auth/logout' });
        }
      })
      .catch((err) => console.log(err));
  }

  const user = useSelector((store: RootState) => store.user.user);

  
  return (
    <nav className="navbar">
      {user ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link> <Link to="https://www.ponggame.org/">Pong</Link>{' '}
            <Link to="/" onClick={logoutFetch}>
              Выйти
            </Link>
          </li>
 <li className="user-avatar">
            <img src={user.avatar} alt="" />
          </li>
          <li className="user-name">{user.name}</li>
         
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/registration">зарегистрироваться</Link>
          </li>
          <li>
            <Link to="/authorization">войти</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;

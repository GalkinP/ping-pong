
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { User } from '../User/type';
import { useAppDispatch } from '../../store/store';

function RegistrationPage(): JSX.Element {
  const [errr, setErr] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (password === checkPassword) {
      fetch('/api/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => res.json())
        .then((data: { message: string; user?: User }) => {
          if (data.user) {
            dispatch({ type: 'auth/auth', payload: data.user });
            dispatch({ type: 'user/add', payload: data.user });
            navigate('/');
            setName('');
            setEmail('');
            setPassword('');
            setCheckPassword('');
          } else {
            setErr(data.message);
          }
        }).catch((err) => console.log(err));
    }
  };

  return (
    <div className="registration-form">
      <form className="registration-form" onSubmit={onHandleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="password">
          Check password:
          <input
            type="password"
            name="password"
            required
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </label>
        <br />
        <div className="button-container">
          <button type="submit">зарегистрироваться</button>
          <br />
          <p style={{ color: 'red' }}>{errr}</p>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;

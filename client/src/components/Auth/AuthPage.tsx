
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import type{ User } from '../User/type';

function AuthorizationPage(): JSX.Element {
  const[errMessage,setErr]=useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  
  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
   fetch('/api/auth/login',{
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ email, password }),
   }).then((res) => res.json()).then((data: { message: string; user?: User }) => {
     if (data.user) {
      dispatch({ type: 'auth/auth', payload: data.user });
      navigate('/');
      setEmail('');
      setPassword('');
      
    }
    else{
      setErr(data.message)
    }
   }).catch((err) => console.log(err));
   
    
  };

  return (
    <div className="registration-form">
      <form onSubmit={onHandleSubmit}>
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
        <button type="submit">login</button>
        <br />
         <p style={{color:'red'}}>{errMessage}</p>
      </form>
    </div>
  );
}

export default AuthorizationPage;

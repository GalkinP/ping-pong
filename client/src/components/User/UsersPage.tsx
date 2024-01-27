import React from 'react';
import { useSelector } from 'react-redux';
import UserEl from './UserEl';
import type{ RootState } from '../../store/store';


function UsersPage(): JSX.Element {
    const users = useSelector((store:RootState) => store.users.users)
   
    
  return (
    <div>
      <h2>UsersPage</h2><div className="users"> {users.map((user) => (
          <UserEl key={user.id} user={user} />
      ))}</div>
     
    </div>
  );
}

export default UsersPage;

import React from 'react';
import { Link } from 'react-router-dom';
import type { User } from './type';

function UserEl({ user }: { user: User }): JSX.Element {
  return (
    <div className="userCard">
      <Link to={`/users/${user.id}`}>
        {' '}
        <div >
          <img src={user.avatar} alt={user.name} />
          <h3>{user.name}</h3>
          <p>
            {user.losses} losses - {user.wins} wins
          </p>
        </div>
      </Link>
    </div>
  );
}

export default UserEl;

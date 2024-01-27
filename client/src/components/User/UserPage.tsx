import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import type { User } from './type';
import UserUpdateForm from './UserUpdateForm';

function UserPage(): JSX.Element {
  const { userId } = useParams();
  const user: User | undefined = useSelector((state: RootState) =>
    state.users.users.find((us: User) => us.id === Number(userId)),
  );
  const owner = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const [Form, setForm] = useState(false);

  if (user) {
    return (
      <div className="userPage">
        <img src={user?.avatar} alt="" />
        <div>
          {' '}
          <h1>{user?.name}</h1>
          <h3>
            {user?.wins} wins - {user?.losses} losses
          </h3>{' '}
          <button type="button" onClick={() => navigate(-1)}>
            Back
          </button> {owner && user.id === owner.id && (
          <button type="button" onClick={() => setForm(true)}>
            redact
          </button>
        )}{' '}
        {Form &&
        <UserUpdateForm user={user} setForm={setForm}/>}
        </div>
       
      </div>
    );
  }
  return <div>User not found</div>;
}

export default UserPage;

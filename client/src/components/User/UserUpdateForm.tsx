import React, { useState } from 'react';
import type{ User } from './type';

type UserUpdateFormProps = {
  setForm: React.Dispatch<React.SetStateAction<boolean>>,
  user: User
};

function UserUpdateForm({ setForm, user }: UserUpdateFormProps): JSX.Element {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) : void {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  }

  function updateUserFetch(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (avatarFile) {console.log(avatarFile);
    
      formData.append('avatar', avatarFile);
    }
    fetch(`/api/users/${user.id}/change`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data: { message: string, user?: User }) => {
        if (data.message) {console.log(data);
        
          setForm(false);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <button type="button" onClick={() => setForm(false)}>✖</button>
      <form encType='multipart/form-data' onSubmit={updateUserFetch}>
        <input type="file" name="avatar" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UserUpdateForm;
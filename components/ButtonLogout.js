'use client';
import { signOut } from 'next-auth/react';

const ButtonLogout = () => {
  return (
    <button
      className='btn btn-outline btn-error'
      type='submit'
      onClick={() => signOut({ callbackUrl: '/' })}>
      Logout
    </button>
  );
};

export default ButtonLogout;

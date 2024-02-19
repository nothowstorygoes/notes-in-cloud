// components/SignOutButton.js
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase'; // Make sure the path is correct
import { useRouter } from 'next/navigation';

const SignOutButton = ({ className }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      // Redirect to the login page after signing out
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button onClick={handleSignOut} className={className}>
      Sign Out
    </button>
  );
};


export default SignOutButton;
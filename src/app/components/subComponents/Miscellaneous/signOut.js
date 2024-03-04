
import React, { useEffect, useState } from 'react';
import { auth } from '../../../firebase'; 
import { useRouter } from 'next/navigation';

const SignOutButton = ({ className }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      
      router.push('/components/login');
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
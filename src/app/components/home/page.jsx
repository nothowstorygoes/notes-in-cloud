// page.jsx
'use client'
import useAuth from "../auth";
import { useRouter } from "next/navigation";
import SignOutButton from '../subComponents/signOut';
import { useEffect } from "react";
import styles from './home.module.css'

const Home = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/components/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <div className={styles.load}>Loading...</div>;
  }

  return (
    <div>
      <SignOutButton className={styles.SignOutButton}/>
      {/* Rest of your component */}
    </div>
  );
};

export default Home;
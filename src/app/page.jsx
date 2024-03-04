
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; 
import styles from "./page.module.css";

const useAuthRedirect = () => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        router.push("/components/home");
      } else {
        router.push("/components/landingPage");
      }
    });

    
    return () => unsubscribe();
  }, [router]);

  return (
    <main>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <div />
        </div>
      </div>
    </main>
  );
};

export default useAuthRedirect;

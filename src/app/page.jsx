// useAuthRedirect.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase"; // Adjust the import path as necessary
import styles from "./page.module.css";

const useAuthRedirect = () => {
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, redirect to the home page
        router.push("/components/home");
      } else {
        router.push("/components/landingPage");
      }
    });

    // Clean up the listener when the component unmounts
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

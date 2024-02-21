"use client";
import { useEffect } from "react";
import styles from "./page.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update the state
        setUser(user);
        // Redirect to the home page
        router.push("/components/home");
      } else {
        // User is signed out, update the state
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [router]);


  useEffect(() => {
    // Apply styles to the body element
    document.body.style.overflowY = "hidden";

    // Clean up the style when the component unmounts
    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  return (
    <main>
      <section>
        <div className={styles.container}>
          <p className={styles.title}>Notes in Cloud</p>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => router.push("/components/login")}
              className={styles.button}
            >
              Login
            </button>
            <button
              onClick={() => router.push("/components/signUp")}
              className={styles.button}
            >
              Sign Up
            </button>
          </div>
          <p className={styles.paragraph}>
            Notes in Cloud is a PWA that uses Firebase Web API to store your
            notes in PDFs, letting you bring your classes &apos notes on every device
            you need.
            <br />
          </p>
          <p className={styles.footer}>
            Powered by NextJS framework <br /> Made by &nbsp;
            <a href="https://www.github.com/nothowstorygoes">
              Pio Alessandro Esposito
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;

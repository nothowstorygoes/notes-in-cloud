"use client";
import { useEffect } from "react";
import styles from "./landingPage.module.css";
import {useRouter} from 'next/navigation'

const LandingPage = () => {

  const router=useRouter();
  useEffect(() => {
    
    document.body.style.overflowY = "hidden";

    
    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  return (
    <main className={styles.main}>
      <section>
        <div className={styles.verticalSpacing}></div>
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
            notes in PDFs, letting you bring your classes&apos; notes on every device
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

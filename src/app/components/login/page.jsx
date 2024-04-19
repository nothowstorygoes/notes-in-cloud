"use client";
import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import Link from "next/link";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // if logged in pushes to home
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        router.push("/components/home");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  //login using firebase auth functions
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/components/home");
    } catch (error) {
      setErrorMessage(error.code);
    }
  };


  //login with google popup
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      router.push("/components/home");
    } catch (error) {
      setErrorMessage(error.code);
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "";
    };
  }, []);

  return (
    <main>
      <section>
        <div className={styles.container}>
          <p className={styles.title}>
            <a href="/notes-in-cloud/" className={styles.titleLink}>
              Notes in Cloud
            </a>
          </p>
          <form className={styles.formContainer} onSubmit={handleLogin}>
            <div className={styles.formComplete}>
              <label htmlFor="email-address" className={styles.label}>
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <div className={styles.formComplete}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <div>
              <button type="submit" className={styles.submitButton}>
                Login
              </button>
            </div>
          </form>

          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}

          <div>
            <p>Or</p>
          </div>
          <div>
            <button
              onClick={handleGoogleLogin}
              className={styles.googleSignInButton}
            >
              Login with
              <img src="../icons/googleicon.webp" alt="" className={styles.googleIcon}/>
            </button>
          </div>

          <p className={styles.paragraph}>
            No account yet? <Link href="/components/signUp">Sign up</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;

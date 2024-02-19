"use client";
import Link from "next/link";
import styles from "../login/login.module.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("./login");
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

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
            <form className={styles.formContainer} onSubmit={onSubmit}>
              <div>
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

              <div>
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
                  Sign Up
                </button>
              </div>
            </form>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <p className={styles.paragraph}>
              Already have an account? <Link href="./login">Sign in</Link>
            </p>
          </div>
      </section>
    </main>
  );
};

export default Signup;

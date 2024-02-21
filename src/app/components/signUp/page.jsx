"use client";
import Link from "next/link";
import styles from "./signup.module.css";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import app from "../../firebase";
import { useEffect } from "react";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    const storage = getStorage(app);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const defaultPicRef = ref(storage, `profilePics/default/${user.uid}`);
      const defaultPicPath = "notes-in-cloud/icons/blank.png";
      const defaultPicBlob = new Blob(
        [await (await fetch(defaultPicPath)).blob()],
        { type: "image/png" }
      );
      await uploadBytes(defaultPicRef, defaultPicBlob);
      const userUsername = username || `user${user.uid}`;
      const usernameRef = ref(storage, `Userdata/${user.uid}/${user.uid}.json`);
      const usernameData = JSON.stringify({username: userUsername});
      const usernameBlob = new Blob([usernameData], { type: 'application/json' });
      await uploadBytes(usernameRef, usernameBlob);
      console.log(user);
      router.push("./login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(`${errorCode}: ${errorMessage}`);
    }
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
          <p className={styles.title}>
            <a href="/notes-in-cloud/" className={styles.titleLink}>
              Notes in Cloud
            </a>
          </p>
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
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

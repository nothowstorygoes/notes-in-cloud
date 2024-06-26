"use client";
import Link from "next/link";
import styles from "./signup.module.css";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import app from "../../firebase";
import { useEffect } from "react";
import {
  deleteObject,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const router = useRouter();

  // function for signup. Creates user in firebase auth and creates needed dependencies in firebase cloud storage.
  // Uploads a blank profile picture as default profile picture.
  //If set, it creates dependencies for propic and files in match.json

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

      //Uploads default blank profile picture
      const defaultPicRef = ref(storage, `profilePics/default/${user.uid}`);
      const defaultPicPath = "/notes-in-cloud/icons/blank.png";
      const defaultPicBlob = new Blob(
        [await (await fetch(defaultPicPath)).blob()],
        { type: "image/png" }
      );
      await uploadBytes(defaultPicRef, defaultPicBlob);

      //Set username in match.json file for dependencies
      const userUsername = username || `user${user.uid}`;
      const usernameRef = ref(storage, `Userdata/${user.uid}/${user.uid}.json`);
      const usernameData = JSON.stringify({ username: userUsername });
      const usernameBlob = new Blob([usernameData], {
        type: "application/json",
      });
      await uploadBytes(usernameRef, usernameBlob);
      const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
      const matchJsonData = JSON.stringify({});
      const matchJsonBlob = new Blob([matchJsonData], {
        type: "application/json",
      });
      await uploadBytes(matchJsonRef, matchJsonBlob);

      //Creates a placeholder for setting up the private folder
      const coversRef = ref(storage, `PDFs/${user.uid}/covers/placeholder.txt`);
      await uploadString(coversRef, "");

      console.log(user);
      router.push("./login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(`${errorCode}: ${errorMessage}`);
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
          <form className={styles.formContainer} onSubmit={onSubmit}>
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
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

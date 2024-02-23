"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, deleteUser, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import app from "../../firebase";
import ThemeChanger from "../subComponents/darkModeToggle";
import Navbar from "../subComponents/navbar";
import styles from "./settings.module.css";

const SettingsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("./login");
      }
    });
  }, [router]);

  const deleteAllFiles = async (folderPath) => {
    const storage = getStorage();
    const storageRef = ref(storage, folderPath);
    const res = await listAll(storageRef);
    res.items.forEach(async (itemRef) => {
      await deleteObject(itemRef);
    });
  };

  const deleteAccount = async () => {
    const auth = getAuth();
    const storage = getStorage();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error("No user is currently signed in.");
      return;
    }

    const userId = currentUser.uid;

    // Delete all files in /PDFs/{userId}/
    await deleteAllFiles(`/PDFs/${userId}/`);

    await deleteAllFiles(`/Userdata/${userId}/`);

    // Attempt to delete the profile picture from the default location
    try {
      const defaultProfilePictureRef = ref(
        storage,
        `/profilePics/default/${userId}`
      );
      await deleteObject(defaultProfilePictureRef);
    } catch (error) {
      console.error("Failed to delete default profile picture:", error);
      // If the default profile picture deletion fails, attempt to delete from the user-specific location
      try {
        const userProfilePictureRef = ref(storage, `/profilePics/${userId}`);
        await deleteObject(userProfilePictureRef);
      } catch (error) {
        console.error("Failed to delete user-specific profile picture:", error);
      }
    }

    // Delete user's account
    await deleteUser(currentUser);

    // Redirect to landing page
    router.push("./landingPage");
  };

  return (
    <main>
      <Navbar />
      <div className={styles.settings}>
        <p className={styles.title}>Settings</p>
        <ThemeChanger />
        <div className={styles.deleteContainer}>
          <p className={styles.text}>Beware of <br />using these <br /> buttons!</p>
          <div className={styles.buttonContainer}>
            <button
              onClick={() => deleteAllFiles(`/PDFs/${user.uid}/`)}
              className={styles.button}
            >
              Delete All Files
            </button>
            <button onClick={deleteAccount} className={styles.button}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;

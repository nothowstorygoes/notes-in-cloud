'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, deleteUser, onAuthStateChanged, reauthenticateWithCredential, EmailAuthCredential, EmailAuthProvider } from "firebase/auth";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";
import app from "../../firebase";
import ThemeChanger from "../subComponents/Dark Mode/darkModeToggle";
import Navbar from "../subComponents/Navbar/navbar";
import styles from "./settings.module.css";

const SettingsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false); // Set loading to false after user is authenticated
      } else {
        setUser(null);
        router.push("./login"); // Redirect to login if user is not authenticated
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const deleteAllFiles = async (folderPath) => {
    const storage = getStorage();
    const storageRef = ref(storage, folderPath);
    const res = await listAll(storageRef);
    res.items.forEach(async (itemRef) => {
      await deleteObject(itemRef);
    });
  }

  const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);

  const handleCredentialSubmission = (email, password) =>
  {
    deleteAccount (email,password);
    setShowDeleteAccountPopup(false);
  }


  const DeleteAccountPopup = ({ onSubmit, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = () => {
      onSubmit(email, password);
      onClose(); // Close the popup after submission
    };
  
    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className={styles.inputField}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className={styles.inputField}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.buttonContainerDelete}>
          <button onClick={onClose} className={styles.buttonClose}>Cancel</button>
          <button onClick={handleSubmit} className={styles.buttonDelete}>Delete Account</button>
          </div>
        </div>
      </div>
    );
  };

  const deleteAccount = async (email,password) => {
    const auth = getAuth();
    const storage = getStorage();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.error("No user is currently signed in.");
      return;
    }

    const userId = currentUser.uid;

    // Delete all files in /PDFs/{userId}/
    await deleteAllFiles(`/PDFs/${userId}/covers`);
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
      const credential= EmailAuthProvider.credential(email,password);
      reauthenticateWithCredential(currentUser, credential).then(() => {
        return deleteUser(currentUser);
  })
      router.push("./landingPage");
  }

    return (
      <main>
        <Navbar />
        <div className={styles.settings}>
          <p className={styles.title}>Settings</p>
          <ThemeChanger />
          <div className={styles.deleteContainer}>
            <p className={styles.text}>
              Beware of <br />
              using these <br /> buttons!
            </p>
            <div className={styles.buttonContainer}>
              <button
                onClick={() => deleteAllFiles(`/PDFs/${user.uid}/`)}
                className={styles.button}
              >
                Delete All Files
              </button>
              <button onClick={() => setShowDeleteAccountPopup(true)} className={styles.button}>
                Delete Account
              </button>
              {showDeleteAccountPopup && (
                <DeleteAccountPopup onSubmit={handleCredentialSubmission} onClose={() => setShowDeleteAccountPopup(false)}/>
              )}
            </div>
          </div>
        </div>
      </main>
    );
};

export default SettingsPage;

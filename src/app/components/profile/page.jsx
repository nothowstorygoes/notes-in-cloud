"use client";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  uploadString,
  deleteObject,
  ref,
} from "firebase/storage";
import app from "../../firebase";
import Navbar from "../subComponents/Navbar/navbar";
import styles from "./profile.module.css";
import SignOutButton from "../subComponents/Miscellaneous/signOut";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const router = useRouter();

  //check for user auth state and if logged in loads the user's username and propic

  useEffect(() => {
    const auth = getAuth(app);
    const storage = getStorage(app);
    document.body.style.overflowY = "hidden";
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        const profilePicRef = ref(storage, `profilePics/${user.uid}`);
        getDownloadURL(profilePicRef)
          .then((url) => {
            setProfilePicUrl(url);
          })
          .catch(() => {
            const defaultPicRef = ref(
              storage,
              `profilePics/default/${user.uid}`
            );
            getDownloadURL(defaultPicRef).then((url) => {
              setProfilePicUrl(url);
            });
          });

        const usernameRef = ref(
          storage,
          `Userdata/${user.uid}/${user.uid}.json`
        );
        getDownloadURL(usernameRef).then((url) => {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              setUsername(data.username);
              setIsDataLoaded(true);
            });
        });
      } else {
        setUser(null);
        router.push("./login");
      }
    });

    return () => {
      unsubscribe();
      document.body.style.overflowY = "";
    };
  }, []);

  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setShowUploadPopup(true);
    }
  };

  //function to handle the upload of a profile picture, and if present deletes the default one
  const handleUpload = async () => {
    const storage = getStorage(app);
    if (!selectedFile) {
      return;
    }

    const storageRef = ref(storage, `profilePics/${user.uid}`);
    await uploadBytes(storageRef, selectedFile);
    setProfilePicUrl(await getDownloadURL(storageRef));

    const defaultPicRef = ref(storage, `profilePics/default/${user.uid}`);
    try {
      await getDownloadURL(defaultPicRef);

      await deleteObject(defaultPicRef);
    } catch (error) {}

    setShowUploadPopup(false);
  };

  if (!isDataLoaded) {
    return <div className={styles.load}>Loading...</div>;
  }

  if (!user) {
    return <div className={styles.load}>Loading...</div>;
  }

  //sends user email to reset password using firebase auth
  const handlePasswordReset = async (email) => {
    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Error sending password reset email:", error.message);
    }
  };

  return (
    <main>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContainerColumn}>
            <p className={styles.header}>
              Welcome, <br /> {username}
            </p>
            <div className={styles.button}>
              <SignOutButton className={styles.SignOutButton} />
              <button
                onClick={() => handlePasswordReset(user.email)}
                className={styles.submitButton}
              >
                Reset Password
              </button>
              <div className={styles.formPopup}>
                <button
                  onClick={() =>
                    document.getElementById("profile-picture-upload").click()
                  }
                  className={styles.submitButtonUpload}
                >
                  Upload Profile Picture
                </button>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  id="profile-picture-upload"
                  style={{ display: "none" }}
                />
                {showUploadPopup && (
                  <div className={styles.submitButtonContainer}>
                    <button
                      onClick={handleUpload}
                      className={styles.submitButton}
                    >
                      Confirm Upload
                    </button>
                    <button
                      onClick={() => setShowUploadPopup(false)}
                      className={styles.submitButton}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <img src={profilePicUrl} alt="Profile" className={styles.propic} />
        </div>
        <div className={styles.formContainer}></div>
      </div>
    </main>
  );
};

export default ProfilePage;

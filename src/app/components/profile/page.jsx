"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  uploadString,
  deleteObject,
  ref,
} from "firebase/storage";
import app from "../../firebase"; // Adjust the import path as necessary
import Navbar from "../subComponents/navbar";
import styles from "./profile.module.css";
import SignOutButton from "../subComponents/signOut";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const auth = getAuth(app);
    const storage = getStorage(app);
    document.body.style.overflowY = "hidden";
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Get the profile picture URL
        const profilePicRef = ref(storage, `profilePics/${user.uid}`);
        getDownloadURL(profilePicRef)
          .then((url) => {
            setProfilePicUrl(url);
          })
          .catch(() => {
            // If the user does not have a profile picture, use the default one
            const defaultPicRef = ref(
              storage,
              `profilePics/default/${user.uid}`
            );
            getDownloadURL(defaultPicRef).then((url) => {
              setProfilePicUrl(url);
            });
          });
        // Get the username from the JSON file in Firebase Storage
        const usernameRef = ref(
          storage,
          `Userdata/${user.uid}/${user.uid}.json`
        );
        getDownloadURL(usernameRef).then((url) => {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              setUsername(data.username);
            });
        });
      } else {
        setUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => {
      unsubscribe();
      document.body.style.overflowY = "";
    };
  }, []);

  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setShowUploadPopup(true); // Show the popup when a file is selected
    }
  };

  const handleUpload = async () => {
    const storage = getStorage(app);
    if (!selectedFile) {
      return;
    }

    const storageRef = ref(storage, `profilePics/${user.uid}`);
    await uploadBytes(storageRef, selectedFile);
    setProfilePicUrl(await getDownloadURL(storageRef));

    // Delete the default profile picture
    const defaultPicRef = ref(storage, `profilePics/default/${user.uid}`);
    try {
      // Attempt to get the download URL of the default picture
      await getDownloadURL(defaultPicRef);
      // If the above line does not throw an error, the default picture exists
      // and we can proceed to delete it
      await deleteObject(defaultPicRef);
    } catch (error) {
      // If an error is thrown, the default picture does not exist, so we do nothing
      // and the error is caught silently
    }

    setShowUploadPopup(false);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUsernameUpdate = async () => {
    if (user) {
      const storageRef = ref(storage, `Userdata/${user.uid}/${user.uid}.json`);
      const usernameData = JSON.stringify({ username });
      await uploadString(storageRef, usernameData, "application/json");
      // Optionally, you can update the local state with the new username
      setUsername(username);
    }
  };

  if (!user) {
    return <div className={styles.load}>Loading...</div>;
  }

  return (
    <div id="outer-container">
      <Navbar />
      <div id="page-wrap" className={styles.container}>
        <div className={styles.headerContainer}>
          <div className={styles.headerContainerColumn}>
          <p className={styles.header}>
            Welcome, <br /> {username}
          </p>
          <div className={styles.button}>
            <SignOutButton className={styles.SignOutButton} />
          </div>
          </div>
          <img src={profilePicUrl} alt="Profile" className={styles.propic} />
        </div>
        <div className={styles.restPage}>
        <div className={styles.infoContainer}>
          <div className={styles.infoLine}>
            <p className={styles.infoBold}>Email: &nbsp;</p>
            <p className={styles.info}>{user.email}</p>
          </div>
          {/* Add more profile information as needed */}
        </div>
        <div className={styles.formContainer}>
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
                <button onClick={handleUpload} className={styles.submitButton}>
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
          <div className={styles.form}>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Edit Username"
              className={styles.inputField}
            />
            <button
              onClick={handleUsernameUpdate}
              className={styles.submitButton}
            >
              Update Username
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

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
import app from "../../firebase"; // Adjust the import path as necessary
import Navbar from "../subComponents/navbar";
import styles from "./profile.module.css";
import SignOutButton from "../subComponents/signOut";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const router = useRouter();

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
              setIsDataLoaded(true);
            });
        });
      } else {
        setUser(null);
        router.push("./login");
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

  if(!isDataLoaded) 
  {
    return <div className={styles.load}>Loading...</div>;
  }

  if (!user) {
    return <div className={styles.load}>Loading...</div>;
  }

  const handlePasswordReset = async (email) => {
    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!"); // Inform the user that the email has been sent
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
            </div>
          </div>
          <img src={profilePicUrl} alt="Profile" className={styles.propic} />
        </div>
        <div className={styles.formContainer}>
          
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

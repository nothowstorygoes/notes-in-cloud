"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase"; // Adjust the import path as necessary
import styles from "./home.module.css";
import Sidebar from "../subComponents/sidebar";
import Navbar from "../subComponents/navbar";
import Preview from "../subComponents/preview";
import useNotificationPermission from '../subComponents/notification'

import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(null);
  const storage = getStorage();
  const [showEditOverlay, setShowEditOverlay] = useState(false);

  useNotificationPermission();

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

  const fetchFiles = async () => {
    if (!user) return;

    const storageRef = ref(storage, `PDFs/${user.uid}/`);
    const res = await listAll(storageRef);
    const fileUrls = await Promise.all(
      res.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      })
    );
    setFiles(fileUrls);
  };

  useEffect(() => {
    fetchFiles();
  }, [user]); // Depend on the 'user' state to re-fetch files when the user changes

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingFile(file);
      setShowUploadPopup(true);
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!user || !uploadingFile) return;

    const storageRef = ref(storage, `PDFs/${user.uid}/${uploadingFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadingFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle the upload progress here
      },
      (error) => {
        // Handle unsuccessful uploads here
      },
      async () => {
        // Handle successful uploads on complete
        const downloadURL = await getDownloadURL(storageRef);
        console.log("File available at", downloadURL);

        // Download the match.json file
        const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
        const matchJsonURL = await getDownloadURL(matchJsonRef);
        const response = await fetch(matchJsonURL);
        let matchJson = await response.json();

        // Ensure matchJson is an array
        if (!Array.isArray(matchJson)) {
          matchJson = [];
        }

        // Add the new object to the JSON content
        matchJson.push({ pdf: uploadingFile.name, cover: "null" });

        // Upload the updated match.json file
        const updatedMatchJsonRef = ref(
          storage,
          `Userdata/${user.uid}/match.json`
        );
        const updatedMatchJsonBlob = new Blob([JSON.stringify(matchJson)], {
          type: "application/json",
        });
        const uploadTask2 = uploadBytesResumable(
          updatedMatchJsonRef,
          updatedMatchJsonBlob
        );

        uploadTask2.on(
          "state_changed",
          (snapshot) => {
            // Handle the upload progress here
          },
          (error) => {
            // Handle unsuccessful uploads here
          },
          async () => {
            // Handle successful uploads on complete
            fetchFiles();
            console.log("match.json updated successfully");
            const registration = await navigator.serviceWorker.ready;
            registration.active.postMessage({
              type: 'NOTIFICATION',
              payload: {
                title: 'Operation Completed',
                options: {
                  body: 'Your operation has been completed successfully.',
                  // Add any other notification options here
                },
              },
            });
            // Refresh the list of files
            
          }
        );
      }
    );
    setUploadingFile(null);
    setShowUploadPopup(false);
  };


  const handleDelete = async (file) => {
    if (!user) return;

    const storageRef = ref(storage, `PDFs/${user.uid}/${file.name}`);
    try {
      await deleteObject(storageRef);
      // Refresh the list of files after deletion
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (loading) {
    return <div className={styles.load}>Loading...</div>; // Or any loading indicator you prefer
  }

  return (
    <main>
      <Navbar />
      <div id="outer-container">
        <Sidebar
          onUpload={() => document.getElementById("fileInput").click()}
          onEditToggle={() => setShowEditOverlay(!showEditOverlay)}
          showEditOverlay={showEditOverlay}
          showUploadPopup={showUploadPopup}
          handleUpload={handleUpload}
          handleCancelUpload={() => setShowUploadPopup(false)}
        />
        <div id="page-wrap">
          <div className={styles.headerSmartphone}>
            <p className={styles.headerTitleSmartphone}>Your slides</p>
          </div>
          <div className={styles.container}>
            <div className={styles.header}>
              <p className={styles.headerTitle}>Your slides</p>
              <input
                type="file"
                id="fileInput"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </div>
            <div className={styles.outerPDFs}>
              <div className={styles.PDFsContainer}>
                {files.map((file) => (
                  <div key={file.name}>
                    <Preview
                      file={file}
                      onDelete={handleDelete}
                      showEditOverlay={showEditOverlay}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

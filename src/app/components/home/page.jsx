'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../../firebase'; // Adjust the import path as necessary
import styles from "./home.module.css";
import Navbar from "../subComponents/navbar";
import Preview from "../subComponents/preview";
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

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Fetch files after user is authenticated
      } else {
        setUser(null);
        router.push("./login"); // Adjust the path to your login page as necessary
      }
      setLoading(false);
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

    fetchFiles();
    
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
        // Refresh the list of files
        fetchFiles();
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
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.headerTitle}>Your slides</p>
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className={styles.button}
          >
            +
          </button>
          <input
            type="file"
            id="fileInput"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          {showUploadPopup && (
            <div className={styles.submitButtonContainer}>
              <button onClick={handleUpload} className={styles.submitButton}>
                Upload
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
        <div className={styles.PDFsContainer}>
          {files.map((file) => (
            <div key={file.name}>
              <Preview file={file} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;


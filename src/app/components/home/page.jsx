"use client";
// Import necessary hooks and components
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../auth";
import styles from "./home.module.css";
import Navbar from "../subComponents/navbar";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import Preview from "../subComponents/preview";

const Home = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [files, setFiles] = useState([]);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(null);
  const storage = getStorage();

  // Redirect unauthenticated users to the login page
  useEffect(() => {
    if (!loading && !user) {
      router.push("notes-in-cloud/components/login"); // Replace '/login' with the path to your login page
    }
  }, [loading, user, router]);

  // Function to fetch all PDF files from the storage
  const fetchFiles = async () => {
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

  // Fetch all PDF files from the storage when the component mounts
  useEffect(() => {
    if (!loading && user) {
      fetchFiles();
    }
  }, [loading, user, storage]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingFile(file);
      setShowUploadPopup(true);
    }
  };

  // Function to handle file upload
  const handleUpload = async (event) => {
    event.preventDefault();
    // Upload the new file
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
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      try {
        // Construct the reference to the file in Firebase Storage
        const storageRef = ref(storage, `PDFs/${user.uid}/${file.name}`);
  
        // Delete the file
        await deleteObject(storageRef);
  
        // Refresh the list of files after deletion
        fetchFiles();
      } catch (error) {
        console.error("Error deleting file:", error);
        // Handle any errors that occur during the deletion process
      }
    } else {
      console.error("User is not authenticated");
      // Handle the case where the user is not authenticated
    }
  };

  // Render the component
  return (
    <div id="outer-container">
      <Navbar />
      <div id="page-wrap" className={styles.container}>
        <div className={styles.header}>
          <p className={styles.headerTitle}>Your slides</p>
            {/* Upload PDF button */}
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
                <button onClick={handleUpload} className={styles.submitButton}>Upload</button>
                <button onClick={() => setShowUploadPopup(false)} className={styles.submitButton}>
                  Cancel
                </button>
              </div>
            )}
             </div>
          {/* Display the list of PDF files */}
          <div className={styles.PDFsContainer}>
            {files.map((file) => (
              <div key={file.name}>
                  <Preview file={file} onDelete={handleDelete}/>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default Home;

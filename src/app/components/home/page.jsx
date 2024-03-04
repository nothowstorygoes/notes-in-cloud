"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase"; 
import styles from "./home.module.css";
import Navbar from "../subComponents/Navbar/navbar";
import Preview from "../subComponents/Preview/preview";
import useNotificationPermission from "../subComponents/Miscellaneous/notification";

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
  const [fileName, setFileName] = useState("");
  const storage = getStorage();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showEditOverlay, setShowEditOverlay] = useState(false);


  // ask permission to user for notification
  useNotificationPermission();


  //checks user auth state
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false); 
      } else {
        setUser(null);
        router.push("./login"); 
      }
    });

    
    return () => unsubscribe();
  }, [router]);

  //Function to load all files from user personal storage
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
  }, [user]); 


  //function that sets the necessary vars for handling upload
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingFile(file);
      setFileName(file.name);
      setShowUploadPopup(true);
    }
  };

  //function to handle upload file. Uploads file, update match.json with the new file uploaded, sends notification
  const handleUpload = async (event) => {
    event.preventDefault();
    if (!user || !uploadingFile) return;

    setUploadProgress(true)

    const storageRef = ref(storage, `PDFs/${user.uid}/${uploadingFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadingFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        
      },
      (error) => {
        
      },
      async () => {
        
        const downloadURL = await getDownloadURL(storageRef);
        console.log("File available at", downloadURL);

        
        const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
        const matchJsonURL = await getDownloadURL(matchJsonRef);
        const response = await fetch(matchJsonURL);
        let matchJson = await response.json();

        
        if (!Array.isArray(matchJson)) {
          matchJson = [];
        }

        
        matchJson.push({ pdf: uploadingFile.name, cover: "null" });

        
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

          },
          (error) => {
            
          },
          async () => {
            setUploadProgress(false);
            
            fetchFiles();
            console.log("match.json updated successfully");
            const registration = await navigator.serviceWorker.ready;
            registration.active.postMessage({
              type: "NOTIFICATION",
              payload: {
                title: "Slide uploaded!",
                options: {
                  body: "Your upload has been completed successfully. Yay!",
                  
                },
              },
            });
            setShowUploadPopup(false);
            
          }
        );
      }
    );
    setUploadingFile(null);
  };


// function to delete file from storage
  const onDelete = async (file) => {
    if (!user) return;

    const storageRef = ref(storage, `PDFs/${user.uid}/${file.name}`);
    try {
      await deleteObject(storageRef);
      
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  //React functional component to render a confirmation modal
  const Modal = () => {
    if (!showUploadPopup) return null;
    return (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <div className={styles.fileName}>{fileName}</div>
          {uploadProgress && (
            <div className={styles.spinnerContainer}>
            <div className={styles.spinner}>
              <div />
            </div>
          </div>
          )}
          <div className={styles.buttonContainerUpload}>
            <button
              onClick={() => setShowUploadPopup(false)}
              className={styles.buttonUpload}
            >
              Cancel
            </button>
            <button onClick={handleUpload} className={styles.buttonUpload}>
              Confirm Upload
            </button>
          </div>
        </div>
      </div>
    );
  };

  const onClickShowEditOverlay = () => {
    setShowEditOverlay(!showEditOverlay);
  };

  const onUploadButton = () => {
    document.getElementById("fileInput").click();
  };

  if (loading) {
    return <div className={styles.load}>Loading...</div>; 
  }

  return (
    <main>
      <Navbar />
      <div className={styles.headerSmartphone}>
        <p className={styles.headerTitleSmartphone}>Your slides</p>
        <a
          href="#"
          onClick={onClickShowEditOverlay}
          className={styles.editButtonSmartphone}
        >
          <img
            src="/notes-in-cloud/icons/edit.svg"
            alt="Edit"
            className={styles.editImgSmartphone}
          />
        </a>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.headerTitle}>Your slides</p>
          <a
            href="#"
            onClick={onClickShowEditOverlay}
            className={styles.editButton}
          >
            <img
              src="/notes-in-cloud/icons/edit.svg"
              alt="Edit"
              className={styles.editImg}
            />
          </a>
          <input
            type="file"
            id="fileInput"
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </div>
        {showEditOverlay && (
          <div className={styles.editDisclaimer}>Edit mode - Enabled</div>
        )}
        <div className={styles.outerPDFs}>
          <div className={styles.PDFsContainer}>
            {showEditOverlay && (
              <div>
                <a
                  href="#"
                  onClick={onUploadButton}
                  className={styles.addAnchorTag}
                >
                  <div className={styles.addSlideBlank}>
                    <p className={styles.plusBlank}>+</p>
                  </div>
                </a>
                {showUploadPopup && <Modal uploadProgess={uploadProgress} />}
              </div>
            )}
            {files.map((file) => (
              <div key={file.name}>
                <Preview
                  file={file}
                  onDelete={onDelete}
                  showEditOverlay={showEditOverlay}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

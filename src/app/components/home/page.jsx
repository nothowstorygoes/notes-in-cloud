"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase";
import styles from "./home.module.css";
import Navbar from "../subComponents/Navbar/navbar";
import Preview from "../subComponents/Preview/preview";
import useNotificationPermission from "../subComponents/Miscellaneous/notificationPermission";
import sendNotification from "../subComponents/Miscellaneous/sendNotification";

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
      const root = document.documentElement;
      const theme = localStorage.getItem('theme') || 'default';
  
      if(theme === "default") {
        root.style.setProperty("--primary-color", "#0d1821");
        root.style.setProperty("--secondary-color", "#344966");
        root.style.setProperty("--ternary-color", "#eff8e2");
      }
      if(theme === "violet"){
        root.style.setProperty("--primary-color", "#231942");
        root.style.setProperty("--secondary-color", "#5e548e");
        root.style.setProperty("--ternary-color", "#ffffff");
      }
      if(theme === "green"){
        root.style.setProperty("--primary-color", "#344e41");
        root.style.setProperty("--secondary-color", "#588157");
        root.style.setProperty("--ternary-color", "#dad7cd");
      }

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

  //function that sets the necessary variables for handling upload
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

    setUploadProgress(true);

    const storageRef = ref(storage, `PDFs/${user.uid}/${uploadingFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, uploadingFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      async () => {
        
        //After the upload of the desidered PDF is complete, handleUpload downloads
        //the corrisponding match.json file for the user and updates it with
        //the new file following the pattern <name:cover> and after re uploads the file

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
        // After the uplaod of the newer version of match.json, handleUpload sends 
        //"message" event to the service worker, which, using the implemented custom logic
        //listens to the event and sends a push notification to the user 
        //that confirms that the upload has been completed

        uploadTask2.on(
          "state_changed",
          (snapshot) => {},
          (error) => {},
          async () => {
            setUploadProgress(false);

            fetchFiles();
            console.log("match.json updated successfully");
            sendNotification();
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

  //Confirmation modal for upload
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

  // Sets the overlay for edit mode
  const onClickShowEditOverlay = () => {
    setShowEditOverlay(!showEditOverlay);
  };

  const onUploadButton = () => {
    document.getElementById("fileInput").click();
  };


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

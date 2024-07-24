"use client";
import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "./preview.module.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import app from "../../../firebase";
import { useRef, useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

//component used for displaying the preview of the pdf file.
//External module for handling the PDF file and displaying the first page as preview.

export default function Preview({
  file: initialFile,
  onDelete,
  showEditOverlay,
}) {
  const [file, setFile] = useState(initialFile);
  const storage = getStorage(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const fileInputRef = useRef(null);
  const [coverImageURL, setCoverImageURL] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkForCoverImage = async () => {
      setIsLoading(true);
      const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
      const matchJsonURL = await getDownloadURL(matchJsonRef);
      const response = await fetch(matchJsonURL);
      const matchJson = await response.json();

      const match = matchJson.find((item) => item.pdf === file.name);
      if (match && match.cover !== "null") {
        const imageRef = ref(storage, `PDFs/${user.uid}/covers/${match.cover}`);
        const imageURL = await getDownloadURL(imageRef);
        setCoverImageURL(imageURL);
      }
      setIsLoading(false);
    };

    checkForCoverImage();
  }, [file, user.uid, storage]);

  if (isLoading) {
    return <div className={styles.load}>Loading...</div>;
  }

  // function to fetch files from the database
  const fetchFile = async (fileName) => {
    const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
    const matchJsonURL = await getDownloadURL(matchJsonRef);
    const response = await fetch(matchJsonURL);
    let matchJson = await response.json();

    if (Array.isArray(matchJson)) {
      const match = matchJson.find((item) => item.pdf === fileName);
      if (match) {
        setFile((prevFile) => {
          if (prevFile.name === fileName) {
            return { ...prevFile, cover: match.cover };
          }
          return prevFile;
        });
      } else {
        setFile((prevFile) => {
          if (prevFile.name === fileName) {
            return { ...prevFile, cover: "null" };
          }
          return prevFile;
        });
      }
    } else {
      console.error("matchJson is not an array:", matchJson);
    }
  };

  // function to delete a preexisting pdf from the user directory
  const handleDelete = async () => {
    onDelete(file);
    const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
    const matchJsonURL = await getDownloadURL(matchJsonRef);
    const response = await fetch(matchJsonURL);
    let matchJson = await response.json();

    const matchIndex = matchJson.findIndex((item) => item.pdf === file.name);
    if (matchIndex !== -1) {
      const match = matchJson[matchIndex];

      if (match.cover !== "null") {
        const imageRef = ref(storage, `PDFs/${user.uid}/covers/${match.cover}`);
        await deleteObject(imageRef);
      }

      matchJson.splice(matchIndex, 1);

      const updatedMatchJsonRef = ref(
        storage,
        `Userdata/${user.uid}/match.json`
      );
      const updatedMatchJsonBlob = new Blob([JSON.stringify(matchJson)], {
        type: "application/json",
      });
      const uploadTask = uploadBytesResumable(
        updatedMatchJsonRef,
        updatedMatchJsonBlob
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        async () => {
          console.log(
            "Deleted match, associated image (if present), and updated match.json successfully"
          );

          fetchFile(file.name);
        }
      );
    } else {
      console.log("No match found for deletion.");
    }
    console.log("Deleted match and updated match.json successfully");

    fetchFile(file.name);
  };

  // function to delete the previously uploaded cover image for a chosen pdf in the user directory
  const deleteCover = async () => {
    const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
    const matchJsonURL = await getDownloadURL(matchJsonRef);
    const response = await fetch(matchJsonURL);
    let matchJson = await response.json();

    const match = matchJson.find((item) => item.pdf === file.name);
    if (match && match.cover !== "null") {
      const imageRef = ref(storage, `PDFs/${user.uid}/covers/${match.cover}`);
      await deleteObject(imageRef);

      match.cover = "null";

      const updatedMatchJsonRef = ref(
        storage,
        `Userdata/${user.uid}/match.json`
      );
      const updatedMatchJsonBlob = new Blob([JSON.stringify(matchJson)], {
        type: "application/json",
      });
      const uploadTask = uploadBytesResumable(
        updatedMatchJsonRef,
        updatedMatchJsonBlob
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        async () => {
          console.log(
            "Cover image deleted and match.json updated successfully"
          );
          setCoverImageURL(null);

          fetchFile(file.name);
        }
      );
    }
  };

  // function to upload a cover image for a specific pdf in the user directory
  const handleCoverUpload = async (event) => {
    const image = event.target.files[0];
    if (!image) return;

    const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
    const matchJsonURL = await getDownloadURL(matchJsonRef);
    const response = await fetch(matchJsonURL);
    let matchJson = await response.json();

    const match = matchJson.find((item) => item.pdf === file.name);
    if (match) {
      match.cover = image.name;

      const imageRef = ref(storage, `PDFs/${user.uid}/covers/${image.name}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        async () => {
          console.log("Image uploaded successfully");

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
            (snapshot) => {},
            (error) => {},
            async () => {
              console.log("match.json updated successfully");

              fetchFile(file.name);
            }
          );
        }
      );
    }
  };

  // loading screen
  const loading = () => {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}>
          <div />
        </div>
      </div>
    );
  };

  const triggerFileSelection = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles.documentWrapper}>
      {showEditOverlay && (
        <div className={styles.overlay}>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={triggerFileSelection}>
              Upload Cover
              <input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg, image/png, image/webp"
                style={{ display: "none" }}
                onChange={handleCoverUpload}
              />
            </button>
            <div className={styles.deleteContainer}>
              {showDeleteConfirm && (
                <div className={styles.deleteContainerRow}>
                  <button
                    className={styles.buttonDelete}
                    onClick={handleDelete}
                  >
                    Delete Slide
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => {
                      setShowDeleteConfirm(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {coverImageURL && (
                <button className={styles.button} onClick={deleteCover}>
                  Delete Cover
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <a href={file.url}>
        {coverImageURL ? (
          <img src={coverImageURL} alt="cover" className={styles.document} />
        ) : (
          <Document file={file} className={styles.document} loading={loading}>
            <Page
              pageNumber={1}
              width={250}
              height={250}
              className={styles.page}
            />
          </Document>
        )}
      </a>
      <div
        className={`${styles.deleteIcon} ${
          showEditOverlay ? styles.showDeleteIcon : ""
        }`}
        onClick={() => {
          setShowDeleteConfirm(true);
        }}
      >
        <img src="/notes-in-cloud/icons/cross.png" className={styles.cross} />
      </div>
    </div>
  );
}

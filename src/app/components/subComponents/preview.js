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
  deleteObject
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import app from "../../firebase";
import { useRef, useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Preview({
  file: initialFile,
  onDelete,
  showEditOverlay,
}) {
  const [file, setFile] = useState(initialFile);
  const storage = getStorage(app);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const fileInputRef = useRef(null); // Add a ref to the file input
  const [coverImageURL, setCoverImageURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state


  useEffect(() => {
    const checkForCoverImage = async () => {
      setIsLoading(true); // Set loading to true before starting the check
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
    return <div className={styles.load}>Loading...</div>; // Render a loading indicator while checking for cover image
  }

 const fetchFile = async (fileName) => {
   // Fetch the updated match.json file
   const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
   const matchJsonURL = await getDownloadURL(matchJsonRef);
   const response = await fetch(matchJsonURL);
   const matchJson = await response.json();
 
   // Find the updated object in match.json
   const match = matchJson.find(item => item.pdf === fileName);
   if (match) {
     // Update the state with the new cover image
     setFile((prevFile) => {
       if (prevFile.name === fileName) {
         return { ...prevFile, cover: match.cover };
       }
       return prevFile;
     });
   } else {
     // If there is no match, it means the cover image has been deleted
     // Update the state to reflect that
     setFile((prevFile) => {
       if (prevFile.name === fileName) {
         return { ...prevFile, cover: "null" };
       }
       return prevFile;
     });
   }};

   const handleDelete = async () => {
     onDelete(file);
     const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
     const matchJsonURL = await getDownloadURL(matchJsonRef);
     const response = await fetch(matchJsonURL);
     let matchJson = await response.json();

     // Find the index of the matching object
     const matchIndex = matchJson.findIndex((item) => item.pdf === file.name);
     if (matchIndex !== -1) {
       // Remove the matching object from the matchJson array
       matchJson.splice(matchIndex,  1);

       // Upload the updated match.json file
       const updatedMatchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
       const updatedMatchJsonBlob = new Blob([JSON.stringify(matchJson)], {
         type: "application/json",
       });
       const uploadTask = uploadBytesResumable(updatedMatchJsonRef, updatedMatchJsonBlob);
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
           console.log("Deleted match and updated match.json successfully");
           // Refresh the component to render the <Document>
           fetchFile(file.name);
         }
       );
     } else {
       console.log("No match found for deletion.");
     }
   };

  const deleteCover = async () => {
    // Find the matching object in match.json
    const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
    const matchJsonURL = await getDownloadURL(matchJsonRef);
    const response = await fetch(matchJsonURL);
    let matchJson = await response.json();

    const match = matchJson.find((item) => item.pdf === file.name);
    if (match && match.cover !== "null") {
      // Delete the cover image from Firebase Storage
      const imageRef = ref(storage, `PDFs/${user.uid}/covers/${match.cover}`);
      await deleteObject(imageRef);

      // Remove the cover attribute from the match object
      match.cover = "null";

      // Upload the updated match.json file
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
        (snapshot) => {
          // Handle the upload progress here
        },
        (error) => {
          // Handle unsuccessful uploads here
        },
        async () => {
          // Handle successful uploads on complete
          console.log(
            "Cover image deleted and match.json updated successfully"
          );
          setCoverImageURL(null);
          // Refresh the component to render the <Document>
          fetchFile(file.name);
        }
      );
    }
  };

 const handleCoverUpload = async (event) => {
   const image = event.target.files[0]; // The image file selected by the user
   if (!image) return;
 
   // Download and parse match.json
   const matchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
   const matchJsonURL = await getDownloadURL(matchJsonRef);
   const response = await fetch(matchJsonURL);
   let matchJson = await response.json();
 
   // Find the matching object and update the "cover" attribute
   const match = matchJson.find(item => item.pdf === file.name); // Assuming 'file' is the PDF file being previewed
   if (match) {
     match.cover = image.name; // Update the cover attribute with the new image name
 
     // Upload the image
     const imageRef = ref(storage, `PDFs/${user.uid}/covers/${image.name}`);
     const uploadTask = uploadBytesResumable(imageRef, image);
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
         console.log("Image uploaded successfully");
 
         // Upload the updated match.json file
         const updatedMatchJsonRef = ref(storage, `Userdata/${user.uid}/match.json`);
         const updatedMatchJsonBlob = new Blob([JSON.stringify(matchJson)], { type: 'application/json' });
         const uploadTask2 = uploadBytesResumable(updatedMatchJsonRef, updatedMatchJsonBlob);
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
             console.log("match.json updated successfully");
             // Call fetchFiles to refresh the list of files
             fetchFile(file.name);
           }
         );
       }
     );
   }
 };

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
    fileInputRef.current.click(); // Programmatically trigger the file input click
  };

  // Use the state to ensure referential equality of the file object
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
          {coverImageURL && (
            <button className={styles.button} onClick={deleteCover}>
              Delete Cover
            </button>
          )}
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
        onClick={handleDelete}
      >
        <img src="/notes-in-cloud/icons/cross.png" className={styles.cross} />
      </div>
    </div>
  );
}

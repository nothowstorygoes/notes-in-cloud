"use client";
import React, { useState } from 'react';
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "./preview.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function Preview({ file: initialFile, onDelete }) {
  const [file, setFile] = useState(initialFile);

  const handleDelete = () => {
    onDelete(file);
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

  // Use the state to ensure referential equality of the file object
  return (
    <div className={styles.documentWrapper}>
      <a href={file.url}>
        <Document file={file} className={styles.document} loading={loading}>
          <Page
            pageNumber={1}
            width={250}
            height={250}
            className={styles.page}
          />
        </Document>
      </a>
      <div className={styles.deleteIcon} onClick={handleDelete}>
        <img src="/notes-in-cloud/icons/cross.png" className={styles.cross} />
      </div>
    </div>
  );
}

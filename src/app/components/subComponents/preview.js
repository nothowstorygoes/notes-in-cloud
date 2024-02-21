'use client';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import styles from './preview.module.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


export default function Preview({ file, onDelete }) {
  const handleDelete = () => {
    // Call the onDelete function passed as a prop to delete the object from the database
    onDelete(file);
  };

  return (
    <div className={styles.documentWrapper}>
      <a href={file.url}>
      <Document file={file.url} className={styles.document}>
        <Page
          pageNumber={1}
          width={250}
          height={250}
          className={styles.page}
        />
      </Document>
      </a>
      <div className={styles.deleteIcon} onClick={handleDelete}>
        <img src="/icons/cross.png" className={styles.cross}/>
      </div>
    </div>
  );
}
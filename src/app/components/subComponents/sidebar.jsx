"use client";
import React from "react";
import { push as Menu } from "react-burger-menu";
import styles from "./sidebar.module.css";
import { useState } from "react";

const Sidebar = ({
  onUpload,
  onEditToggle,
  showEditOverlay,
  showUploadPopup,
  handleUpload,
  handleCancelUpload,
}) => {
  // Initialize isOpen state
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle menu open state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Menu
      burgerButtonClassName={styles.burgerButton}
      burgerBarClassName={styles.burgerBars}
      menuClassName={styles.menu}
      itemListClassName={styles.itemList}
      morphShapeClassName={styles.morphShape}
      itemClassName={styles.item}
      menuWrapClassName={styles.menuWrap}
      overlayClassName={styles.overlay}
      pageWrapId="page-wrap"
      outerContainerId="outer-container"
      isOpen={isOpen} // Use the isOpen state to control the open state
      customBurgerIcon={<img src="/notes-in-cloud/hmbmenu.svg" alt="" />}
      width={250}
    >
      <a href="#" onClick={onUpload} className={styles.clickableText}>
        Add Slide
      </a>
      {showUploadPopup && (
        <div className={styles.submitButtonContainer}>
          <a href="#" onClick={handleUpload} className={styles.clickableText}>
            Upload
          </a>
          <br />
          <br />
          <a
            href="#"
            onClick={handleCancelUpload}
            className={styles.clickableText}
          >
            Cancel
          </a>
        </div>
      )}
      <a href="#" onClick={onEditToggle} className={styles.clickableText}>
        {showEditOverlay ? "Done" : "Edit Slides "}
      </a>
    </Menu>
  );
};

export default Sidebar;

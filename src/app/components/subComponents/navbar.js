'use client'
// Navbar.jsx

import React from "react";
import styles from "./navbar.module.css";

const Navbar = () => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <p className={styles.logo}>Notes in Cloud</p>
        <ul className={styles.navbarMenu}>
          <li className={`${styles.navbarItem} ${currentPath === "/notes-in-cloud/components/home" ? styles.active : ""}`}>
            <a href="/notes-in-cloud/components/home" className={styles.navbarLink}>
              <p>Home</p>
            </a>
          </li>
          <li className={`${styles.navbarItem} ${currentPath === "/notes-in-cloud/components/profile" ? styles.active : ""}`}>
            <a href="/notes-in-cloud/components/profile" className={styles.navbarLink}>
              <p>Profile</p>
            </a>
          </li>
          <li className={`${styles.navbarItem} ${currentPath === "/notes-in-cloud/components/settings" ? styles.active : ""}`}>
            <a href="/notes-in-cloud/components/settings" className={styles.navbarLink}>
              <p>Settings</p>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

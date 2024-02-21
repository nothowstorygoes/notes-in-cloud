// Navbar.jsx
import React from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
      <p className={styles.logo}>Notes in Cloud</p>
        <ul className={styles.navbarMenu}>
        
          <li className={styles.navbarItem}>
          <a href="/notes-in-cloud/components/home" className={styles.navbarLink}>Home</a>
          </li>
          
          
          <li className={styles.navbarItem}>
          <a href="/notes-in-cloud/components/profile" className={styles.navbarLink}>Profile</a>
          </li>
          
          {/* Add more navbar items as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
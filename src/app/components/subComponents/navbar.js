// Navbar.jsx
import React from 'react';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <ul className={styles.navbarMenu}>
        
          <li className={styles.navbarItem}>
          <a href="/components/home" className={styles.navbarLink}>Home</a>
          </li>
          
          
          <li className={styles.navbarItem}>
          <a href="/components/profile" className={styles.navbarLink}>Profile</a>
          </li>
          
          {/* Add more navbar items as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
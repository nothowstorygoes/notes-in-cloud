"use client";

import React from "react";
import styles from "./navbar.module.css";
import Image from "next/image";

// Navbar component used in all of the app's pages.

const Navbar = () => {
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <nav className={styles.navbar}>
      <ul className={styles.icons}>
        <li className={styles.listIcon}>
          <a href="/notes-in-cloud/components/home" style={{textDecoration: "none"}}>
            <Image
              src="/notes-in-cloud/icons/home.png"
              className={styles.icoItem}
              width={30}
              height={30}
              alt=""
            />
            <p className={styles.iconText}>Home</p>
          </a>
        </li>
        <li className={styles.listIcon}>
          <a href="/notes-in-cloud/components/profile" style={{textDecoration: "none"}}>
            <Image
              src="/notes-in-cloud/icons/profile.png"
              className={styles.icoItem}
              width={30}
              height={30}
              alt=""
            />
            <p className={styles.iconText}>Profile</p>
          </a>
        </li>
        <li className={styles.listIcon}>
          <a href="/notes-in-cloud/components/settings" style={{textDecoration: "none"}}>
            <Image
              src="/notes-in-cloud/icons/settings.png"
              className={styles.icoItem}
              width={30}
              height={30}
              alt=""
            />
            <p className={styles.iconText}>Settings</p>
          </a>
        </li>
      </ul>
      <div className={styles.navbarContainer}>
        <p className={styles.logo}>Notes in Cloud</p>

        <ul className={styles.navbarMenu}>
          <li
            className={`${styles.navbarItem} ${
              currentPath === "/notes-in-cloud/components/home"
                ? styles.active
                : ""
            }`}
          >
            <a
              href="/notes-in-cloud/components/home"
              className={styles.navbarLink}
            >
              <p>Home</p>
            </a>
          </li>
          <li
            className={`${styles.navbarItem} ${
              currentPath === "/notes-in-cloud/components/profile"
                ? styles.active
                : ""
            }`}
          >
            <a
              href="/notes-in-cloud/components/profile"
              className={styles.navbarLink}
            >
              <p>Profile</p>
            </a>
          </li>
          <li
            className={`${styles.navbarItem} ${
              currentPath === "/notes-in-cloud/components/settings"
                ? styles.active
                : ""
            }`}
          >
            <a
              href="/notes-in-cloud/components/settings"
              className={styles.navbarLink}
            >
              <p>Settings</p>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect } from "react";
import styles from "./darkModeToggle.module.css";
import { useState } from "react";
//Component for light/dark theme switch in Settings Page

const ThemeChanger = () => {
  const theme = useState("");
  const [currentTheme, setCurrentTheme] = useState("default");

  useEffect(() => {
    setCurrentTheme(localStorage.getItem('theme') || 'default');
  }, [theme]);

  function setTheme(theme) {

    const root = document.documentElement;

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
    localStorage.setItem("theme", theme);
    }

  return (
    <div>
      <div className={styles.container}>
        <button onClick={() => setTheme("default")} className={styles.button}>
          Classic Blue 
        </button>
        <button onClick={() => setTheme("violet")} className={styles.button}>
          Violet Hue
        </button>
        <button onClick={() => setTheme("green")} className={styles.button}>
          Pastel Green
        </button>
      </div>
    </div>
  );
};

export default ThemeChanger;

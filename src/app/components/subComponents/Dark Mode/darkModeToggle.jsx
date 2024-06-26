import { useTheme } from "next-themes";
import styles from "./darkModeToggle.module.css";

//Component for light/dark theme switch in Settings Page

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className={styles.container}>
        <button onClick={() => setTheme("light")} className={styles.button}>
          Light Mode
        </button>
        <button onClick={() => setTheme("dark")} className={styles.button}>
          Dark Mode
        </button>
      </div>
    </div>
  );
};

export default ThemeChanger;

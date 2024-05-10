import styles from '../components/subComponents/Miscellaneous/offline.module.css'
import Image from 'next/image';

//Fallback component for offline mode

export default function Offline() {
  return (
    <main>
        <div className={styles.offline}>
            <p className={styles.offlineText}>
                Looks like you are offline...
            </p>
            <Image src="/notes-in-cloud/fallback.png"className={styles.offlineImg} alt="" width={100} height={100}/>
        </div>
    </main>
  );
}

import { useState } from 'react';
import styles from './ThemeSection.module.css';

// TODO(step 3): connect this to the app's real theme state
// (context/provider) instead of local component state.
function ThemeSection() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <section>
      <p className={styles.subheading}>Theme</p>

      <label className={styles.option}>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(true)}
        />
        Dark mode
      </label>

      <label className={styles.option}>
        <input
          type="checkbox"
          checked={!isDarkMode}
          onChange={() => setIsDarkMode(false)}
        />
        Light mode
      </label>
    </section>
  );
}

export default ThemeSection;
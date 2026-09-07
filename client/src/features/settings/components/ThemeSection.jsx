import { useTheme } from '../../../theme/context/themeContext';
import { useState } from 'react';
import styles from './ThemeSection.module.css';


function ThemeSection() {
  const { isDarkMode, setTheme } = useTheme();

  return (
    <section>
      <p className={styles.subheading}>Theme</p>

      <label className={styles.option}>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={() => setTheme('dark')}
        />
        Dark mode
      </label>

      <label className={styles.option}>
        <input
          type="checkbox"
          checked={!isDarkMode}
          onChange={() => setTheme('light')}
        />
        Light mode
      </label>
    </section>
  );
}

export default ThemeSection;
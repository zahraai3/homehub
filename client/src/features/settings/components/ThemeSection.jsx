import { useTheme } from '../../../theme/context/themeContext';
import { useState } from 'react';
import styles from './ThemeSection.module.css';
import { Icon } from '@iconify/react';


function ThemeSection() {
  const { isDarkMode, setTheme } = useTheme();

  return (
    <section>
      <h2 className={styles.subheading}>
        <Icon icon='arcticons:theme-store' width={25} />
        Theme</h2>

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
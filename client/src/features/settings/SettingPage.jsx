import HomeInfoSection from './components/HomeInfoSection';
import ExpenseSettingsSection from './components/ExpenseSettingSection';
import MembersSection from './components/MembersSection';
import ThemeSection from './components/ThemeSection';
import DangerZoneSection from './components/DangerZoneSection';
import styles from './SettingPage.module.css';

function SettingsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings</h1>

      {/* One "card" container instead of a bare grid, so the whole
          section reads as one clean block on the page (matches the
          rounded-box look from the original wireframe). */}
      <div className={styles.card}>
        <div className={styles.grid}>
          {/* Left column */}
          <div className={styles.column}>
            <HomeInfoSection />
            <hr className={styles.divider} />
            <ExpenseSettingsSection />
          </div>

          {/* Right column */}
          <div className={styles.column}>
            <MembersSection />
            <hr className={styles.divider} />
            <ThemeSection />
            <hr className={styles.divider} />
            <DangerZoneSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
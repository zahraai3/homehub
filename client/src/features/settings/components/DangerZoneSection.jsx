import styles from './DangerZoneSection.module.css';
import { Icon } from '@iconify/react';
// TODO(step 6): wire up real "leave home" / "delete home"
// logic, each behind a confirmation dialog.
function DangerZoneSection() {
  return (
    <section>
      <h2 className={styles.heading}>
        <Icon icon='at-icons:danger' width='24'/>
         Danger Zone</h2>
      <button className={styles.leave}>Leave Home</button>
      <button className={styles.delete}>Delete Home</button>
    </section>
  );
}

export default DangerZoneSection;
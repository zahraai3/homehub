import styles from './HomeInfoSection.module.css';
import { Icon } from '@iconify/react';

// TODO(step 2): replace these placeholder values with real
// data read from the "homes" collection in Firestore.
const placeholderHome = {
  homeName: 'HomeHub',
  membersCount: 4,
  role: 'Admin',
};

function HomeInfoSection() {
  const { homeName, membersCount, role } = placeholderHome;

  return (
    <section>
    <h2 className={styles.heading}>
        <Icon icon='ant-design:home-twotone' width={24}/>
        Home Information
        </h2>
      <p className={styles.line}>Home Name: {homeName}</p>
      <p className={styles.line}>Members: {membersCount}</p>
      <p className={styles.line}>You are: {role}</p>
    </section>
  );
}

export default HomeInfoSection;
import { useAuth } from '../../auth/context/authContext';
import { useHome } from '../../auth/hooks/useHome';
import { useMembers } from '../../members/hooks/useMembers';
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
const { user } = useAuth();
  const { data: home, isPending: homePending, error: homeError } = useHome(user?.uid);
  const { data: members, isPending: membersPending, error: membersError } = useMembers(user?.uid);

  if (homePending || membersPending) {
    return <p className={styles.stateMessage}>loading...</p>;
  }

  if (homeError || membersError) {
    return (
      <p className={styles.stateMessage}>
        Error Happened{(homeError || membersError).message}
      </p>
    );
  }

  const membersCount = members?.length ?? 0;
  const role = home?.ownerId === user?.uid ? 'Admin' : 'Member';
  return (
    <section>
    <h2 className={styles.heading}>
        <Icon icon='ant-design:home-twotone' width={24}/>
        Home Information
        </h2>
      <p className={styles.line}>Home Name: {home?.homeName}</p>
      <p className={styles.line}>Members: {membersCount}</p>
      <p className={styles.line}>You are: {role}</p>
    </section>
  );
}

export default HomeInfoSection;
import { useAuth } from '../auth/context/authContext';
import { useMembers } from './hooks/useMembers';
import { MemberCard } from './components/MemberCard';
import styles from './MembersPage.module.css';

function MembersPage() {
  const { user } = useAuth();
  const { data: members, isPending, error } = useMembers(user?.uid);

  if (isPending) return <p className={styles.stateMessage}>loading...</p>;
  if (error) return <p className={styles.stateMessage}>Error Happened{error.message}</p>;
  if (!members?.length) return <p className={styles.stateMessage}>No members to display</p>;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {members.map((member) => (
          <MemberCard key={member.uid} member={member} />
        ))}
      </div>
    </div>
  );
}

export default MembersPage
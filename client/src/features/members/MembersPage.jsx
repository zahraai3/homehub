import { useAuth } from '../auth/context/authContext';
import { useMembers } from './hooks/useMembers';
import { MemberCard } from './components/MemberCard';
import { useHome } from '../auth/hooks/useHome';
import InviteCodeBox from './components/InviteCodeBox';
import styles from './MembersPage.module.css';

function MembersPage() {
  const { user } = useAuth();
  const { data: members, isPending, error } = useMembers(user?.uid);
  const { data: home, isPending: isHomePending } = useHome(user?.uid);

  if (isPending) return <p className={styles.stateMessage}>loading...</p>;
  if (error) return <p className={styles.stateMessage}>Error Happened{error.message}</p>;

  return (
    <div className={styles.container}>
      {!isHomePending && home?.inviteCode && (
        <InviteCodeBox inviteCode={home.inviteCode} />
      )}

      {!members?.length ? (
        <p className={styles.stateMessage}>No members to display</p>
      ) : (
        <div className={styles.grid}>
          {members.map((member) => (
            <MemberCard key={member.uid} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MembersPage
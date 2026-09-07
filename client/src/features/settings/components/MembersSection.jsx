import { useAuth } from '../../auth/context/authContext';
import { useHome } from '../../auth/hooks/useHome';
import styles from './MembersSection.module.css';
import { Icon } from '@iconify/react';

// TODO(step 5): render the real members list and wire up
// add/delete logic (with admin-only permission check).
function MembersSection() {

    const { user } = useAuth();
    const { data: home, isPending } = useHome(user?.uid);

  // While home data is loading, default to "not admin" so the
  // delete button doesn't briefly flash as enabled/clickable.
    const isAdmin = !isPending && home?.ownerId === user?.uid;

    return (
    <section>
      <h2 className={styles.heading}>Members</h2>

      {/* Add member: intentionally left as a placeholder for now.
          It should navigate to a separate "add member" page later —
          not wiring that up yet, per current scope. */}
      <button className={styles.action}>+ Add member</button>

      <button
        className={styles.action}
        disabled={!isAdmin}
        title={isAdmin ? undefined : 'Only the home admin can remove members'}
      >
        - Delete member
      </button>
    </section>
  );
}

export default MembersSection;
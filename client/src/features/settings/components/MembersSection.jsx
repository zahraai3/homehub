import styles from './MembersSection.module.css';
import { Icon } from '@iconify/react';
// TODO(step 5): render the real members list and wire up
// add/delete logic (with admin-only permission check).
function MembersSection() {
    return (
    <section>
    <h2 className={styles.heading}>
        <Icon icon='ci:users-group' width='24' /> 
        Members
    </h2>
    <button className={styles.action}>+ Add member</button>
    <button className={styles.action}>- Delete member</button>
    </section>
    );
}

export default MembersSection;
import styles from './LogoutSection.module.css'
import { Icon } from '@iconify/react'
import useLogout from '../../auth/services/useLogout'

function LogoutSection() {
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <section>
      <button
        className={styles.logoutBtn}
        onClick={handleLogout}
        disabled={isPending}
      >
        <Icon icon="bi:box-arrow-right" width={20} />
        {isPending ? 'Logging out...' : 'Logout'}
      </button>
    </section>
  );
}

export default LogoutSection;

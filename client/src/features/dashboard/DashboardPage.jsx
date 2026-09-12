import { useAuth } from '../auth/context/authContext';
import { useHome } from '../auth/hooks/useHome';
import styles from './DashboardPage.module.css';
import { Icon } from '@iconify/react';
import PendingExpensesCard from './components/PendingExpensesCard';
import PendingShoppingListCard from '../shoppingList/components/PendingShoppingListCard';
import PendingTasksCard from '../tasks/components/PendingTasksCard';
import RecentActivityCard from './components/RecentActivityCard';

import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const { data: home, isPending, error } = useHome(user.uid);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.pageName}>
          <Icon icon="material-symbols:empty-dashboard-rounded" width={30} />
          <h1>Dashboard</h1>
        </div>
        <h2>{!isPending && !error ? home?.homeName : ''}</h2>
      </div>

      <div className={styles.cardContainer}>
        <PendingExpensesCard />
        <PendingShoppingListCard />
        <PendingTasksCard />
      </div>

      <div className={styles.recentCard}>
        <hr className={styles['ppc-divider']} />
        <RecentActivityCard />
        <hr className={styles['ppc-divider']} />
      </div>
    </div>
  );
};

export default DashboardPage;
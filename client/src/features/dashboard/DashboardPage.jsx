import { useAuth } from '../auth/context/authContext';
import { useHome } from '../auth/hooks/useHome';
import styles from './DashboardPage.module.css';
import { Icon } from '@iconify/react';

import PendingCardShell from './components/PendingCardShell';
import PendingExpensesCard from './components/PendingExpensesCard';
import PendingShoppingListCard from '../shoppingList/components/PendingShoppingListCard';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const { data: home, isPending, error } = useHome(user.uid);

  const navigate = useNavigate();

  const getTask = () => {
    navigate('tasks');
  };

  const things = [{ name: 'task', func: getTask }];

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
        {things.map((i) => (
          <PendingCardShell key={i.name} cardName={i} />
        ))}
      </div>

      <div className={styles.recentCard}>
        <hr className={styles['ppc-divider']} />
        <div className={styles.recentActiv}>
          <h2>Recent activity : {`( Week ${'first of the week'} - ${'last of the week'})`}</h2>
          <p>Label name - By Name - paid - date : 00/00/2026</p>
        </div>
        <hr className={styles['ppc-divider']} />
      </div>
    </div>
  );
};

export default DashboardPage;
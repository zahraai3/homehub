import styles from '../../dashboard/components/Card.module.css';
import PendingCardShell from '../../dashboard/components/PendingCardShell';
import { usePendingShoppingItemsForUser } from '../hooks/usePendingShoppingItemsForUser';
import { useMarkShoppingItemChecked } from '../../shoppingList/hooks/useMarkShoppingItemChecked';
import { useAuth } from '../../auth/context/authContext';
import { useNavigate } from 'react-router-dom';

function PendingShoppingListCard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { pendingItems, isPending, error } = usePendingShoppingItemsForUser();

  const { mutate, isPending: isCheckPending } = useMarkShoppingItemChecked();

  const handleCheck = (itemId) => {
    mutate({ itemId, userID: user?.uid });
  };

  const goToShoppingList = () => navigate('shoppinglist');

  if (isPending) return <p>Loading...</p>;

  if (error) {
    console.error(error);
    return <p>Something went wrong.</p>;
  }

  return (
    <PendingCardShell
      title="Shopping List"
      isEmpty={pendingItems.length === 0}
      onAddClick={goToShoppingList}
    >
      {pendingItems.map((item) => (
        <div key={item.id} className={styles['ppc-row']}>
          <span className={styles['ppc-label']}>
            {item.name} - {item.quantity}
          </span>
          <button
            type="button"
            className={styles['ppc-pay-btn']}
            onClick={() => handleCheck(item.id)}
            disabled={isCheckPending}
          >
            {isCheckPending ? 'Saving...' : 'Done'}
          </button>
        </div>
      ))}
    </PendingCardShell>
  );
}

export default PendingShoppingListCard;
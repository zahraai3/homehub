import styles from './Card.module.css';
import PendingCardShell from './Card';
import { useMyUnpaidExpenses } from '../../expenses/hooks/useMyExpense';
import { useMarkExpenseAsPaid } from '../../expenses/hooks/useMarkExpenseAsPAid';
import { useAuth } from '../../auth/context/authContext';
import { useUserData } from '../../auth/hooks/useUserData';
import { useNavigate } from 'react-router-dom';

function PendingExpensesCard() {
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);
  const navigate = useNavigate();

  const {
    data: unpaidExpenses,
    isPending,
    error,
  } = useMyUnpaidExpenses(userData?.homeId, user?.uid);

  const { mutate, isPending: isPayPending } = useMarkExpenseAsPaid();

  const myShare = (expense) => {
    const participant = expense.participants.find(
      (p) => p.memberId === user?.uid
    );
    return participant?.share ?? 0;
  };

  const handlePay = (expenseId, userId) => {
    mutate({ expenseId, userId });
  };

  const goToExpenses = () => navigate('expenses');

  if (isPending) return <p>Loading...</p>;

  if (error) {
    console.error(error);
    return <p>Something went wrong.</p>;
  }

  return (
    <PendingCardShell
      title="expense"
      isEmpty={unpaidExpenses.length === 0}
      onAddClick={goToExpenses}
    >
      {unpaidExpenses.map((expense) => (
        <div key={expense.id} className={styles['ppc-row']}>
          <span className={styles['ppc-label']}>
            {expense.title} - {myShare(expense)}$
          </span>
          <button
            type="button"
            className={styles['ppc-pay-btn']}
            onClick={() => handlePay(expense.id, user?.uid)}
            disabled={isPayPending}
          >
            {isPayPending ? 'Paying...' : 'Pay'}
          </button>
        </div>
      ))}
    </PendingCardShell>
  );
}

export default PendingExpensesCard;
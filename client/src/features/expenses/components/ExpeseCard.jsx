import * as React from 'react';
import styles from './ExpenseCard.module.css';
import { useMarkExpenseAsPaid } from '../hooks/useMarkExpenseAsPAid';

export default function ExpenseCard({
  expenseId,
  userId,
  title,
  totalAmount ,
  share,
  isPaid,
  isParticipant,
  collected ,
  memberPaid ,
  pendingPayMember ,
  duaDate,
}) {
  const { mutate, isPending: isPayPending } = useMarkExpenseAsPaid();

  const handlePay = () => {
    mutate({ expenseId, userId });
  };

  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <tbody>
          <tr className={`${styles.row} ${styles.titleRow}`}>
            <td className={styles.titleCell} colSpan={2}>
              {title} //
            </td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Total amount :</td>
            <td className={styles.valueCell}>{totalAmount}$</td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Deadline :</td>
            <td className={styles.valueCell}>{duaDate}</td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>My share :</td>
            <td className={styles.valueCell}>{share}$</td>
          </tr>

          {isParticipant && (
            <tr className={styles.row}>
              <td className={styles.labelCell}>My status :</td>
              <td className={styles.valueCell}>
                {isPaid ? (
                  <span className={styles.paidText}>Paid</span>
                ) : (
                  <button
                    type="button"
                    className={styles.payBtn}
                    onClick={handlePay}
                    disabled={isPayPending}
                  >
                    {isPayPending ? 'Paying...' : 'Pay'}
                  </button>
                )}
              </td>
            </tr>
          )}

          <tr className={styles.row}>
            <td className={styles.labelCell}>Collected amount :</td>
            <td className={styles.valueCell}>{collected}$</td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Paid by :</td>
            <td className={styles.valueCell}>
              {memberPaid.length > 0
                ? memberPaid.map((name) => (
                    <p key={name} className={styles.nameLine}>
                      {name}
                    </p>
                  ))
                : <p>No one has paid yet..</p>}
            </td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Pending :</td>
            <td className={styles.valueCell}>
              {pendingPayMember.length > 0
                ? pendingPayMember.map((name) => (
                    <p key={name} className={styles.nameLine}>
                      {name}
                    </p>
                    
                  ))
                : 'fully paid.'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
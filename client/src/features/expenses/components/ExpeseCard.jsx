import * as React from 'react';
import styles from './ExpenseCard.module.css';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useMarkExpenseAsPaid } from '../hooks/useMarkExpenseAsPAid';
import { useDeleteExpense } from '../hooks/useExpense';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';

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
  const { mutate: deleteExpense, isPending: isDeletePending } = useDeleteExpense();


  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const isFullyPaid = pendingPayMember.length === 0;

  const handlePay = () => {
    mutate({ expenseId, userId });
  };

  const handleDeleteConfirm = () => {
    deleteExpense(expenseId , {
      onSuccess: () => setIsConfirmOpen(false,)
    })
  }

  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <tbody>
          <tr className={`${styles.row} ${styles.titleRow}`}>
            <td className={styles.titleCell} colSpan={2}>
              
              <div className={styles.titleContent}>
                <span className={styles.title}>{title}</span>

                {isFullyPaid && (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => setIsConfirmOpen(true)}
                    aria-label="Delete expense"
                  >
                    <Icon icon="bi:trash" width={20} />
                  </button>
                )}
              </div>

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

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete this expense?"
        message={`"${title}" is fully paid. This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsConfirmOpen(false)}
        isConfirming={isDeletePending}
      />
    </div>
  );
}
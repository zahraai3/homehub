import * as React from 'react';
import styles from './ShoppingItemCard.module.css';

export default function ShoppingItemCard({
  name,
  quantity,
  important,
  assignedToName,
  completed,
  completedByName,
}) {
  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <tbody>
          <tr className={`${styles.row} ${styles.titleRow}`}>
            <td className={styles.titleCell} colSpan={2}>
              {name} {important ? '⭐' : ''}
            </td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Quantity :</td>
            <td className={styles.valueCell}>{quantity}</td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Assigned to :</td>
            <td className={styles.valueCell}>
              {assignedToName || 'Unassigned'}
            </td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Status :</td>
            <td className={styles.valueCell}>
              {completed ? 'Completed' : 'Pending'}
            </td>
          </tr>

          {completed && (
            <tr className={styles.row}>
              <td className={styles.labelCell}>Completed by :</td>
              <td className={styles.valueCell}>
                {completedByName || '—'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
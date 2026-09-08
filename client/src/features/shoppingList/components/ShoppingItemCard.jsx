import * as React from 'react';
import styles from './ShoppingItemCard.module.css';
import { useMarkShoppingItemChecked } from "../hooks/useMarkShoppingItemChecked";
import { Icon } from '@iconify/react';

export default function ShoppingItemCard({
  id,
  name,
  quantity,
  important,
  assignedToName,
  completed,
  completedByName,
  userId,
}) {
  const { mutate, isPending } = useMarkShoppingItemChecked();

  const handleCheck = () => {
    if (completed) return; 

    mutate({
      itemId: id,
      userID: userId,
    });
  };

  

  
  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <tbody>
        <tr className={`${styles.row} ${styles.titleRow}`}>
          <td className={styles.titleCell} colSpan={2}>
            {name}
            {important ? <Icon icon="ant-design:star-twotone" color="#FFD700" width={25} /> : ''}
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
              <label className={styles.checkLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={completed}
                  disabled={isPending || completed}
                  onChange={handleCheck}
                />
                {completed ? 'Completed' : 'Pending'}
              </label>
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
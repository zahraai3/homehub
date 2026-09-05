import * as React from 'react';
import styles from './TaskCard.module.css';
import { useMarkTaskChecked } from "../hooks/useMarkTaskChecked";

export default function TaskCard({
  id,
  name,
  assignedToName,
  createdByName,
  important,
  completed,
  completedByName,
  userId,
}) {
  const { mutate, isPending } = useMarkTaskChecked();

  const handleCheck = () => {
    if (completed) return;

    mutate({
      itemId: id,
      userId: userId,
    });
  };

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
            <td className={styles.labelCell}>Assigned to :</td>
            <td className={styles.valueCell}>
              {assignedToName || 'Unassigned'}
            </td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Created by :</td>
            <td className={styles.valueCell}>
              {createdByName || '—'}
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
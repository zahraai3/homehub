import * as React from 'react';
import styles from './TaskCard.module.css';
import { useMarkTaskChecked } from "../hooks/useMarkTaskChecked";
import { useDeleteTask } from '../hooks/useTasks';
import { Icon } from '@iconify/react'; 
import ConfirmDialog from '../../../shared/components/ConfirmDialog';
import { useState } from 'react';

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
  const { mutate: deleteTask, isPending: isDeletePending } = useDeleteTask();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleCheck = () => {
    if (completed) return;

    mutate({
      itemId: id,
      userId: userId,
    });
  };

  const handleDeleteConfirm = () => {
    deleteTask(id, {
      onSuccess: () => setIsConfirmOpen(false),
    });
  };

  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <tbody>
          <tr className={`${styles.row} ${styles.titleRow}`}>
            <td className={styles.titleCell} colSpan={2}>
              <div className={styles.titleContent}>
                <span>{name} {important ? <Icon icon="ant-design:star-twotone" color="#FFD700" width={25} /> : ''}</span>
                {completed && (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => setIsConfirmOpen(true)}
                    aria-label="Delete task"
                  >
                    <Icon icon="bi:trash" width={20} />
                  </button>
                )}
              </div>
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
                {completed ? (
                  <span className={styles.completedText}>Completed</span>
                ) : (
                  'Pending'
                )}
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

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete this task?"
        message={`"${name}" is completed. This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsConfirmOpen(false)}
        isConfirming={isDeletePending}
      />
    </div>
  );
}
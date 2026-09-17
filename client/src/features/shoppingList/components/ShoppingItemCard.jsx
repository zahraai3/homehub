import * as React from 'react';
import styles from './ShoppingItemCard.module.css';
import { useMarkShoppingItemChecked } from "../hooks/useMarkShoppingItemChecked";
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDeleteShoppingItem } from '../hooks/useShoppingItem';
import ConfirmDialog from '../../../shared/components/ConfirmDialog'

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
  const { mutate: deleteItem, isPending: isDeletePending } = useDeleteShoppingItem();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleCheck = () => {
    if (completed) return; 

    mutate({
      itemId: id,
      userID: userId,
    });
  };

  const handleDeleteConfirm = () => {
    deleteItem(id, {
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
              <span className={styles.nameWithIcon}>
                {name}
                {important ? <Icon icon="ant-design:star-twotone" color="#FFD700" width={25} /> : ''}
              </span>
              {completed && (
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => setIsConfirmOpen(true)}
                  aria-label="Delete item"
                >
                  <Icon icon="bi:trash" width={20} />
                </button>
              )}
            </div>
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
        title="Delete this item?"
        message={`"${name}" is completed. This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsConfirmOpen(false)}
        isConfirming={isDeletePending}
      />
    </div>
  );
}
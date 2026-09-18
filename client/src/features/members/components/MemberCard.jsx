import styles from '../MembersPage.module.css';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useDeleteMember } from '../hooks/useDeleteMember';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';

const FIELDS = [
  { key: 'email', label: 'Gmail' },
  {
    key: 'createdAt',
    label: 'Created At',
    format: (value) => value?.toDate?.().toLocaleDateString('en') ?? '—',
  },
];

export function MemberCard({ member, isCurrentUserAdmin, currentUserId }) {
  const displayName = member.displayName?.trim() || member.email || 'No name';

  const { mutate: deleteMember, isPending: isDeletePending } = useDeleteMember();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const canDelete = isCurrentUserAdmin && member.uid !== currentUserId;

  const handleDeleteConfirm = () => {
    deleteMember(member.uid, {
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
                <p className={styles.nameLine}>{displayName}</p>
                {canDelete && (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={() => setIsConfirmOpen(true)}
                    aria-label="Remove member"
                  >
                    <Icon icon="bi:trash" width={20} />
                  </button>
                )}
              </div>
            </td>
          </tr>

          {FIELDS.map(({ key, label, format }) => {
            const rawValue = member[key];
            if (!rawValue) return null;

            return (
              <tr key={key} className={styles.row}>
                <td className={styles.labelCell}>{label}</td>
                <td className={styles.valueCell}>
                  {format ? format(rawValue) : rawValue}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Remove this member?"
        message={`"${displayName}" will lose access to this home. This action cannot be undone.`}
        confirmText="Remove"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsConfirmOpen(false)}
        isConfirming={isDeletePending}
      />
    </div>
  );
}
import { useState } from "react";
import styles from './TransferOwnershipDialog.module.css'

export default function TransferOwnershipDialog({
  isOpen,
  members,
  currentUserId,
  onConfirm,
  onCancel,
  isConfirming = false,
}) {
  const [selectedMemberId, setSelectedMemberId] = useState('');

  if (!isOpen) return null;

  const eligibleMembers = members.filter((m) => m.uid !== currentUserId);

  const handleConfirm = () => {
    if (!selectedMemberId) return;
    onConfirm(selectedMemberId);
  };

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Leave Home</h3>
        <p className={styles.message}>
          You're the admin of this home. Choose a new admin before you leave.
        </p>

        <select
          className={styles.select}
          value={selectedMemberId}
          onChange={(e) => setSelectedMemberId(e.target.value)}
          disabled={isConfirming}
        >
          <option value="">-- Select new admin --</option>
          {eligibleMembers.map((member) => (
            <option key={member.uid} value={member.uid}>
              {member.displayName || member.email}
            </option>
          ))}
        </select>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancel}
            disabled={isConfirming}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.confirmBtn}
            onClick={handleConfirm}
            disabled={isConfirming || !selectedMemberId}
          >
            {isConfirming ? 'Please wait...' : 'Transfer & Leave'}
          </button>
        </div>
      </div>
    </div>
  );
}
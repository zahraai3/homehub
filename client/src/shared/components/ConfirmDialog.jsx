import styles from './ConfirmDialog.module.css'

export default function ConfirmDialog({
    isOpen,
    title = 'Are you sure?',
    message,
    confirmText= 'Confirm',
    cancelText = 'cancel',
    onConfirm,
    onCancel,
    isConfirming = false,
}) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.title}>{title}</h3>
                {message && <p className={styles.message}>{message}</p>}

                <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.cancelBtn}
                    onClick={onCancel}
                    disabled={isConfirming}
                >
                    {cancelText}
                </button>
                <button
                    type="button"
                    className={styles.confirmBtn}
                    onClick={onConfirm}
                    disabled={isConfirming}
                >
                    {isConfirming ? 'Please wait...' : confirmText}
                </button>
                </div>
            </div>
        </div>
    )
}

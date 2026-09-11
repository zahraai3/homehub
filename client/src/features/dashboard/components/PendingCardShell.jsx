import styles from './Card.module.css';

function PendingCardShell({ title, isEmpty, onAddClick, children }) {
  return (
    <div className={styles['ppc-card']}>
      <p className={styles['ppc-title']}>pending {title}</p>
      <hr className={styles['ppc-divider']} />
      {isEmpty ? (
        <div className={styles.emptyCard}>
          <p className={styles.emptyData}>Nothing here yet..</p>
          <button className={styles['ppc-pay-btn']} onClick={onAddClick}>
            Add
          </button>
        </div>
      ) : (
        children
      )}
      <hr className={styles['ppc-divider']} />
    </div>
  );
}

export default PendingCardShell;
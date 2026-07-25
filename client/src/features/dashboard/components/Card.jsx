import { useState } from 'react';
import styles from './Card.module.css';

function Card({
  deadline = '07/12/2026',
  bills = [
    { id: 'water', label: 'water bill', amount: 25, payable: true },
    { id: 'wifi', label: 'wifi', amount: 10, payable: false },
    { id: 'rent', label: 'rent', amount: 100, payable: false },
  ],
  onPay,
}) {
  const [paidIds, setPaidIds] = useState([]);

  const togglePay = (id) => {
    setPaidIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
    if (onPay) onPay(id);
  };

  return (
    <div className={styles['ppc-card']}>
      <p className={styles['ppc-title']}>pending payment</p>
      <hr className={styles['ppc-divider']} />
      <p className={styles['ppc-deadline']}>
        deadline - <b>{deadline}</b>
      </p>

      {bills.map((bill) => {
        const isPaid = paidIds.includes(bill.id);
        return (
          <div
            key={bill.id}
            className={`${styles['ppc-row']}${isPaid ? ` ${styles['ppc-row--paid']}` : ''}`}
          >
            <span className={styles['ppc-label']}>
              {bill.label} - {bill.amount}$
            </span>
            {bill.payable && (
              <button
                type="button"
                className={styles['ppc-pay-btn']}
                onClick={() => togglePay(bill.id)}
              >
                {isPaid ? 'paid' : 'pay'}
              </button>
            )}
          </div>
        );
      })}

      <hr className={styles['ppc-divider']} />
    </div>
  );
}

export default Card;
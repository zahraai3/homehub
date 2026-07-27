import * as React from 'react';
import styles from './ExpenseCard.module.css';

export default function ExpenseCard({
  title = 'Rent',
  totalAmount = '500',
  share = '100',
  collected = '200',
  memberPaid = ['Sarah', 'Zoey'],
  pendingPayMember = ['Mustafa'],
  duaDate = '1/1/2005',
}) {
  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <tbody>
          <tr className={`${styles.row} ${styles.titleRow}`}>
            <td className={styles.titleCell} colSpan={2}>
              {title} //
            </td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Total amount :</td>
            <td className={styles.valueCell}>{totalAmount}$</td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Deadline :</td>
            <td className={styles.valueCell}>{duaDate}</td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>My share :</td>
            <td className={styles.valueCell}>{share}$</td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Collected amount :</td>
            <td className={styles.valueCell}>{collected}$</td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Paid by :</td>
            <td className={styles.valueCell}>
              {memberPaid.length > 0
                ? memberPaid.map((name) => (
                    <p key={name} className={styles.nameLine}>
                      {name}
                    </p>
                  ))
                : <p>No one has paid yet..</p>}
            </td>
          </tr>

          <tr className={styles.row}>
            <td className={styles.labelCell}>Pending :</td>
            <td className={styles.valueCell}>
              {pendingPayMember.length > 0
                ? pendingPayMember.map((name) => (
                    <p key={name} className={styles.nameLine}>
                      {name}
                    </p>
                    
                  ))
                : 'fully paid.'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
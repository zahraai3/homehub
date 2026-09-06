import styles from '../MembersPage.module.css';

const FIELDS = [
  { key: 'email', label: 'Gmail' },
  {
    key: 'createdAt',
    label: 'Created At',
    format: (value) => value?.toDate?.().toLocaleDateString('en') ?? '—',
  },
];

export function MemberCard({ member }) {
  const displayName = member.displayName?.trim() || member.email || 'No name';

  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <tbody>
          <tr className={`${styles.row} ${styles.titleRow}`}>
            <td className={styles.titleCell} colSpan={2}>
              <p className={styles.nameLine}>{displayName}</p>
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
    </div>
  );
}
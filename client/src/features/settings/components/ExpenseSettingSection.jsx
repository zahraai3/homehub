import { useState } from 'react';
import styles from './ExpenseSettingSection.module.css';
import { Icon } from '@iconify/react';

// TODO(step 4): disable/grey out "Custom Split" and add the
// "unavailable for now" label. Left as a normal option here
// since Step 1 is just matching the wireframe layout.
function ExpenseSettingsSection() {
  const [splitMethod, setSplitMethod] = useState('equal');

  return (
    <section>
      <h2 className={styles.heading}>
        <Icon icon="arcticons:air-wallet" width="24" />
        Expense Settings
        </h2>
      <p className={styles.subheading}>Split Method</p>

      <label className={styles.option}>
        <input
          type="radio"
          name="splitMethod"
          value="equal"
          checked={splitMethod === 'equal'}
          onChange={(e) => setSplitMethod(e.target.value)}
        />
        Equal Split
      </label>

      <label className={styles.option}>
        <input
          type="radio"
          name="splitMethod"
          value="custom"
          checked={splitMethod === 'custom'}
          onChange={(e) => setSplitMethod(e.target.value)}
        />
        Custom Split (not available yet..)
      </label>
    </section>
  );
}

export default ExpenseSettingsSection;
import { useState } from 'react';
import styles from './Card.module.css';

function Card({ cardName = "expense" }) {

  return(
    <div className={styles['ppc-card']}>
      <p className={styles['ppc-title']}>pending {cardName} </p>
      <hr className={styles['ppc-divider']} />
      <div className={styles.emptyCard}>
        <p className={styles.emptyData}>Nothing here yet..</p> 
        <button className={styles['ppc-pay-btn']}>Add {cardName}</button>
      </div>
    </div>
  )

}

export default Card;
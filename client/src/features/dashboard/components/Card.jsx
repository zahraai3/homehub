import { useState } from 'react';
import styles from './Card.module.css';

function Card({ cardName }) {

  return(
    <div className={styles['ppc-card']}>
      <p className={styles['ppc-title']}>pending {cardName.name} </p>
      <hr className={styles['ppc-divider']} />
      <div className={styles.emptyCard}>
        <p className={styles.emptyData}>Nothing here yet..</p> 
        <button className={styles['ppc-pay-btn']} onClick={cardName.func}>Add</button>
      </div>
    </div>
  )

}

export default Card;
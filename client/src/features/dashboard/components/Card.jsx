import { useState } from 'react';
import styles from './Card.module.css';
import { useMyUnpaidExpenses } from '../../expenses/hooks/useMyExpense';
import { useAuth } from '../../auth/context/authContext';
import { useUserData } from '../../auth/hooks/useUserData';

function Card({ cardName }) {

  const [payBtn , setPayBtn] = useState('Pay')

  const {user} = useAuth()
  const {data: userData} = useUserData(user?.uid)

  const {data: unpaidExpenses , isPending , error} = 
    useMyUnpaidExpenses(userData?.homeId , user?.uid);

  const myShare = (expense) => {
    const participant = expense.participants.find(
        (participant) => participant.memberId === user?.uid
    );

    return participant?.share ?? 0;
}

  const handlePay = () => {
    //idk yet about lojic w firebase 
    setPayBtn('Paid')
    console.log('PAYYYYY');
    
  }


  if (isPending) return <p>Loading...</p>;

if (error) {
  console.log(error);
  return <p>Something went wrong.</p>;
}  return(
    <div className={styles['ppc-card']}>
      <p className={styles['ppc-title']}>pending {cardName.name} </p>
      <hr className={styles['ppc-divider']} />
      {unpaidExpenses?.length === 0 ? 
        <div className={styles.emptyCard}>
          <p className={styles.emptyData}>Nothing here yet..</p> 
          <button className={styles['ppc-pay-btn']} onClick={cardName.func}>Add</button>
        </div> 
        :(
          unpaidExpenses.map((expense) => {
            return(
              <div key={expense.id} className={`${styles['ppc-row']} ${payBtn == 'Paid' ? ` ${styles['ppc-row--paid']}` : ''}`}>
                <span className={styles['ppc-label']}>
                  {expense.title} - {myShare(expense)}$
                </span>
                {payBtn == 'Pay' && (
                  <button 
                    type="button"
                    className={styles['ppc-pay-btn']}
                    onClick={() => handlePay()}
                    >
                      {payBtn}
                    </button>
                )}
              </div>
            )
          }))
      }
      <hr className={styles['ppc-divider']} />
    </div>
  )

}

export default Card;
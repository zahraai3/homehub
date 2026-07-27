import {doc, setDoc,getDoc,updateDoc,serverTimestamp, addDoc, collection, query, where, getDocs} from 'firebase/firestore'
import { db } from '../../../lib/firebase';

export async function getMyUnpaidExpenses(homeId , userId) {
    
    const q = query(
        collection(db , 'expenses'),
        where('homeId' , '==' , homeId),
    )

    const allExpensesSnaps = await getDocs(q)

    if(allExpensesSnaps.empty){
        return [];
    }

    const expenses = allExpensesSnaps.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
        })) 

    const myUnpaidExpenses = expenses.filter(expense => 
        expense.participants.some(
            participant => 
                participant.memberId === userId &&
                participant.paid === false
        )
    );

    return myUnpaidExpenses
}

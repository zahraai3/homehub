import {doc, setDoc,getDoc,updateDoc,serverTimestamp, addDoc, collection, query, where, getDocs} from 'firebase/firestore'
import { db } from '../../../lib/firebase';
import { logActivity } from '../../dashboard/services/logActivity';

export async function markExpenseAsPaid({expenseId , userId}) {
    
    const expenseRef = doc(db , 'expenses' , expenseId)
    const expenseSnap = await getDoc(expenseRef)

    if(!expenseSnap.exists()){
        throw new Error('EXPENSEE NOTT FOUND')
    }

    const expenseData = {id: expenseSnap.id , ...expenseSnap.data()}

    const expenseUserData = expenseData.participants.find(
        (participant) => participant.memberId === userId
    )

    if(!expenseUserData){
        throw new Error('participantt noott ffouunnddd')
    }

    expenseUserData.paid = true;
    await updateDoc(expenseRef , {
        participants: expenseData.participants
    })

    try {
        await logActivity({
            homeId: expenseData.homeId,
            type: 'expense_paid',
            performedBy: userId,
            label: expenseData.title,
            amount: expenseUserData.share,
        })
    } catch (error) {
        console.error('FAILED TO LOG ACTIVITY (expense_paid):', error)
    }
}

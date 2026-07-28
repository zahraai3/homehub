import {doc, setDoc,getDoc,updateDoc,serverTimestamp, addDoc, collection, query, where, getDocs} from 'firebase/firestore'
import { db } from '../../../lib/firebase';

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
}

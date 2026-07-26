import {doc, setDoc,getDoc,updateDoc,serverTimestamp, addDoc, collection} from 'firebase/firestore'
import { db } from '../../../lib/firebase'

export async function createExpens({expense , homeId , users}) {
    const expenseDocRef = await addDoc(collection(db , 'expenses'),{
        homeId: homeId,
        title: expense.title,
        totalAmount:expense.totalAmount,
        dueDate:expense.dueDate,
        createdBy:expense.createdBy,
        participants: users.map(user => ({
            memberId: user.uid,
            share: expense.totalAmount / users.length,
            paid:false
        })),
        createdAt:serverTimestamp()
    })

    return {
        id: expenseDocRef.id,
        homeId,
        title: expense.title,
        totalAmount: expense.totalAmount,
        dueDate: expense.dueDate
    }
}


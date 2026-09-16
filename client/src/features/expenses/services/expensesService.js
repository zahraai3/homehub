import {doc, setDoc,getDoc,updateDoc,serverTimestamp, addDoc, collection, query, where, getDocs, deleteDoc} from 'firebase/firestore'
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

export async function getAllExpenses(homeId) {
    
    const q = query(
        collection(db , 'expenses'),
        where("homeId", "==", homeId)
    )

    const allExpenseSnaps = await getDocs(q)

    if(allExpenseSnaps.empty){
        return [];
    }

    return allExpenseSnaps.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
    }))
}

export async function deleteExpense(expenseId) {
    const expenseRef = doc(db , 'expenses' , expenseId)
    const expenseSnap = await getDoc(expenseRef)

    if(!expenseSnap.exists()){
        throw new Error('EXPENSEE NOT FOUND')
    }

    await deleteDoc(expenseRef)
}

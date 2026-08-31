import {doc, setDoc,getDoc,updateDoc,serverTimestamp, addDoc, collection, query, where, getDocs , deleteDoc} from 'firebase/firestore'
import { db } from '../../../lib/firebase';

export async function markShoppingItemChecked({itemId , userID}) {
    const shoppingItemRef = doc(db , 'shoppingListItems' , itemId)
    const shoppingItemSnap = await getDoc(shoppingItemRef)

    if(!shoppingItemSnap.exists()){
        throw new Error('SHOPPING LIST ITEM NOT FOUND')
    }

    await updateDoc(shoppingItemRef , {
        completed: true,
        completedBy: userID
    })

}

export async function makeShoppingItemImportant(itemId) {
    const shoppingItemRef = doc(db , 'shoppingListItems' , itemId)
    const shoppingItemSnap =await getDoc(shoppingItemRef)

    if(!shoppingItemSnap.exists()){
        throw new Error('IIITEM NOT FOUND ')
    }

    await updateDoc(shoppingItemRef , {
        important: true
    })
}

export async function updateShoppingListItem({ itemId , updates}){
    const shoppingItemRef = doc(db , 'shoppingListItems' , itemId)

    const shoppingItemSnap = await getDoc(shoppingItemRef)

    if(!shoppingItemSnap.exists()){
        throw new Error('NOOTT FOUNNDDD IITEEM ')
    }

    await updateDoc(shoppingItemRef , updates)
}


export async function deleteShoppingListItem(itemId) {
    const shoppingItemRef = doc(db, 'shoppingListItems', itemId)

    const shoppingItemSnap = await getDoc(shoppingItemRef)

    if (!shoppingItemSnap.exists()) {
        throw new Error('ITEM NOT FOUND')
    }

    await deleteDoc(shoppingItemRef)
}
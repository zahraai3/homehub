import {doc, setDoc,getDoc,updateDoc,serverTimestamp, addDoc, collection, query, where, getDocs , deleteDoc} from 'firebase/firestore'
import { db } from '../../../lib/firebase';
import { logActivity } from '../../dashboard/services/logActivity';

export async function markShoppingItemChecked({itemId , userID}) {
    const shoppingItemRef = doc(db , 'shoppingListItems' , itemId)
    const shoppingItemSnap = await getDoc(shoppingItemRef)

    if(!shoppingItemSnap.exists()){
        throw new Error('SHOPPING LIST ITEM NOT FOUND')
    }

    const shoppingItemData = shoppingItemSnap.data()

    await updateDoc(shoppingItemRef , {
        completed: true,
        completedBy: userID
    })

    try {
        await logActivity({
            homeId: shoppingItemData.homeId,
            type: 'item_purchased',
            performedBy: userID,
            label: shoppingItemData.name,
        })
    } catch (error) {
        console.error('FAILED TO LOG ACTIVITY (item_purchased):', error)
    }
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
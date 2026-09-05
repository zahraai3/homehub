import { serverTimestamp, addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import {db} from '../../../lib/firebase'

export async function createShoppingListItem({shoppingList , homeId}){
    const shoppingListDocRef = await addDoc(collection(db , 'shoppingListItems'), {
        homeId : homeId,
        name: shoppingList.name,
        quantity : shoppingList.quantity,
        important: shoppingList.important, 
        assignedTo : shoppingList.assignedTo,
        completed : false,
        completedBy : null,
        createdBy : shoppingList.createdBy,
        createdAt : serverTimestamp()
    })

    return {
        id: shoppingListDocRef.id,
        homeId,
        name : shoppingList.name,
        quantity : shoppingList.quantity,
        important : shoppingList.important,
        assignedTo : shoppingList.assignedTo,
    }
}

export async function getAllShoppingItems(homeId) {
    const q = query(
        collection(db , 'shoppingListItems'), 
        where("homeId" , '==' , homeId)
    )

    const shoppingItemsSnaps = await getDocs(q)

    if(shoppingItemsSnaps.empty){
        return []
    }

    return shoppingItemsSnaps.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}

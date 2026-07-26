import {doc, setDoc,getDoc,updateDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../../../lib/firebase'

export async function createUser(user) {

    await setDoc(doc(db, 'users', user.uid), {
        email:user.email,
        displayName:user.displayName,
        homeId:user.homeId,
        createdAt: serverTimestamp(),
    })
}

export async function getUser(userId) {
    const userRef = doc(db, "users" , userId)
    const userSnap = await getDoc(userRef)

    if(!userSnap.exists()){
        throw new Error("USUERRE NOOTT FOUUNNDD")
    }

    return{
        id:userId,
        ...userSnap.data()
    }
}
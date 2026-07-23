import {doc, setDoc,getDoc,updateDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../lib/firebase'

export async function createUser(user) {

    await setDoc(doc(db, 'users', user.uid), {
        email:user.email,
        displayName:user.displayName,
        homeId:user.homeId,
        createdAt: serverTimestamp(),
    })
}


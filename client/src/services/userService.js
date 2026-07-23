import {doc, setDoc,getDoc,updateDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../lib/firebase'

import generateInviteCode from '../shared/utils/generateInviteCode'

export async function createHome(home) {

    if (!home.homeId) {
        throw new Error("Home ID is required")
    }

    const inviteCode = generateInviteCode()

    await setDoc(doc(db, 'homes', home.homeId), {
        homeName:home.name,
        inviteCode:inviteCode,
        ownerId:home.ownerId,
        createdAt : serverTimestamp(),
    })

    return {
        homeId:home.homeId,
        inviteCode
    }
}


export async function createUser(user) {

    await setDoc(doc(db, 'users', user.uid), {
        email:user.email,
        displayName:user.displayName,
        homeId:user.homeId,
        createdAt: serverTimestamp(),
    })
}


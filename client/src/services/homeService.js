import {doc, setDoc,getDoc,updateDoc,serverTimestamp} from 'firebase/firestore'
import { db } from '../lib/firebase'

import generateInviteCode from '../shared/utils/generateInviteCode'

export async function createHome(home) {

    const inviteCode = generateInviteCode()

    const homeDocRef = await setDoc(doc(db, 'homes'), {
        homeName:home.name,
        inviteCode:inviteCode,
        ownerId:home.ownerId,
        createdAt : serverTimestamp(),
    })

    return {
        homeId: homeDocRef.id,
        inviteCode
    }
}

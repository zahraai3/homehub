import {doc,collection, addDoc,getDoc,updateDoc,serverTimestamp, query, where, getDocs} from 'firebase/firestore'
import { db } from '../../../lib/firebase'

import generateInviteCode from '../utils/generateInviteCode'

export async function createHome(home) {

    const inviteCode = generateInviteCode()

    const homeDocRef = await addDoc(collection(db, 'homes'), {
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

export async function getHome(userId) {
    const userRef = doc(db, "users" , userId)
    const userSnap = await getDoc(userRef)

    if(!userSnap.exists()){
        throw new Error("USUERRE NOOTT FOUUNNDD")
    }
    
    const homeId = userSnap.data().homeId

    const homeRef = doc(db , 'homes' , homeId)
    const homeSnap = await getDoc(homeRef)

    if(!homeSnap.exists()){
        throw new Error('HOME NOT FOUNDDD')
    }

    return{
        id:homeSnap.id,
        ...homeSnap.data()
    }
}
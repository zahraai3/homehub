import {doc,collection, addDoc,getDoc,updateDoc,serverTimestamp, query, where, getDocs} from 'firebase/firestore'
import { db } from '../../../lib/firebase'

export async function getMembers(userId) {
    const userRef = doc(db, "users" , userId)
    const userSnap = await getDoc(userRef)

    if(!userSnap.exists()){
        throw new Error("USUERRE NOOTT FOUUNNDD")
    }
    
    const homeId = userSnap.data().homeId

    const usersCollectionRef = collection(db , 'users')
    const q = query(   
        usersCollectionRef ,
        where('homeId' , '==' , homeId)
    );

    const usersSnaps = await getDocs(q);


    if(usersSnaps.empty){
        throw new Error('USERSSS NOT FOUNDDD')
    }

    return usersSnaps.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
    }));

}
// return an array of users 
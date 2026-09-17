import { doc , getDoc , deleteDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export async function deleteMember(memberId) {
    const memberRef = doc(db , 'users' , memberId)
    const memberSnap = await getDoc(memberRef)

    if(!memberSnap.exists()){
        throw new Error('MEMBER NOT FOUND')
    }

    await deleteDoc(memberRef)

}

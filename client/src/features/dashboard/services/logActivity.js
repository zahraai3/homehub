import { collection , addDoc , serverTimestamp } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export async function logActivity({homeId , type , performedBy , label , amount = null}) {
    const activityLogRef = collection(db , 'activityLog')

    await addDoc(activityLogRef, {
        homeId,
        type,
        performedBy,
        label,
        amount,
        createdAt:serverTimestamp(),
    })
}

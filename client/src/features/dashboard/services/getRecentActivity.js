import { collection, query , where , orderBy , limit , getDocs, doc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export async function getRecentActivity(homeId) {
    const q = query(
        collection(db , 'activityLog'),
        where('homeId' , '==' , homeId),
        orderBy('createdAt', 'desc'),
        limit(10)
    )

    const activitySnaps = await getDocs(q)

    if(activitySnaps.empty){
        return []
    }

    return activitySnaps.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
}

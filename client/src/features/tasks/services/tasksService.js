import {serverTimestamp, addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import {db} from '../../../lib/firebase'

export async function createTask({task, homeId}){
    const itemDocRef = await addDoc(collection(db , 'tasks' ),{
        homeId: homeId,
        name: task.name,
        assignedTo:task.assignedTo,
        createdBy:task.createdBy,
        important:false,
        completedBy: null,
        completed:false,
        createdAt:serverTimestamp()
    })

    return {
        id:task.id,
        homeId,
        name:task.name,
        important:task.important,
        assignedTo:task.assignedTo,
    }
}

export async function getAllTasks(homeId) {
    const  q = query(
        collection(db , 'tasks'),
        where('homeId' , '==' , homeId)
    )

    const tasksSnaps = await getDocs(q)

    if(tasksSnaps.empty){
        return []
    }

    return tasksSnaps.docs.map(doc => ({
        id:doc.id,
        ...doc.data()
    }))
}



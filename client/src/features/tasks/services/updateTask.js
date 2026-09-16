import {doc,getDoc,updateDoc, deleteDoc} from 'firebase/firestore'
import { db } from '../../../lib/firebase';
import { logActivity } from '../../dashboard/services/logActivity';

export async function markTaskChecked({itemId , userId}) {
    const taskRef = doc(db , 'tasks' , itemId)
    const taskSnap = await getDoc(taskRef)

    if(!taskSnap.exists()){
        throw new Error('TASKK NOT FOUND')
    }

    const taskData = taskSnap.data()

    await updateDoc(taskRef , {
        completed : true,
        completedBy : userId
    })

    try {
        await logActivity({
            homeId: taskData.homeId,
            type: 'task_completed',
            performedBy: userId,
            label: taskData.name,
        })
    } catch (error) {
        console.error('FAILED TO LOG ACTIVITY (task_completed):', error)
    }
}

export async function markTaskImportant(itemId) {
    const taskRef = doc(db , 'tasks' , itemId)
    const taskSnap = await getDoc(taskRef)

    if(!taskSnap.exists()){
        throw new Error('TASSKK NOT FOUNDD')
    }

    await updateDoc(taskRef , {
        important: true
    })
}

export async function deleteTask(itemId) {
    const taskRef = doc(db , 'tasks' , itemId)
    const taskSnap = await getDoc(taskRef)

    if(!taskSnap.exists()){
        throw new Error('TASSKK NOT FOUNDD')
    }

    await deleteDoc(taskRef)
}


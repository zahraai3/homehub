import {doc,getDoc,updateDoc, deleteDoc} from 'firebase/firestore'
import { db } from '../../../lib/firebase';

export async function markTaskChecked({itemId , userId}) {
    const taskRef = doc(db , 'tasks' , itemId)
    const taskSnap = await getDoc(taskRef)

    if(!taskSnap.exists()){
        throw new Error('TASKK NOT FOUND')
    }

    await updateDoc(taskRef , {
        completed : true,
        completedBy : userId
    })
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

export async function updateTask({itemId , updates}) {
    const taskRef = doc(db , 'tasks' , itemId)
    const taskSnap = await getDoc(taskRef)

    if(!taskSnap.exists()){
        throw new Error('TASSKK NOT FOUNDD')
    }

    await updateDoc(taskRef , updates)
}

export async function deleteTask(itemId) {
    const taskRef = doc(db , 'tasks' , itemId)
    const taskSnap = await getDoc(taskRef)

    if(!taskSnap.exists()){
        throw new Error('TASSKK NOT FOUNDD')
    }

    await deleteDoc(taskRef)
}


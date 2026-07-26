import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import {auth} from "../../../lib/firebase";

export async function register(email, password){
    return createUserWithEmailAndPassword(
        auth, email, password
    );
}

export async function login(email,password){
    return signInWithEmailAndPassword(
        auth, email, password
    )
}

export function logout() {
    return signOut(auth);
}

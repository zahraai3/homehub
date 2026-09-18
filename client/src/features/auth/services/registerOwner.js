import { createUser } from "./userService";
import { createHome } from "./homeService";
import { register } from "./authService";

export async function registerOwner(data) {
    //1 authintication 
    const userCredential = await register(data.email , data.password);
    const firebaseUser = userCredential.user;

    //2creating home doc
    const home = await createHome({
        name:data.homeName,
        ownerId: firebaseUser.uid,
    });

    //3creating user doc
    const userdoc = await createUser({
        uid: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: data.displayName,
        homeId: home.homeId,
    });

    return userCredential
}

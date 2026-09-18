import { getHomeByInviteCode } from "./homeService";
import { register } from "./authService";
import { createUser } from "./userService";

export async function registreMember(data) {
    //1 authintication
    const userCredential = await register(data.email , data.password)
    const firebaseUser = userCredential.user

    //2 find home by invite code
    const home = await getHomeByInviteCode(data.invite)

    //3 creating user doc
    await createUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: data.displayName,
        homeId: home.homeId,
    })

    return userCredential

}

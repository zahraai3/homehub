import { createContext , useState, useEffect} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../lib/firebase";

export const AuthContext = createContext(null);

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);

    return(
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);

    if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
    } 

    return context;
}

export {AuthProvider, useAuth}


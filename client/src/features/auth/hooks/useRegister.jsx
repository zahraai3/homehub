import {useMutation} from "@tanstack/react-query";
import { registerOwner } from "../../../services/registerOwner";


const useRegister = () => {
    return useMutation({
        mutationFn: registerOwner,

        onSuccess: () => {
            console.log("User registered successfully");
        },

        onError: (error) => {
            console.error("Error registering user:", error);
        }
    })
}

export default useRegister;
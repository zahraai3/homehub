import {useMutation} from "@tanstack/react-query";
import { registerOwner } from "../../../services/registerOwner";
import { Navigate } from "react-router-dom";


const useRegister = () => {
    return useMutation({
        mutationFn: registerOwner,

        onError: (error) => {
            console.error("Error registering user:", error);
        }
    })
}

export default useRegister;
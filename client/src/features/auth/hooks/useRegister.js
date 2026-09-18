import {useMutation} from "@tanstack/react-query";
import { registerOwner } from "../services/registerOwner";
import { Navigate } from "react-router-dom";
import { registreMember } from "../services/registerMember";


const registerUser = (data) => {
    return data.createHome
        ? registerOwner(data)
        : registreMember(data)
}

const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,

        onError: (error) => {
            console.error('Error registering user:' , error)
        }
    })
}

export default useRegister;
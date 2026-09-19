import { useMutation } from "@tanstack/react-query";
import { deleteMember } from "../services/deleteMember";
import { logout } from "../../auth/services/authService";

const useLeaveHome = () => {
    return useMutation({
        mutationFn: deleteMember,

        onSuccess: async () => {
            await logout()
        },

        onError: (error) => {
            console.error('ERROR LEAVING HOME', error);
        }
    })
}

export {useLeaveHome}


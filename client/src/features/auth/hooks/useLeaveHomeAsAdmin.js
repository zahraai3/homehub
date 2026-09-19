import { useMutation } from "@tanstack/react-query";
import { transferOwnerShip } from "../services/homeService";
import { deleteMember } from "../../members/services/deleteMember";
import { logout } from "../services/authService";

const useLeaveHomeAsAdmin = () => {
    return useMutation({
        mutationFn: async ({ homeId , newOwnerId , currentAdmin}) => {
            await transferOwnerShip({homeId , newOwnerId })
            await deleteMember(currentAdmin)
        },

        onSuccess: async () => {
            await logout()
        },

        onError: (error) => {
            console.error('ERROR LEAVING HOME AS ADMIN' , error);
        }, 

    })
}

export { useLeaveHomeAsAdmin }
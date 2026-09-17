import { useMutation , useQueryClient } from "@tanstack/react-query";
import { deleteMember } from "../services/deleteMember";

const useDeleteMember = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteMember,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:['members']
            })
        },

        onError: (error) => {
            console.error('ERROR DELETING MEMBER' , error);
        }
    })
}

export {useDeleteMember}
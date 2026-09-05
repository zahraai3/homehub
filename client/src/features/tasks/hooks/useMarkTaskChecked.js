import { useMutation , useQueryClient } from "@tanstack/react-query";
import { markTaskChecked } from "../services/updateTask";

const useMarkTaskChecked = () => {
    const queryclient = useQueryClient()

    return useMutation({
        mutationFn: markTaskChecked,

        onError: (error) => {
            console.error('ERRORR TAS: CANT BE CHECKED ');
        },

        onSuccess: () => {
            queryclient.invalidateQueries({
                queryKey:['my-checked-tasks']
            })

            queryclient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
}

export { useMarkTaskChecked}

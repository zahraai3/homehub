import { useMutation } from "@tanstack/react-query";
import { createTask, getAllTasks } from "../services/tasksService";
import { useQuery , useQueryClient } from "@tanstack/react-query";
import { query } from "firebase/firestore";

const useAddTask = () => {
    const queryclient = useQueryClient()

    return useMutation({
        mutationFn: createTask,

        onError: (error) => {
            console.error('ERORR ADDINGG TASKKK');
        },

        onSuccess: () => {
            queryclient.invalidateQueries({
                queryKey:['tasks']
            });
        }
    })
}


const useAllTasks = (homeId) => {
    return useQuery({
        queryKey: ['tasks' , homeId],
        queryFn: () => getAllTasks(homeId),
        enabled: !!homeId
    })
}

export {useAddTask , useAllTasks}; 
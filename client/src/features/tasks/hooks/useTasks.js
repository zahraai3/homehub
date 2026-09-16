import { useMutation } from "@tanstack/react-query";
import { createTask, getAllTasks } from "../services/tasksService";
import { deleteTask } from "../services/updateTask";
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

const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            });
        },

        onError: (error) => {
            console.error('ERROR DELETING TASK', error);
        },
    });
}

export {useAddTask , useAllTasks , useDeleteTask};  
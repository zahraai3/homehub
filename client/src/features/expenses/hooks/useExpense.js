import {useMutation} from "@tanstack/react-query";
import { createExpens } from "../services/expensesService";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const useExpense = () => {
    const queryclient = useQueryClient()

    return useMutation({
        mutationFn: createExpens,

        onError: (error) => {
            console.error('ERROR EXPENSE CREATING' , error);
        },

        onSuccess: () => {
            queryclient.invalidateQueries({queryKey:['expenses']});
        }
    })
}

export default useExpense;

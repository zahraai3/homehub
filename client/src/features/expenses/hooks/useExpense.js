import {useMutation} from "@tanstack/react-query";
import { createExpens, getAllExpenses } from "../services/expensesService";
import { Navigate } from "react-router-dom";
import { useQueryClient , useQuery } from "@tanstack/react-query";

const useAddExpense = () => {
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

const useAllExpense = (homeId) => {
    return useQuery({
        queryKey:['expenses',homeId],
        queryFn: () => getAllExpenses(homeId),
        enabled:!!homeId
    })
}

export {useAddExpense , useAllExpense};

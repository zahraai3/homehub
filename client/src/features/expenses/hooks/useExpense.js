import {useMutation} from "@tanstack/react-query";
import { createExpens } from "../../../services/expensesService";
import { Navigate } from "react-router-dom";

const useExpense = () => {
    return useMutation({
        mutationFn: createExpens,

        onError: (error) => {
            console.error('ERROR EXPENSE CREATING' , error);
        }
    })
}

export default useExpense;

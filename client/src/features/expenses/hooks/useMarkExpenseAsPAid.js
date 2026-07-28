import { useMutation ,useQuery , useQueryClient} from "@tanstack/react-query";
import { markExpenseAsPaid } from "../services/markExpenseAsPaid";

const useMarkExpenseAsPaid = () => {
    const queryclient = useQueryClient()

    return useMutation({
        mutationFn: markExpenseAsPaid,

        onError: (error) => {
            console.error('ERRROORRR UUSER EXPENSE CANT PAID ' , error);
        },

        onSuccess: () => {
            queryclient.invalidateQueries({
            queryKey: ["my-unpaid-expenses"]
            });

            queryclient.invalidateQueries({
                queryKey: ["expenses"]
            });
        }
    })
}

export {useMarkExpenseAsPaid};
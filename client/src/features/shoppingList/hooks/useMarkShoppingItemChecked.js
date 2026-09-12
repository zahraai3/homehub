import { useMutation , useQueryClient } from "@tanstack/react-query";
import { markShoppingItemChecked } from "../services/updateShoppingService";

const useMarkShoppingItemChecked = () => {
    const queryclient = useQueryClient()

    return useMutation({
        mutationFn : markShoppingItemChecked, 

        onError : (error) => {
            console.error('ERRORR SHOPPING ITEM CANT BE CHECKED')
        },

        onSuccess : () => {
            queryclient.invalidateQueries({
                queryKey: ['my-checked-shoppingItem']
            })

            queryclient.invalidateQueries({
                queryKey: ['shoppingListItems']
            })

            queryclient.invalidateQueries({
                queryKey: ['activityLog']
            })
        }
    })
}

export {useMarkShoppingItemChecked};

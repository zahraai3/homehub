import { useMutation } from "@tanstack/react-query";
import { createShoppingListItem  , getAllShoppingItems} from "../services/shoppingListService";
import { Navigate } from "react-router-dom";
import { useQueryClient , useQuery } from "@tanstack/react-query";

const useAddShoppingItem = () => {
    const queryclient = useQueryClient()

    return useMutation({
        mutationFn : createShoppingListItem,

        onError: (error) => {
            console.error('ERRORR SHOPPING ITEM CREATING ');
        },

        onSuccess: () => {
            queryclient.invalidateQueries({
                queryKey:['shoppingListItems']
            });
        }
        
    })
}

const useAllShoppingItem = (homeId) => {
    return useQuery({
        queryKey: ['shoppingListItems' , homeId],
        queryFn: () => getAllShoppingItems(homeId),
        enabled: !!homeId
    })
}

export { useAddShoppingItem , useAllShoppingItem }; 

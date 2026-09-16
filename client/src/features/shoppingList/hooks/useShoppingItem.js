import { useMutation } from "@tanstack/react-query";
import { createShoppingListItem  , getAllShoppingItems} from "../services/shoppingListService";
import { Navigate } from "react-router-dom";
import { useQueryClient , useQuery } from "@tanstack/react-query";
import { deleteShoppingListItem } from "../services/updateShoppingService";

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

const useDeleteShoppingItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteShoppingListItem,

        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ['shoppingListItems'],
        });
        },

        onError: (error) => {
        console.error('ERROR DELETING SHOPPING ITEM', error);
        },
    });
}

export { useAddShoppingItem , useAllShoppingItem , useDeleteShoppingItem}; 

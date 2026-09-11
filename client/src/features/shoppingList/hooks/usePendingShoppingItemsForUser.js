import { useMemo } from 'react';
import { useAuth } from '../../auth/context/authContext';
import { useUserData } from '../../auth/hooks/useUserData';
import { useAllShoppingItem } from '../hooks/useShoppingItem';


function usePendingShoppingItemsForUser(){
    const { user } = useAuth();
    const {data : userData} = useUserData(user?.uid)

    const {
        data : allItems,
        isPending,
        error
    } = useAllShoppingItem(userData?.homeId)

    const pendingItems = useMemo(() => {
        if(!allItems) return []

        return allItems.filter((item) => {
            const isPendingItem = item.completed === false
            const isForUser =  item.assignedTo === user?.uid || item.assignedTo === null

            return isPendingItem && isForUser
        });
    },[allItems , user?.uid])

    return {pendingItems, isPending , error}
}

export {usePendingShoppingItemsForUser}
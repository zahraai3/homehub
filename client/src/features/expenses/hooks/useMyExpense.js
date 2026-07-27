import { useQuery } from "@tanstack/react-query"
import { getMyUnpaidExpenses } from "../services/myExpensesService"

const useMyUnpaidExpenses = (homeId , userId) => {
    return useQuery({
        queryKey:['my-unpaid-expenses',homeId , userId],
        queryFn: () => getMyUnpaidExpenses(homeId , userId),
        enabled:!!homeId && !!userId,
    })
}

export {useMyUnpaidExpenses}
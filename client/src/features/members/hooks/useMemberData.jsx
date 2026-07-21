import {useQuery} from "@tanstack/react-query"

const useMemberData = () => {
    const resultMembers = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/members')
            if (!response.ok) {
                throw new Error('Failed to fetch members data')
            }
            return await response.json()
        }
    })

    const resultExpenses = useQuery({
        queryKey: ['expenses'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/expenses')
            if (!response.ok) {
                throw new Error('Failed to fetch expenses data')
            }
            return await response.json()
        }
    })

    const resultTasks = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/tasks')
            if (!response.ok) {
                throw new Error('Failed to fetch tasks data')
            }
            return await response.json()
        }
    })

    const resultShoppingList = useQuery({
        queryKey: ['shoppingList'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/shoppingList')
            if (!response.ok) {
                throw new Error('Failed to fetch shopping list data')
            }
            return await response.json()
        }
    })

    return { resultMembers, resultExpenses, resultTasks, resultShoppingList }
}

export default useMemberData
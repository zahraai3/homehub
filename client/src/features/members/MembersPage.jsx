import { useQuery } from "@tanstack/react-query"


const MembersPage = () =>{

    // members data fetching 
        const resultMembers = useQuery({
            queryKey: ['members'],

            queryFn: async () => {
                const response = await fetch('http://localhost:3001/members')

                if(!response.ok){
                    throw new Error('Failed to fetch data')
                }
                return await response.json()
            }
        })

     // expenses data fetching 
    const resultExpenses = useQuery({
        queryKey: ['expenses'],

        queryFn: async () => {
            const response = await fetch('http://localhost:3001/expenses')

            if(!response.ok){
                throw new Error('Failed to fetch data')
            }
            return await response.json()
        }
    })

        if (resultMembers.isPending) {
            return <h1>Loading...</h1>
        }


    if (resultExpenses.isPending) {
        return <h1>Loading...</h1>
    }

    const members = resultMembers.data
    const expenses = resultExpenses.data


    const expensesOn = (id) => {
        return expenses.map(expense => {
            const participant = expense.participants.find(
                p => p.memberId === id && !p.paid
            )

            if(!participant) return null

            return{
                title: expense.title,
                amount: participant.amount
            }
        }).filter(Boolean)
    }

    const expensesDone = (id) => {
        return expenses.map(expense => {
            const participant = expense.participants.find(
                p => p.memberId === id && p.paid
            )

            if(!participant) return null

            return{
                title: expense.title,
                amount: participant.amount
            }
        }).filter(Boolean)
    }

    return(
        <>
            <h1>Members</h1>
            <div>
                {members.map((member) => (
                    <div key={member.id}>
                        <h2>{member.name}</h2>
                        <h3>{member.role}</h3>
                        <p>{member.joinedAt}</p>
                        <p>Didnt pay</p>
                        { expensesOn(member.id).map(
                            item => <p key={item.title}>{item.title} - ${item.amount.toFixed(2)}</p>
                        )}
                        <p>--------------------</p>
                        <p>Paid</p>
                        { expensesDone(member.id).map(
                            item => <p key={item.title}>{item.title} - ${item.amount.toFixed(2)}</p>
                        )}

                    </div>
                ))}
            </div>
        </>
    )
}

export default MembersPage

const getExpensesOnMember = (id) => {
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

const getExpensesDoneByMember = (id) => {
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

export default { getExpensesOnMember, getExpensesDoneByMember }
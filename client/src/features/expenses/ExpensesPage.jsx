import ExpenseForm from "./components/ExpenseForm"
import { ExpenseHeader } from "./components/ExpenseHeader"
import styles from './ExpensePage.module.css'
import ExpenseCard from "./components/ExpeseCard"
import { useAllExpense } from "./hooks/useExpense"
import { useAuth } from "../auth/context/authContext"
import { useUserData } from "../auth/hooks/useUserData"
import { calculateCollected } from "./utils/calculateCollected"
import { useMembers } from "../members/hooks/useMembers"
import getPaidMembers from "./utils/getPaidMembers"
import getPendingMembers from "./utils/getPendingMembers"

const ExpensesPage = () => {
    const {user} = useAuth();
    const {data : userData} = useUserData(user?.uid)
    const {data: members ,isPending: membersPending} = useMembers(user?.uid)
    
    const {data : expenses , isPending , error} = useAllExpense(userData?.homeId) 


    if (isPending || !userData || membersPending) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>;


    return(
        <div className={styles.container}>
            <ExpenseHeader />
            <div className={styles.info}>
                {expenses.map((expense) => {
                    const myParticipant = expense.participants.find(
                        (p) => p.memberId === user?.uid
                    );

                    return (
                        <ExpenseCard
                            key={expense.id}
                            expenseId={expense.id}
                            userId={user?.uid}
                            title={expense.title}
                            totalAmount={expense.totalAmount}
                            share={myParticipant?.share ?? 0}
                            isPaid={myParticipant?.paid ?? false}
                            isParticipant={!!myParticipant}
                            collected={calculateCollected(expense.participants)}
                            memberPaid={getPaidMembers(expense.participants , members)}
                            pendingPayMember={getPendingMembers(expense.participants , members)}
                            duaDate={expense.dueDate}
                        />
                    );
                })}
            </div>
            <div className={styles.formSection}>
                <ExpenseForm/>
            </div>
        </div>
    )
}
export default ExpensesPage
import ShoppingItemForm from "./components/ShoppingItemForm"
import ShoppingItemCard from "./components/ShoppingItemCard"
import { ShoppingHeader } from "./components/ShoppingHeader"
import styles from './ShoppingListPage.module.css'
import { useAllShoppingItem } from "./hooks/useShoppingItem"
import { useAuth } from "../auth/context/authContext"
import { useUserData } from "../auth/hooks/useUserData"
import { useMembers } from "../members/hooks/useMembers"
import { getMemberName } from "./utils/getMemberName"

const ShoppingListPage = () => {
    const { user } = useAuth();
    const { data: userData } = useUserData(user?.uid)
    const { data: members, isPending: membersPending } = useMembers(user?.uid)

    const { data: shoppingItems, isPending, error } = useAllShoppingItem(userData?.homeId)

    if (isPending || !userData || membersPending) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>;

    return (
        <div className={styles.container}>
            <ShoppingHeader/>
            <div className={styles.info}>
                {shoppingItems.map((item) => (
                    <ShoppingItemCard
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        important={item.important}
                        assignedToName={getMemberName(item.assignedTo, members)}
                        completed={item.completed}
                        completedByName={getMemberName(item.completedBy, members)}
                    />
                ))}
            </div>
            <div className={styles.formSection}>
                <ShoppingItemForm />
            </div>
        </div>
    )
}
export default ShoppingListPage
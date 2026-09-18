import { useState } from "react";
import { validateShoppingItemForm } from ".././utils/validaterShoppingItemForm";
import { useAddShoppingItem } from "../hooks/useShoppingItem";
import { useUserData } from "../../auth/hooks/useUserData";
import { useMembers } from "../../members/hooks/useMembers";
import { useAuth } from "../../auth/context/authContext";
import styles from "../components/ShoppingItemForm.module.css";

const ShoppingItemForm = () => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [important, setImportant] = useState(false);
    const [assignedTo, setAssignedTo] = useState("");
    const [errors, setErrors] = useState({});

    const { user } = useAuth();

    const { mutate, isPending, error } = useAddShoppingItem();

    const { data: members } = useMembers(user.uid);
    const { data: userData } = useUserData(user.uid);
    const userId = userData?.id;
    const homeId = userData?.homeId;

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        const validationErrors = validateShoppingItemForm({ name, quantity });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        mutate(
            {
                shoppingList: {
                    name,
                    quantity: Number(quantity),
                    important,
                    assignedTo: assignedTo || null,
                    createdBy: userId
                },
                homeId
            },
            {
                onSuccess: () => {
                    setName("");
                    setQuantity("");
                    setImportant(false);
                    setAssignedTo("");
                }
            }
        );
    };

    const clearFieldError = (field) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    };

    return (
        <form className={styles['flip-card__form']} onSubmit={handleSubmit}>
            <h2 className={styles['flip-card__title']}>Add Shopping Item</h2>

            <div className={styles['flip-card__group']}>
                <label className={styles['flip-card__label']} htmlFor="name">Item Name</label>
                <input
                    id="name"
                    className={`${styles['flip-card__input']} ${errors.name ? styles.error : ""}`}
                    name="name"
                    placeholder="e.g. Milk"
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        clearFieldError('name');
                    }}
                />
                {errors.name && (
                    <span className={styles['error-message']}>
                        {errors.name}
                    </span>
                )}
            </div>

            <div className={styles['flip-card__group']}>
                <label className={styles['flip-card__label']} htmlFor="quantity">Quantity</label>
                <input
                    id="quantity"
                    className={`${styles['flip-card__input']} ${errors.quantity ? styles.error : ""}`}
                    name="quantity"
                    placeholder="1"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                        setQuantity(e.target.value);
                        clearFieldError('quantity');
                    }}
                />
                {errors.quantity && (
                    <span className={styles['error-message']}>
                        {errors.quantity}
                    </span>
                )}
            </div>

            <div className={styles['flip-card__group']}>
                <label className={styles['flip-card__label']} htmlFor="assignedTo">Assign To</label>
                <select
                    id="assignedTo"
                    className={styles['flip-card__input']}
                    name="assignedTo"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                >
                    <option value="">-- Unassigned --</option>
                    {members?.map((member) => (
                        <option key={member.uid} value={member.uid}>
                            {member.displayName}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles['flip-card__checkbox-group']}>
                <input
                    id="important"
                    name="important"
                    type="checkbox"
                    className={styles['flip-card__checkbox']}
                    checked={important}
                    onChange={(e) => setImportant(e.target.checked)}
                />
                <label className={styles['flip-card__checkbox-label']} htmlFor="important">Important</label>
            </div>

            <button type="submit" className={styles['flip-card__btn']} disabled={isPending}>
                Save Item
            </button>
        </form>
    );
};

export default ShoppingItemForm;
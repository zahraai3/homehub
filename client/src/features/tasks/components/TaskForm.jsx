import { useState } from "react";
import { validateTaskForm } from "../utils/validateTaskForm";
import { useAddTask } from "../hooks/useTasks";
import { useUserData } from "../../auth/hooks/useUserData";
import { useMembers } from "../../members/hooks/useMembers";
import { useAuth } from "../../auth/context/authContext";
import styles from "../components/TaskForm.module.css";

const TaskForm = () => {
    const [name, setName] = useState("");
    const [important, setImportant] = useState(false);
    const [assignedTo, setAssignedTo] = useState("");
    const [errors, setErrors] = useState({});

    const { user } = useAuth();

    const { mutate, isPending, error } = useAddTask();

    const { data: members } = useMembers(user.uid);
    const { data: userData } = useUserData(user.uid);
    const userId = userData?.id;
    const homeId = userData?.homeId;

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        const validationErrors = validateTaskForm({ name });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        mutate(
            {
                task: {
                    name,
                    important,
                    assignedTo: assignedTo || null,
                    createdBy: userId
                },
                homeId
            },
            {
                onSuccess: () => {
                    setName("");
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
            <h2 className={styles['flip-card__title']}>Add Task</h2>

            <div className={styles['flip-card__group']}>
                <label className={styles['flip-card__label']} htmlFor="name">Task Name</label>
                <input
                    id="name"
                    className={`${styles['flip-card__input']} ${errors.name ? styles.error : ""}`}
                    name="name"
                    placeholder="e.g. Clean the kitchen"
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
                        <option key={member.id} value={member.id}>
                            {member.name}
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
                Save Task
            </button>
        </form>
    );
};

export default TaskForm;
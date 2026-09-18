import TaskForm from './components/TaskForm'
import TaskCard from './components/TaskCard'
import TaskHeader from './components/TaskHeader'
import styles from './TaskPage.module.css'
import { useAuth } from "../auth/context/authContext"
import { useUserData } from "../auth/hooks/useUserData"
import { useMembers } from '../members/hooks/useMembers'
import { useAllTasks } from './hooks/useTasks'
import { getMemberName } from '../members/utils/getMemberName'

const TaskPage = () => {
    const { user } = useAuth();
    const { data: userData } = useUserData(user?.uid)
    const { data: members, isPending: membersPending } = useMembers(user?.uid)

    const { data: tasks, isPending, error } = useAllTasks(userData?.homeId)

    if (isPending || !userData || membersPending) return <p>Loading...</p>;
    if (error) return <p>Something went wrong.</p>;

    return (
        <div className={styles.container}>
            <TaskHeader />
            <div className={styles.info}>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        important={task.important}
                        assignedToName={getMemberName(task.assignedTo, members)}
                        createdByName={getMemberName(task.createdBy, members)}
                        completed={task.completed}
                        completedByName={getMemberName(task.completedBy, members)}
                        userId={userData?.id}
                    />
                ))}
            </div>
            <div className={styles.formSection}>
                <TaskForm />
            </div>
        </div>
    )
}
export default TaskPage
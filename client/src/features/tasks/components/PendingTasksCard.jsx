import styles from '../../dashboard/components/Card.module.css'
import PendingCardShell from '../../dashboard/components/PendingCardShell'
import { usePendingTasksForUser } from '../hooks/usePendingTasksForUser'
import { useMarkTaskChecked } from '../hooks/useMarkTaskChecked'
import { useAuth } from '../../auth/context/authContext'
import { useUserData } from '../../auth/hooks/useUserData'
import { useNavigate } from 'react-router-dom'


function PendingTasksCard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { pendingTasks, isPending, error } = usePendingTasksForUser();

  const { mutate, isPending: isCheckPending } = useMarkTaskChecked();

  const handleCheck = (taskId) => {
    mutate({ itemId: taskId, userId: user?.uid });
  };

  const goToTasks = () => navigate('tasks');

  if (isPending) return <p>Loading...</p>;

  if (error) {
    console.error(error);
    return <p>Something went wrong.</p>;
  }

  return (
    <PendingCardShell
      title="task"
      isEmpty={pendingTasks.length === 0}
      onAddClick={goToTasks}
    >
      {pendingTasks.map((task) => (
        <div key={task.id} className={styles['ppc-row']}>
          <span className={styles['ppc-label']}>{task.name}</span>
          <button
            type="button"
            className={styles['ppc-pay-btn']}
            onClick={() => handleCheck(task.id)}
            disabled={isCheckPending}
          >
            {isCheckPending ? 'Saving...' : 'Done'}
          </button>
        </div>
      ))}
    </PendingCardShell>
  );
}

export default PendingTasksCard;
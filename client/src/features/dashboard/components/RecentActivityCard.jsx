import styles from '../DashboardPage.module.css'
import {useAuth} from '../../auth/context/authContext'
import {useUserData } from '../../auth/hooks/useUserData'
import { useMembers } from '../../members/hooks/useMembers'
import { useRecentActivity } from '../hooks/useRecentActivity'
import {getMemberName} from '../../members/utils/getMemberName'

const ACTIVITY_VERBS = {
    expense_paid : 'paid',
    task_completed: 'completed',
    item_purchased: 'bought'
}


function formatActivityLine(activity, members) {
  const actorName = getMemberName(activity.performedBy, members) || 'Someone';
  const verb = ACTIVITY_VERBS[activity.type] || 'updated';

  const amountText =
    activity.type === 'expense_paid' && activity.amount != null
      ? ` ${activity.amount}$`
      : '';

  return `${actorName} ${verb} ${activity.label}${amountText}`;
}

function formatActivityDate(activity) {
  if (!activity.createdAt?.toDate) return '';

  const date = activity.createdAt.toDate();
  return date.toLocaleDateString();
}

function RecentActivityCard() {
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);

  const { data: members } = useMembers(user?.uid);

  const {
    data: activities,
    isPending,
    error,
  } = useRecentActivity(userData?.homeId);

  if (isPending) return <p>Loading...</p>;

  if (error) {
    console.error(error);
    return <p>Something went wrong.</p>;
  }

  return (
    <div className={styles.recentActiv}>
      <h2>Recent activity</h2>
      {activities.length === 0 ? (
        <p>No activity yet.</p>
      ) : (
        activities.map((activity) => (
          <p key={activity.id}>
            {formatActivityLine(activity, members)} — date : {formatActivityDate(activity)}
          </p>
        ))
      )}
    </div>
  );
}

export default RecentActivityCard;


import { useMemo } from "react";
import { useAuth } from "../../auth/context/authContext";
import { useUserData } from "../../auth/hooks/useUserData";
import { useAllTasks } from "./useTasks";


function usePendingTasksForUser() {
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid);

  const { data: allTasks, isPending, error } = useAllTasks(userData?.homeId);

  const pendingTasks = useMemo(() => {
    if (!allTasks) return [];

    return allTasks.filter((task) => {
      const isPendingTask = task.completed === false;
      const isForUser =
        task.assignedTo === user?.uid || task.assignedTo === null;

      return isPendingTask && isForUser;
    });
  }, [allTasks, user?.uid]);

  return { pendingTasks, isPending, error };
}

export { usePendingTasksForUser };

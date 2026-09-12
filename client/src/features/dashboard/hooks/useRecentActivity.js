import { useQuery } from '@tanstack/react-query'
import { getRecentActivity } from '../services/getRecentActivity'

const useRecentActivity = (homeId) => {
    return useQuery({
        queryKey: ['activityLog', homeId],
        queryFn: () => getRecentActivity(homeId),
        enabled: !!homeId
    })
}

export {useRecentActivity}

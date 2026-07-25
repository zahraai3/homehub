import { getHome } from "../../../services/homeService";
import {useQuery} from '@tanstack/react-query'

export function useHome(userId){
    return useQuery({
        queryKey:['home',userId],
        queryFn: () => getHome(userId),
        enabled:!!userId,
    })
}


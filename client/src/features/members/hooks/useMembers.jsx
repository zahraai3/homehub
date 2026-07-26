import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../services/membersService";

export function useMembers(userId){
    return useQuery({
        queryKey:['members' , userId],
        queryFn: () => getMembers(userId),
        enabled:!!userId,
    })
}

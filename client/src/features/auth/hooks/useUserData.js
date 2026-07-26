import { getUser } from "../services/userService";
import { useQuery } from "@tanstack/react-query";

export function useUserData(userId){
    return useQuery({
        queryKey:['users' , userId],
        queryFn:() => getUser(userId),
        enabled:!!userId
    })
}

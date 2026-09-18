import { useMutation } from "@tanstack/react-query";
import { login } from "../services/authService";

const useLogin = () => {
    return useMutation({
        mutationFn: ({email, password}) => login(email, password),

        onError: (error) => {
            throw new Error('Error logging in :' , error)
        }
    })
}

export default useLogin
import {useMutation} from "@tanstack/react-query";
import {register} from '../../../services/authService';


const useRegister = () => {
    return useMutation({
        mutationFn: ({email, password}) => register(email,password),

        onSuccess: () => {
            console.log("User registered successfully");
        },

        onError: (error) => {
            console.error("Error registering user:", error);
        }
    })
}

export default useRegister;
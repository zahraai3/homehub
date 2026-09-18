import { useMutation } from "@tanstack/react-query";
import { logout } from "./authService";

const useLogout = () => {
    return useMutation({
        mutationFn: logout,

        onError: (error) => {
            console.error('ERROR LOGGING OUT ',error);
        }
    })
}

export default useLogout
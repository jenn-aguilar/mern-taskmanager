import { useAuthContext } from "./useAuthContext";
import { useTaskContext } from "./useTaskContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: taskDispatch } = useTaskContext();

    const logout = () => {
        // remove user from local storage
        localStorage.removeItem('user');

        // remove from global state (dispatch logout action)
        dispatch({type: 'LOGOUT'})
        taskDispatch({type: 'SET_TASKS', payload: null})
    }

    return { logout };
}
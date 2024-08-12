import axios from "axios";
import { ILogin, ILoginWithGoogle } from "../screens/interfaces/Login.interface";

const AuthService = () => {
    const login = async (data: ILogin) => {
        return await axios.post('auths/login', { ...data })
    }
    const loginWithGoogle = async (data: ILoginWithGoogle) => {
        return await axios.post('auths/google-login', { ...data })
    }
    const getProfile = async () => {
        return await axios.get('users/info')
    }
    return ({
        login,
        loginWithGoogle,
        getProfile,
    })
}
export const authService = AuthService();
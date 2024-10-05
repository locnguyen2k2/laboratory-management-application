import axios from 'axios';
import {ILogin, ILoginWithGoogle} from '../screens/interfaces/Login.interface';

const AuthService = () => {
  const login = async (data: ILogin) => {
    return await axios.post('auths/login', data);
  };
  const loginWithGoogle = async (data: ILoginWithGoogle) => {
    return await axios.post('auths/google-login', data);
  };
  const getProfile = async () => {
    return await axios.get('users/info');
  };
  const fotGotPassword = async (email: any) => {
    return await axios.post('users/forgot-password', {email: email});
  };
  const updateInfo = async (data: any) => {
    return await axios.patch('users/update', data);
  };
  const resetPassword = async (data: any) => {
    return await axios.patch('users/reset-password', data);
  };
  return {
    login,
    loginWithGoogle,
    getProfile,
    fotGotPassword,
    updateInfo,
    resetPassword,
  };
};
export const authService = AuthService();

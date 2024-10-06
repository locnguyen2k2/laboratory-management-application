import AsyncStorage from '@react-native-async-storage/async-storage';

const createJwtManager = async () => {
  let jwtToken = await AsyncStorage.getItem('token');
  let email = await AsyncStorage.getItem('email');
  let refreshToken = await AsyncStorage.getItem('refreshToken');

  const get = () => jwtToken;

  const getEmail = () => email;

  const getRT = () => refreshToken;

  const set = async (token: string) => {
    jwtToken = token;
    await AsyncStorage.setItem('token', jwtToken);
  };

  const setEmail = async (mail: string) => {
    email = mail;
    await AsyncStorage.setItem('email', mail);
  };

  const setRT = async (token: string) => {
    refreshToken = token;
    await AsyncStorage.setItem('refreshToken', refreshToken);
  };

  const clear = async () => {
    jwtToken = null;
    refreshToken = null;
    email = null;
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('refreshToken');
    return true;
  };

  return {
    get,
    getEmail,
    getRT,
    set,
    setEmail,
    setRT,
    clear,
  };
};

export const jwtManager = createJwtManager();

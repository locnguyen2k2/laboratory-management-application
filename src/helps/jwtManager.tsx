import AsyncStorage from '@react-native-async-storage/async-storage';

const createJwtManager = async () => {
  let jwtToken = await AsyncStorage.getItem('token');

  const get = () => jwtToken;

  const set = async (token: string) => {
    jwtToken = token;
    await AsyncStorage.setItem('token', jwtToken);
  };

  const clear = async () => {
    jwtToken = null;
    await AsyncStorage.removeItem('token');
    return true;
  };

  return {
    get,
    set,
    clear,
  };
};

export const jwtManager = createJwtManager();

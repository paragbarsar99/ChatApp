import AsyncStorage from '@react-native-community/async-storage';

export const getItem = async () => {
  let value = await AsyncStorage.getItem('LoginMail');
  return JSON.parse(value);
};

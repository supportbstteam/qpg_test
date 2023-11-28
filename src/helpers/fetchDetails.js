import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUser = async () => {
  let details = await AsyncStorage.getItem('user');
  details = JSON.parse(details);
  return details;
};

export const fetchToken = async () => {
  const token = await AsyncStorage.getItem('token');
  return token;
};

exports = {fetchUser, fetchToken};

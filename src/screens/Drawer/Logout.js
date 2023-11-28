import {Text, ActivityIndicator, SafeAreaView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import client from '../../api/client';

const Logout = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logoutUser = async () => {
      try {
        let response = await client.get('logout');
        response = response.data;
        if (response.success) {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          setLoading(false);
          navigation.navigate('login');
        }
      } catch (error) {
        Alert.alert('Error Logging out....');
        setLoading(false);
        navigation.goBack();
        console.log(error);
      }
    };
    logoutUser();
  }, [navigation]);
  return (
    <>
      <Header
        bg={'blue'}
        title={'Logout'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {loading && (
          <>
            <ActivityIndicator size={'large'} color={'blue'} />
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Logging out...
            </Text>
            <Text>Please wait!</Text>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

export default Logout;

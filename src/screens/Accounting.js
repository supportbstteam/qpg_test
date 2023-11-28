import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/common/Header';
import Orientation from 'react-native-orientation-locker';

const Accounting = ({navigation}) => {
  useEffect(() => {
    // orientation lock to portrait
    Orientation.lockToPortrait();
  }, []);
  return (
    <>
      <Header
        title={'Accounting'}
        bg={'blue'}
        leftIcon={'arrowleft'}
        onLeftPress={() => navigation.goBack()}
      />
      <View>
        <Text>Accounting</Text>
      </View>
    </>
  );
};

export default Accounting;

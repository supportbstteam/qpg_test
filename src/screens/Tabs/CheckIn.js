import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/common/Header';

const CheckIn = ({navigation}) => {
  return (
    <>
      <Header
        bg={'blue'}
        title={'Check-In'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <View>
        <Text>Check-In</Text>
      </View>
    </>
  );
};

export default CheckIn;

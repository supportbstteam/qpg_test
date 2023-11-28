import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/common/Header';

const Leave = ({navigation}) => {
  return (
    <>
      <Header
        bg={'blue'}
        title={'Leave'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <View>
        <Text>Leave</Text>
      </View>
    </>
  );
};

export default Leave;

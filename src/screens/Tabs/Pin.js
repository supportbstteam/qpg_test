import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/common/Header';

const Pin = ({navigation}) => {
  return (
    <>
      <Header
        bg={'blue'}
        title={'Pin'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <View>
        <Text>Pin</Text>
      </View>
    </>
  );
};

export default Pin;

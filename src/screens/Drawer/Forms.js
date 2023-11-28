import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/common/Header';

const Forms = ({navigation}) => {
  return (
    <>
      <Header
        bg={'blue'}
        title={'Forms'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <View>
        <Text>Forms</Text>
      </View>
    </>
  );
};

export default Forms;

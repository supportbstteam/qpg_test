import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/common/Header';

const Expenses = ({navigation}) => {
  return (
    <>
      <Header
        bg={'blue'}
        title={'Expenses'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <View>
        <Text>Expenses</Text>
      </View>
    </>
  );
};

export default Expenses;

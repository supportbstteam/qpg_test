import {View, Text} from 'react-native';
import React from 'react';
import Header from '../../components/common/Header';

const Visits = ({navigation}) => {
  return (
    <>
      <Header
        bg={'blue'}
        title={'Visits'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <View>
        <Text>Visits</Text>
      </View>
    </>
  );
};

export default Visits;

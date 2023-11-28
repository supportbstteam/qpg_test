import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../components/common/Header';
import Icon from 'react-native-vector-icons/Entypo';
import Orientation from 'react-native-orientation-locker';

const Dashboard = ({navigation}) => {
  useEffect(() => {
    // orientation lock to portrait
    Orientation.lockToPortrait();
  }, []);
  return (
    <>
      <Header
        bg={'blue'}
        title={'Dashboard'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <View style={{flex: 1, alignItems: 'center', gap: 5}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Accounting')}>
          <Icon name="tablet" size={50} color={'blue'} />
          <View style={styles.line} />
          <Text style={styles.txt}>Accounting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('SelectClass')}>
          <Icon name="folder-video" size={50} color={'blue'} />
          <View style={styles.line} />
          <Text style={styles.txt}>Digital Content</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('PunchScreen')}>
          <Icon name="location" size={50} color={'blue'} />
          <View style={styles.line} />
          <Text style={styles.txt}>Report</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 50,
    backgroundColor: 'white',
    width: '90%',
    height: 120,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  line: {
    marginHorizontal: 20,
    borderRightColor: 'gray',
    borderRightWidth: 1,
    height: '80%',
  },
  txt: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Dashboard;

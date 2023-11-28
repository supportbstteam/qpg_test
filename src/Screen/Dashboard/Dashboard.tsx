import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import Header from '../../Component/Common_Component/Header'
import Icon from 'react-native-vector-icons/Entypo';
import styles from './styles';

const Dashboard = (props) => {
  return (
    <>
      <Header
        bg={'blue'}
        title={'Dashboard'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => props.navigation.toggleDrawer()}
      />
      <View style={{ flex: 1, alignItems: 'center', gap: 5 }}>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate('Accounting')}>
          <Icon name="tablet" size={50} color={'blue'} />
          <View style={styles.line} />
          <Text style={styles.txt}>Accounting</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate('SelectClass')}>
            <Image
            source={require('../../assets/images/digital_content.png')}
            style={{
              width: 60, // Adjust the width as needed
              height: 60,// Adjust the height as needed
              
             
            }}
          />
          <View style={styles.line} />
          <Text style={styles.txt}>Digital Content</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.navigate('PunchScreen')}>
          <Icon name="location" size={50} color={'blue'} />
          <View style={styles.line} />
          <Text style={styles.txt}>Report</Text>
        </TouchableOpacity> */}
      </View>
    </>
  )
}

export default Dashboard
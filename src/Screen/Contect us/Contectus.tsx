import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Header from '../../Component/Common_Component/Header'
import { CardBase } from '@rneui/base/dist/Card/Card'
const Contectus = ({navigation}) => {
  return (
    <>
     <Header
        bg={'blue'}
        title={'Contact us'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
    <View style={styles.container}>
            <CardBase>
                <Text style={styles.main}> Contact Us </Text>
                <Text style={styles.para}>
                    Best way Publications, A-1/50 B, Keshav Puram, Delhi-110035
                </Text>
                <View style={styles.contact}>
                    <Text style={styles.text}> Contact No - </Text>
                    <Text> 011-47073550</Text>
                </View>

                <View style={styles.email}>
                    <Text style={styles.text}> Email Id - </Text>
                    <Text > info@bestwaypublications.com </Text>
                </View>
            </CardBase>
        </View>
    
    </>
  )
}

export default Contectus

const styles = StyleSheet.create({
  container: {
      marginTop: 80
  },

  main: {
      fontSize: 30,
      color: '#5272F2',
      textAlign: 'center',
      fontWeight: '500',
      marginBottom: 12
  },

  para: {
      fontSize: 15,
      textAlign: 'center',
      lineHeight: 20
  },

  contact: {
      display: 'flex',
      flexDirection: "row",
      marginTop: 8,
      marginLeft: 11
  },

  email: {
      display: 'flex',
      flexDirection: "row",
      marginTop: 5,
      marginLeft: 11
  },

  text: {
      fontWeight: '600',
      color: '#5272F2',
  }
})
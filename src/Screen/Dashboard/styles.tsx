
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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
  export default styles;
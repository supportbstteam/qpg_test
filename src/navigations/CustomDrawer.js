import {
  View,
  SafeAreaView,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonCard from '../components/common/CommonCard';
import {fetchUser} from '../helpers/fetchDetails';

const data = [
  {
    title: 'Dashboard',
    icon: require('../assets/images/dashboard.png'),
  },
  {
    title: 'Attendance',
    icon: require('../assets/images/attendance.png'),
  },
  {
    title: 'My Team',
    icon: require('../assets/images/team.png'),
  },
  {
    title: 'Visits',
    icon: require('../assets/images/visits.png'),
  },
  {
    title: 'Expenses',
    icon: require('../assets/images/expenses.png'),
  },
  {
    title: 'Forms',
    icon: require('../assets/images/forms.png'),
  },
  {
    title: 'Leave',
    icon: require('../assets/images/leave.png'),
  },
  {
    title: 'Logout',
    icon: require('../assets/images/logout.png'),
  },
];

const CustomDrawer = ({navigation}) => {
  const [state, setState] = useState(undefined);
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser();
      setState(user);
    };
    getUser();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <TouchableOpacity
          style={styles.userView}
          onPress={() => {
            navigation.navigate('Profile');
            navigation.closeDrawer();
          }}>
          <Image
            source={require('../assets/images/profile.png')}
            style={styles.userViewImg}
          />
          <Text style={styles.userViewText}>{state?.name}</Text>
        </TouchableOpacity>
        <FlatList
          data={data}
          contentContainerStyle={{gap: 10}}
          renderItem={({item, index}) => {
            return (
              <CommonCard
                key={index}
                title={item.title}
                icon={item.icon}
                onClick={() => {
                  navigation.navigate(item.title);
                  navigation.closeDrawer();
                }}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userView: {
    width: '100%',
    height: 100,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    gap: 5,
    marginBottom: 20,
  },
  userViewImg: {
    width: 60,
    height: 60,
  },
  userViewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CustomDrawer;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CheckIn from '../screens/Tabs/CheckIn';
import Visits from '../screens/Tabs/Visits';
import Pin from '../screens/Tabs/Pin';
import {Image, StyleSheet, View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="visits"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {height: 70},
        tabBarLabelStyle: {fontSize: 15, marginVertical: 5, color: 'blue'},
      }}>
      <Tab.Screen
        name="checkin"
        component={CheckIn}
        options={{
          tabBarLabel: 'Check-In',
          tabBarIcon: tabInfo => {
            return (
              <View
                style={[
                  styles.circle,
                  {backgroundColor: tabInfo.focused ? 'blue' : 'white'},
                ]}>
                <Image
                  source={require('../assets/images/check-in.png')}
                  style={[
                    styles.icon,
                    {tintColor: tabInfo.focused ? 'white' : 'blue'},
                  ]}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="visits"
        component={Visits}
        options={{
          tabBarLabel: 'Visits',
          tabBarIcon: tabInfo => {
            return (
              <View
                style={[
                  styles.circle,
                  {backgroundColor: tabInfo.focused ? 'blue' : 'white'},
                ]}>
                <Image
                  source={require('../assets/images/visits.png')}
                  style={[
                    styles.icon,
                    {tintColor: tabInfo.focused ? 'white' : 'blue'},
                  ]}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="pin"
        component={Pin}
        options={{
          tabBarLabel: 'Pin',
          tabBarIcon: tabInfo => {
            return (
              <View
                style={[
                  styles.circle,
                  {backgroundColor: tabInfo.focused ? 'blue' : 'white'},
                ]}>
                <Image
                  source={require('../assets/images/pin.png')}
                  style={[
                    styles.icon,
                    {tintColor: tabInfo.focused ? 'white' : 'blue'},
                  ]}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default BottomTabNavigator;

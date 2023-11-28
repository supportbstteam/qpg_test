import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Animated, { Easing, withSpring, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomNavigator from './BottomNavigator';
import CustomDrawNavigator from './CustomDrawNavigator';
import Dashboard from '../Screen/Dashboard/Dashboard';
import Profile from '../Screen/Profile/Profile';
import Contectus from '../Screen/Contect us/Contectus';
import About from '../Screen/About/About';
import Terms from '../Screen/Terms/Terms';
import PrivacyPlicy from '../Screen/PrivacyPolicy/PrivacyPlicy';
import PunchScreen from '../Screen/PunchScreen/PunchScreen';
// Import your other components and styles here



const Drawer = createDrawerNavigator();



const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          // Customize the drawer style if needed
        },
        drawerActiveTintColor: 'white', // Set the selected (active) text color
        drawerActiveBackgroundColor: 'blue', // Set the selected (active) background color
        drawerInactiveTintColor: 'white', // Set the inactive text color
        drawerInactiveBackgroundColor: 'rgba(0, 0, 255, 0.6)',
      }}
      drawerContent={props => <CustomDrawNavigator {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require('../assets/images/dashboard.png')} // Replace with the path to your image
              style={{
                width: responsiveHeight(3.3), // Adjust the width as needed
                height: responsiveHeight(3.3), // Adjust the height as needed
                tintColor: focused ? 'white' : 'white', // Tint color based on focus
              }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require('../assets/images/profile.png')} // Replace with the path to your image
              style={{
                width: responsiveHeight(4), // Adjust the width as needed
                height: responsiveHeight(4), // Adjust the height as needed
                // tintColor: focused ? 'white' : 'white', // Tint color based on focus
              }}
            />
          ),
        }}
      />


      <Drawer.Screen
        name="About Us"
        component={About}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require('../assets/images/profile.png')} // Replace with the path to your image
              style={{
                width: responsiveHeight(4), // Adjust the width as needed
                height: responsiveHeight(4), // Adjust the height as needed
                // tintColor: focused ? 'white' : 'white', // Tint color based on focus
              }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Director Message"
        component={Terms}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require('../assets/images/profile.png')} // Replace with the path to your image
              style={{
                width: responsiveHeight(4), // Adjust the width as needed
                height: responsiveHeight(4), // Adjust the height as needed
                // tintColor: focused ? 'white' : 'white', // Tint color based on focus
              }}
            />
          ),
        }}
      />


    


<Drawer.Screen
        name="Contact Us"
        component={Contectus}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Image
              source={require('../assets/images/profile.png')} // Replace with the path to your image
              style={{
                width: responsiveHeight(4), // Adjust the width as needed
                height: responsiveHeight(4), // Adjust the height as needed
                // tintColor: focused ? 'white' : 'white', // Tint color based on focus
              }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

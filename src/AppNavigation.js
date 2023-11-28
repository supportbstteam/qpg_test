import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

// screens
import Login from '../src/screens/Login';
import DashboardNavigator from './navigations/DashboardNavigator';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="login">
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="landing" component={DashboardNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

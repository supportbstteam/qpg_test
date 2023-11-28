import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import {DashboardStackNavigator} from './StackNavigator';
import TabNavigator from './TabNavigator';
import Attendance from '../screens/Drawer/Attendance';
import MyTeam from '../screens/Drawer/MyTeam';
import Expenses from '../screens/Drawer/Expenses';
import Forms from '../screens/Drawer/Forms';
import Leave from '../screens/Drawer/Leave';
import Logout from '../screens/Drawer/Logout';
import CustomDrawer from './CustomDrawer';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

const DashboardNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Visits"
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Dashboard" component={DashboardStackNavigator} />
      <Drawer.Screen name="Attendance" component={Attendance} />
      <Drawer.Screen name="My Team" component={MyTeam} />
      <Drawer.Screen name="Visits" component={TabNavigator} />
      <Drawer.Screen name="Expenses" component={Expenses} />
      <Drawer.Screen name="Forms" component={Forms} />
      <Drawer.Screen name="Leave" component={Leave} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DashboardNavigator;

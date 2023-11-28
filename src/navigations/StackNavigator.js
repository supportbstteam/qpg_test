import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import Accounting from '../screens/Accounting';
import SelectClass from '../screens/SelectClass';
import SelectSubject from '../screens/SelectSubject';
import DigitalContent from '../screens/DigitalContent';
import ViewVideo from '../screens/ViewVideo';
import ViewBook from '../screens/ViewBook';
import Report from '../screens/Report';
import PunchScreen from '../screens/PunchScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createStackNavigator();

export const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={Dashboard} />
      <Stack.Screen name="Accounting" component={Accounting} />
      <Stack.Screen name="SelectClass" component={SelectClass} />
      <Stack.Screen name="SelectSubject" component={SelectSubject} />
      <Stack.Screen name="DigitalContent" component={DigitalContent} />
      <Stack.Screen name="ViewVideo" component={ViewVideo} />
      <Stack.Screen name="ViewBook" component={ViewBook} />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="PunchScreen" component={PunchScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};

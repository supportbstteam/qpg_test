import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/AppNavigation';
import Toast from 'react-native-toast-message';
import {toastConfig} from './toastConfig';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = props => {
  const [hideSplash, setHideSplash] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 3000); // amount of time the splash screen is shown.
  }, []);

  useEffect(() => {
    hideSplash && SplashScreen.hide();
  }, [hideSplash]);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </Provider>
    </>
  );
};

export default App;

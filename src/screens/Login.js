import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Keyboard,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, {useEffect, useState} from 'react';
import Logo from '../assets/images/logo_circle.png';
import {StackActions} from '@react-navigation/native';
import Loader from '../components/common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation-locker';
import {userLogin} from '../redux/actions/UserLogin';
import {useDispatch} from 'react-redux';
import {fetchToken} from '../helpers/fetchDetails';

const Login = ({navigation}) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [focus, setFocus] = useState(0);
  const [token, setToken] = useState();
  const [enableSwitch, setEnableSwitch] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const getToken = async () => {
    const token = await fetchToken();
    setToken(token);
  };

  useEffect(() => {
    // orientation lock to portrait
    Orientation.lockToPortrait();
    getUserDetails();
    getToken();
    if (token) {
      navigation.dispatch(StackActions.replace('landing'));
    }
  }, [navigation, token]);

  const onInputChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const saveUserDetails = async () => {
    if (credentials.email && credentials.password) {
      await AsyncStorage.setItem(
        'credentials',
        JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      );
    }
  };

  const getUserDetails = async () => {
    const details = await AsyncStorage.getItem('credentials');
    if (details) {
      setEnableSwitch(true);
      setCredentials(JSON.parse(details));
    }
  };

  const removeUserDetails = async () => {
    await AsyncStorage.removeItem('credentials');
  };

  const toggleSwitch = () => {
    setEnableSwitch(state => !state);
    if (enableSwitch) {
      removeUserDetails();
    }
  };

  const handleLogin = () => {
    setLoading(true);
    dispatch(userLogin(credentials))
      .then(action => {
        if (action.payload && action.payload.data) {
          const {token, user} = action.payload.data;
          Toast.show({
            type: 'success',
            text1: 'Login Successfull!',
            position: 'top',
            visibilityTime: 1000,
          });
          Keyboard.dismiss();
          if (enableSwitch) {
            saveUserDetails();
          }
          AsyncStorage.setItem('token', token);
          AsyncStorage.setItem(
            'user',
            JSON.stringify({
              id: user.id,
              name: user.name,
              email: user.email,
              contact: user.contact_no,
              designation: user.designation,
              role: user.role,
              department: user.department,
            }),
          );
          setLoading(false);
          navigation.dispatch(StackActions.replace('landing'));
        } else {
          setLoading(false);
          Toast.show({
            type: 'error',
            text1: 'Invalid Credentials!',
            position: 'top',
            visibilityTime: 2000,
          });
          Keyboard.dismiss();
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Error logging in:', error);
        Toast.show({
          type: 'error',
          text1: 'Invalid Credentials!',
          position: 'top',
          visibilityTime: 2000,
        });
        Keyboard.dismiss();
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={Logo} alt={'QPG Logo'} style={styles.logo} />
        <TextInput
          autoCorrect={true}
          label="Email"
          value={credentials.email}
          placeholder="admin@gmail.com"
          // onChange={valid}
          onChangeText={text => onInputChange('email', text)}
          mode="outlined"
          style={[
            styles.input,
            focus === 0 ? {borderColor: 'black'} : {borderColor: 'lightgray'},
          ]}
          autoComplete="email"
          keyboardType="email-address"
          cursorColor={'#4D2DB7'}
          onFocus={() => setFocus(0)}
        />
        <TextInput
          autoCorrect={true}
          label="Password"
          value={credentials.password}
          placeholder="***************"
          // onChange={valid}
          onChangeText={text => onInputChange('password', text)}
          secureTextEntry
          mode="outlined"
          style={[
            styles.input,
            focus === 1 ? {borderColor: 'black'} : {borderColor: 'lightgray'},
          ]}
          autoComplete="password"
          cursorColor={'#4D2DB7'}
          onFocus={() => setFocus(1)}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Switch
              trackColor={{false: 'lightgray', true: 'lightgray'}}
              thumbColor={enableSwitch ? 'lightgray' : 'white'}
              style={{
                transform: [{scaleX: 1}, {scaleY: 0.9}],
              }}
              onValueChange={toggleSwitch}
              value={enableSwitch}
            />
            <Text>Remember Me</Text>
          </View>
          <Text onPress={() => Alert.alert('Forget Password | Contact Admin')}>
            Forget Password
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.btn,
            !credentials.email || !credentials.password
              ? {backgroundColor: 'lightgray'}
              : {backgroundColor: '#4D2DB7'},
          ]}
          disabled={!credentials.email || !credentials.password}
          onPress={handleLogin}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            {'Sign In'}
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? <Loader /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 32,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    backgroundColor: 'transparent',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  btn: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4D2DB7',
  },
});

export default Login;

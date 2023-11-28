import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../components/common/Header';
import Geolocation from 'react-native-geolocation-service';
import BackgroundService from 'react-native-background-actions';
import client from '../api/client';
import {fetchUser} from '../helpers/fetchDetails';
import Loader from '../components/common/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const {LocationModule} = NativeModules;

// ONLY SALESPERSON CAN SEE

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const options = {
  taskName: 'Tracking',
  taskTitle: 'Location Tracking',
  taskDesc: 'We are tracking your location!',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

let watchId = null;

const PunchScreen = ({navigation}) => {
  const [granted, setGranted] = useState(false);
  // const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [checkInEnable, setCheckInEnable] = useState(true);
  const [checkOutEnable, setCheckOutEnable] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);

  // const handleNativeModule = () => {
  //   LocationModule.startLocationTracking();
  // };

  const getDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  };

  useEffect(() => {
    setCurrentDate(getDate());
    const getUser = async () => {
      const user = await fetchUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserAttendance = async () => {
      try {
        if (user && currentDate) {
          let response = await client.post('/user-attendance', {
            user_id: user?.id,
            month: currentDate.substring(5, 7),
            year: currentDate.substring(0, 4),
          });
          response = response.data;
          console.log(response);
          if (!response.message) {
            setAttendanceList(response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserAttendance();
  }, [currentDate, user]);

  useEffect(() => {
    const getPunchInOutDetails = () => {
      attendanceList.map(({VisitDate, PunchIn, PunchOut}) => {
        if (VisitDate === getDate()) {
          console.log('The visit date is ', VisitDate);
          if (PunchIn !== 0 && PunchOut !== 0) {
            console.log('Punch In & Punch Out Found, Disable Both Button');
            setCheckInEnable(false);
            setCheckOutEnable(false);
          } else if (PunchOut === 0) {
            setCheckInEnable(false);
            setCheckOutEnable(true);
            return;
          } else {
            setCheckInEnable(true);
            return;
          }
        } else {
          setCheckInEnable(true);
          return;
        }
      });
    };
    getPunchInOutDetails();
  }, [attendanceList]);

  const StartLocationTracking = async taskDataArguments => {
    // Location Tracking in infinite loop task.
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      watchId = Geolocation.watchPosition(
        position => {
          // Sending location data to backend here
          setCoordinates(coordinates => [
            ...coordinates,
            {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          ]);
          // coordinates not coming.....
        },
        error => {
          if (error.code === 2) {
            Alert.alert(
              'GPS is disabled. Please enable GPS in device settings.',
            );
          } else {
            Alert.alert('Error checking GPS status: ', error.message);
          }
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
      await sleep(delay);
    });
  };

  const getSavedDate = async () => {
    const date = await AsyncStorage.getItem('DATE');
    const status = await AsyncStorage.getItem('STATUS');
    if (date == getDate() && status === 'CIN') {
      setCheckInEnable(false);
      setCheckOutEnable(true);
    } else if (date == getDate() && status === 'COUT') {
      setCheckInEnable(false);
      setCheckOutEnable(false);
    }
    console.log(date);
  };

  const BackgroundTaskStart = async () => {
    setStartTime(new Date());
    await AsyncStorage.setItem('DATE', getDate());
    await AsyncStorage.setItem('STATUS', 'CIN');
    setCheckInEnable(false);
    setCheckOutEnable(true);
    // setIsPunchedIn(true);
    await BackgroundService.start(StartLocationTracking, options);
    // coordinates not coming....
  };

  // useEffect(() => {
  //   const getAttendance = async () => {
  //     const data = {
  //       user_id: user?.id,
  //       month: month,
  //       year: year,
  //     };

  //     try {
  //       if (data.user_id) {
  //         let response = await client.post('/user-attendance', {...data});
  //         response = response.data;

  //         if (response.message) {
  //           setCalendar(null);
  //         } else {
  //           setCalendar(response);
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getAttendance();
  // }, [month, year, user]);

  const BackgroundTaskStop = async () => {
    // setIsPunchedIn(false);
    await AsyncStorage.setItem('STATUS', 'COUT');
    setCheckInEnable(false);
    setCheckOutEnable(false);
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
    }
    setEndTime(new Date());

    // Reset state
    // setStartTime(null);
    // setElapsedTime(0);
    await BackgroundService.stop();
  };

  const calculateDistance = coords => {
    let distance = 0;
    for (let i = 1; i < coords.length; i++) {
      const lat1 = coords[i - 1].lat;
      const lon1 = coords[i - 1].lng;
      const lat2 = coords[i].lat;
      const lon2 = coords[i].lng;
      const R = 6371e3; // metres
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      distance += R * c;
    }
    // Convert distance to kilometers
    const km = distance / 1000;

    // Round off to two decimal places
    const roundedKm = Math.round(km * 100) / 100;

    // // Calculate remaining meters
    // const meters = Math.round(distance % 1000);

    return `${roundedKm} km`;
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permission Granted!');
        setGranted(true);
      } else {
        console.log('Permission Denied!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // function for getting current location for initial coordinates
    const getCurrentLocation = () => {
      if (granted) {
        Geolocation.getCurrentPosition(
          position => {
            setCoordinates([
              {lat: position.coords.latitude, lng: position.coords.longitude},
            ]);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    };
    // Request Permission for Location
    if (!granted) {
      requestPermission();
    }
    // Get current location
    getCurrentLocation();
    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [granted]);

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        const now = new Date();
        setElapsedTime(now - startTime);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  useEffect(() => {
    // Function for sending data to backend api
    const sendLocationDataToBackend = async () => {
      const formattedCoordinates = coordinates
        .map(coord => `{lat: ${coord.lat}, lng: ${coord.lng}}`)
        .join(',');
      const data = {
        user_id: user?.id,
        visit_date: currentDate,
        coors: `[${formattedCoordinates}]`,
        distance: calculateDistance(coordinates),
        duration: formatElapsedTime(elapsedTime),
        inTime: formattedTime(startTime),
        outTime: formattedTime(endTime),
      };
      try {
        if (coordinates.length) {
          console.log(data);
          const response = await client.post('/user-map-update', {
            ...data,
          });
          if (response.status === 200) {
            console.log('Location data sent to backend successfully!');
          } else {
            console.error(
              'Error sending location data to backend: ',
              response.statusText,
            );
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    sendLocationDataToBackend();
  }, [user, currentDate, coordinates, elapsedTime, startTime, endTime]);

  const formattedTime = time => {
    if (time === 0) {
      return 0;
    } else {
      return time.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }
  };

  const formatElapsedTime = milliseconds => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0',
    )}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <>
      <Header
        title={'Report'}
        bg={'blue'}
        leftIcon={'arrowleft'}
        onLeftPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {/* {isPunchedIn ? ( */}
        <>
          <Text style={styles.text}>Date: {currentDate}</Text>
          <Text style={styles.text}>Punch In: {formattedTime(startTime)}</Text>
          <Text style={styles.text}>
            Time: {formatElapsedTime(elapsedTime)}
          </Text>
          <TouchableOpacity
            style={[
              styles.btn,
              checkOutEnable
                ? {backgroundColor: 'red'}
                : {backgroundColor: 'lightgray'},
            ]}
            disabled={!checkOutEnable}
            onPress={() => {
              BackgroundTaskStop();
            }}>
            <Text style={{color: 'white', fontSize: 17}}>Punch Out</Text>
          </TouchableOpacity>
        </>
        {/* ) : ( */}
        <TouchableOpacity
          style={[
            styles.btn,
            checkInEnable
              ? {backgroundColor: 'green'}
              : {backgroundColor: 'lightgray'},
          ]}
          onPress={() => {
            BackgroundTaskStart();
          }}
          disabled={!checkInEnable}>
          <Text style={{color: 'white', fontSize: 17}}>Punch In</Text>
        </TouchableOpacity>
        {/* )} */}
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'orange'}]}
          onPress={() => {
            navigation.navigate('MapScreen');
          }}>
          <Text style={{color: 'white', fontSize: 17}}>View Location</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.container}>
        <Button title="Start Location Tracking" onPress={handleNativeModule} />
      </View> */}
      {loading && <Loader />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 19,
    color: 'black',
    fontWeight: '600',
    marginBottom: 20,
  },
  btn: {
    width: '80%',
    marginHorizontal: 10,
    marginBottom: 20,
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PunchScreen;

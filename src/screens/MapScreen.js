import {
  View,
  Text,
  PermissionsAndroid,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome6';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import Icon from 'react-native-vector-icons/AntDesign';
import Loader from '../components/common/Loader';
// import Loader from '../components/common/Loader';

// const {width, height} = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = ASPECT_RATIO * 0.01;
// const LONGITUDE_DELTA = ASPECT_RATIO * 0.01;

// let interval;
// // let LatLong = [];

const MapScreen = ({navigation}) => {
  // const [lat, setLat] = useState(null); // Default to New Delhi - 28.6139
  // const [long, setLong] = useState(null); // Default to New Delhi - 77.209
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapRef = useRef();

  // function for getting current location for initial coordinates
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCoordinates([
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        ]);
        setLoading(false);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    const animateRegion = () => {
      // Update initialRegion on first position received
      if (coordinates.length >= 1 && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: coordinates[0]?.latitude,
          longitude: coordinates[0]?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    };
    const requestLocationPermission = async () => {
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
          getCurrentLocation();
          // console.log(coordinates);
          animateRegion();
          // Geolocation.requestAuthorization();
          const watchId = Geolocation.watchPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setCoordinates([...coordinates, {latitude, longitude}]);
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

          return () => {
            if (watchId !== null) {
              Geolocation.clearWatch(watchId);
            }
          };
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, [coordinates]);

  useEffect(() => {
    // Fit map to coordinates
    if (coordinates.length > 1 && mapRef.current) {
      const coordinatesArray = coordinates.map(coord => ({
        latitude: coord.latitude,
        longitude: coord.longitude,
      }));
      mapRef.current.fitToCoordinates(coordinatesArray, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  }, [coordinates]);

  // Set initialRegion to the first recorded position
  const initialRegion = {
    latitude: coordinates[0]?.latitude,
    longitude: coordinates[0]?.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,

    //   // latitude: 37.78825, // Default coordinates if no data yet
    //   // longitude: -122.4324,
    //   // latitudeDelta: 0.0922,
    //   // longitudeDelta: 0.0421,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon name="arrowleft" size={35} color={'blue'} />
          </TouchableOpacity>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={initialRegion} // Set initialRegion here
          >
            {/* Render Markers */}

            <Marker
              coordinate={coordinates[0]}
              title="Starting Point"
              pinColor="green"
            />
            {coordinates.length > 0 && (
              <>
                <Marker
                  coordinate={coordinates[coordinates.length - 1]}
                  title="Ending Point"
                  pinColor="red"
                />
                {/* Render Polyline  */}
                <Polyline
                  coordinates={coordinates}
                  strokeColor="#FF0000"
                  strokeWidth={5}
                />
              </>
            )}
          </MapView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 1,
    zIndex: 1,
    elevation: 5,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  BackHandler,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Orientation from 'react-native-orientation-locker';
import Video from 'react-native-video';
import Loader from '../components/common/Loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Slider from '@react-native-community/slider';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const ViewVideo = ({route}) => {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const path = route.params.path;
  const videoRef = useRef();
  const navigation = useNavigation();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Do Whatever you want to do on back button click
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        Orientation.lockToPortrait();
        navigation.goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );
  useEffect(() => {
    // Lock the screen to Landscape view.
    Orientation.lockToLandscape();
  }, []);
  // const onBuffer = () => {
  //   return <Loader />;
  // };

  // const onError = () => {
  //   return (
  //     <View>
  //       <Icon name="error" size={25} color={'red'} />
  //       <Text>Sorry, Video Error!</Text>
  //     </View>
  //   );
  // };

  return (
    <>
      <StatusBar hidden={true} />
      <TouchableOpacity
        onPress={() => setClicked(!clicked)}
        style={{
          flex: 1,
        }}>
        <Video
          ref={videoRef}
          paused={paused}
          source={{
            uri: `https://bwptestpapers.com/public/video/${path}`,
            // uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          // onBuffer={onBuffer} // Callback when remote video is buffering
          // onError={onError} // callback when video cannot be loaded
          resizeMode="cover"
          onProgress={x => {
            setProgress(x);
          }}
          repeat={true}
          onEnd={() => setPaused(true)}
          style={styles.backgroundVideo}
        />
        {clicked && (
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setClicked(!clicked);
            }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  videoRef.current.seek(parseInt(progress.currentTime) - 10);
                }}>
                <Image
                  source={require('../assets/images/backward.png')}
                  style={{width: 30, height: 30, tintColor: 'white'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPaused(!paused);
                }}>
                <Image
                  source={
                    paused
                      ? require('../assets/images/play.png')
                      : require('../assets/images/pause.png')
                  }
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  videoRef.current.seek(parseInt(progress.currentTime) + 10);
                }}>
                <Image
                  source={require('../assets/images/forward.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                    marginLeft: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: 'white'}}>
                {format(progress?.currentTime)}
              </Text>
              <Slider
                style={{width: '80%', height: 40}}
                minimumValue={0}
                maximumValue={progress?.seekableDuration}
                value={progress?.currentTime}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFFFFF"
                thumbTintColor="gray"
                onSlidingComplete={() => setPaused(true)}
                onValueChange={x => {
                  videoRef.current.seek(x);
                  setProgress({
                    ...progress,
                    currentTime: x,
                  });
                }}
              />
              <Text style={{color: 'white'}}>
                {format(progress?.seekableDuration)}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                top: 10,
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Orientation.lockToPortrait();
                  navigation.goBack();
                }}>
                <Icon2 name="minimize" size={25} color={'white'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default ViewVideo;

import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import Loader from '../common/Loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const VideoPlayer = ({videos}) => {
  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    Orientation.lockToPortrait();
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

  const videoRef = useRef();
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  return (
    <View style={styles.container}>
      {videos?.map((video, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.video}
            onPress={() => setClicked(!clicked)}>
            <Video
              ref={videoRef}
              paused={paused}
              source={{
                uri: `https://bwptestpapers.com/public/video/${video.Video}`,
                // uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              }}
              // onBuffer={onBuffer} // Callback when remote video is buffering
              // onError={onError} // callback when video cannot be loaded
              style={{borderRadius: 15, width: '100%', height: 200}}
              resizeMode="cover"
              onProgress={x => {
                setProgress(x);
              }}
              repeat={true}
              onEnd={() => setPaused(true)}
            />
            <Text style={styles.videoTitle}>{video.VideoName}</Text>
            {clicked && (
              <TouchableOpacity
                style={{
                  width: '100%',
                  borderTopEndRadius: 15,
                  height: 200,
                  position: 'absolute',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setClicked(!clicked);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      videoRef.current.seek(
                        parseInt(progress.currentTime) - 10,
                      );
                    }}>
                    <Image
                      source={require('../../assets/images/backward.png')}
                      style={{width: 25, height: 25, tintColor: 'white'}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setPaused(!paused);
                    }}>
                    <Image
                      source={
                        paused
                          ? require('../../assets/images/play.png')
                          : require('../../assets/images/pause.png')
                      }
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: 'white',
                        marginLeft: 50,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      videoRef.current.seek(
                        parseInt(progress.currentTime) + 10,
                      );
                    }}>
                    <Image
                      source={require('../../assets/images/forward.png')}
                      style={{
                        width: 25,
                        height: 25,
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
                    bottom: 0,
                    paddingLeft: 10,
                    paddingRight: 20,
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
                      navigation.navigate('ViewVideo', {path: video.Video});
                    }}>
                    <Image
                      source={require('../../assets/images/maximize.png')}
                      style={{width: 20, height: 20, tintColor: 'white'}}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    backgroundColor: 'white',
  },
  video: {
    overflow: 'hidden',
    position: 'relative',
    marginTop: 10,
    width: '100%',
    height: 230,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: '#000000',
    elevation: 5,
    shadowOpacity: 1.0,
    display: 'flex',
    flexDirection: 'column',
  },
  videoTitle: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600',
    alignSelf: 'center',
  },
});

export default VideoPlayer;

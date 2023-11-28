import Carousel from 'react-native-reanimated-carousel';
import {Images} from '../../data/DigitalAssets';
import {View, Text, Dimensions, Image} from 'react-native';
import React from 'react';

const AnimatedCarousel = () => {
  const {width, height} = Dimensions.get('window');
  return (
    <Carousel
      loop
      width={width}
      height={width / 2}
      autoPlay={true}
      data={Images}
      scrollAnimationDuration={1000}
      renderItem={({item, index}) => (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Image source={{uri: item}} width={width} height={200} />
        </View>
      )}
    />
  );
};

export default AnimatedCarousel;

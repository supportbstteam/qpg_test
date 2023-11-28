import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Employees} from '../../data/Employee';
import Icon from 'react-native-vector-icons/Fontisto';
import Header from '../../components/common/Header';

const MyTeam = ({navigation}) => {
  return (
    <>
      <Header
        title={'My Team'}
        bg={'blue'}
        leftIcon={'arrowleft'}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={{flex: 1, paddingVertical: 10}}>
        {/* ONLY ADMIN AND SALES HEAD CAN SEE  */}
        <FlatList
          data={Employees}
          contentContainerStyle={{gap: 10, marginHorizontal: 10}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  height: 60,
                  width: 'auto',
                  borderRadius: 10,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item.image}}
                  width={60}
                  height={60}
                  resizeMode="cover"
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    marginLeft: 10,
                  }}>
                  <Text style={{fontSize: 15, color: 'black'}}>
                    {item.name}
                  </Text>
                  <Text>{item.designation}</Text>
                </View>
                <Icon
                  name="map-marker-alt"
                  size={20}
                  color={'blue'}
                  style={{marginLeft: 'auto', marginRight: 10}}
                  onPress={() =>
                    navigation.navigate('MapScreen', {
                      start: item.startLoc,
                      end: item.endLoc,
                    })
                  }
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

export default MyTeam;

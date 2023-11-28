import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/common/Header';
import {fetchUser} from '../helpers/fetchDetails';

const Profile = ({navigation}) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser();
      setUser(user);
    };
    getUser();
  }, []);
  return (
    <>
      <Header
        bg={'blue'}
        title={'Your Profile'}
        leftIcon={'arrowleft'}
        onLeftPress={() => navigation.navigate('Visits')}
      />
      <View style={styles.container}>
        <View style={styles.profilePicker}>
          <Image
            source={require('../assets/images/profile.png')}
            style={styles.profileIcon}
          />
          <TouchableOpacity style={styles.cameraView}>
            <Image
              source={require('../assets/images/camera.png')}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailView}>
          <View style={styles.labelView}>
            <Text style={styles.labelText}>Name</Text>
            <Text style={styles.labelText}>Designation</Text>
            <Text style={styles.labelText}>Role</Text>
            <Text style={styles.labelText}>Email ID</Text>
            <Text style={styles.labelText}>Contact</Text>
          </View>
          <View style={styles.labelView}>
            <Text style={styles.text}>{user?.name}</Text>
            <Text style={styles.text}>{user?.designation}</Text>
            <Text style={styles.text}>{user?.role}</Text>
            <Text style={styles.text}>{user?.email}</Text>
            <Text style={styles.text}>{user?.contact}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  profilePicker: {
    alignSelf: 'center',
  },
  profileIcon: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  cameraView: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: 'blue',
  },
  detailView: {
    marginTop: 100,
    flexDirection: 'row',
    gap: 20,
    marginHorizontal: 20,
  },
  labelView: {
    flexDirection: 'column',
    gap: 20,
  },
  labelText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    color: 'black',
    paddingTop: 2,
  },
});

export default Profile;

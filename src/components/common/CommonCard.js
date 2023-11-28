import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const CommonCard = ({title, icon, bgColor, onClick}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
      <View style={styles.cardInner}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 60,
    backgroundColor: 'blue',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  cardInner: {
    flexDirection: 'row',
    marginLeft: 15,
    gap: 15,
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  title: {
    fontSize: 17,
    color: 'white',
  },
});

export default CommonCard;

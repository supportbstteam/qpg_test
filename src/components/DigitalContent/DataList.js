import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const DataList = ({data, screenName, iconName}) => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, paddingVertical: 10}}>
      <FlatList
        contentContainerStyle={{gap: 7, paddingHorizontal: 10}}
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.listItem}
              onPress={() =>
                navigation.navigate(`${screenName}`, {
                  classId: item?.ClassID,
                  subjectId: item?.SubjectID,
                })
              }>
              <Icon name={iconName} size={30} color={'blue'} />
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontWeight: 'bold',
                  flexShrink: 1,
                }}>
                {item.ClassName ? item.ClassName : item.SubjectName}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 30,
  },
});

export default DataList;

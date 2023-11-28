import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DataList from '../components/DigitalContent/DataList';
import Header from '../components/common/Header';
import client from '../api/client';

const SelectClass = ({navigation}) => {
  const [classes, setClasses] = useState(undefined);

  useEffect(() => {
    const getClasses = async () => {
      try {
        let response = await client.get('/class');
        setClasses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getClasses();
  }, []);

  return (
    <>
      <Header
        title={'Classes'}
        bg={'blue'}
        leftIcon={'arrowleft'}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        <DataList
          iconName={'school'}
          data={classes}
          screenName={'SelectSubject'}
          label={'ClassName'}
        />
      </View>
    </>
  );
};

export default SelectClass;

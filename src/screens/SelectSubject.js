import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {Subjects} from '../data/DigitalAssets';
import DataList from '../components/DigitalContent/DataList';
import Header from '../components/common/Header';
import client from '../api/client';

const SelectSubject = ({route, navigation}) => {
  const [subjects, setSubjects] = useState(undefined);
  const ClassID = route.params.classId;

  useEffect(() => {
    const getSubjects = async () => {
      try {
        let response = await client.get(`/subject/${ClassID}`);
        setSubjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSubjects();
  }, [ClassID]);

  return (
    <>
      <Header
        bg={'blue'}
        title={'Subjects'}
        leftIcon={'arrowleft'}
        onLeftPress={() => navigation.goBack()}
      />
      <View style={{flex: 1}}>
        <DataList
          iconName={'book'}
          data={subjects}
          screenName={'DigitalContent'}
        />
      </View>
    </>
  );
};

export default SelectSubject;

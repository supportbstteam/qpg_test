import {View, Text, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/common/Header';
import AnimatedCarousel from '../components/DigitalContent/AnimatedCarousel';
import Cards from '../components/DigitalContent/Cards';
import VideoPlayer from '../components/DigitalContent/VideoPlayer';
import client from '../api/client';
import Orientation from 'react-native-orientation-locker';

const DigitalContent = ({route, navigation}) => {
  const [videos, setVideos] = useState(undefined);
  const [books, setBooks] = useState(undefined);
  const [pdfs, setPdfs] = useState(undefined);

  const classID = route.params.classId;
  const subjectID = route.params.subjectId;

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      await client.get(`/video/${classID}/${subjectID}`).then(
        response => {
          setVideos(response.data);
        },
        error => {
          console.log(error);
        },
      );
    };
    const getBooks = async () => {
      await client.get(`/book/${classID}/${subjectID}`).then(
        response => {
          setBooks(response.data);
        },
        error => {
          console.log(error);
        },
      );
    };
    const getPDFs = async () => {
      await client.get(`/pdf/${classID}/${subjectID}`).then(
        response => {
          setPdfs(response.data);
        },
        error => {
          console.log(error);
        },
      );
    };
    getVideos();
    getBooks();
    getPDFs();
  }, [classID, subjectID]);
  return (
    <>
      <Header
        bg={'blue'}
        title={'Content'}
        leftIcon={'arrowleft'}
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'white',
          marginHorizontal: 10,
          paddingVertical: 10,
        }}>
        <View style={{width: '100%'}}>
          <AnimatedCarousel />
        </View>
        <View style={{width: '95%', marginVertical: 10, marginHorizontal: 10}}>
          <Text style={styles.heading}>Animations</Text>
          {videos ? (
            <VideoPlayer videos={videos} />
          ) : (
            <Text style={styles.message}>No Animations Found!</Text>
          )}
        </View>
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Text style={styles.heading}>E-Books</Text>
        </View>
        {books ? (
          <Cards data={books} screen={'book'} />
        ) : (
          <Text style={styles.message}>No E-Books Found!</Text>
        )}
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Text style={styles.heading}>Answer Keys</Text>
        </View>
        {pdfs ? (
          <Cards data={pdfs} screen={'pdf'} />
        ) : (
          <Text style={styles.message}>No Answer Keys Found!</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontSize: 19,
    fontWeight: '700',
  },
  message: {
    color: 'darkgray',
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default DigitalContent;

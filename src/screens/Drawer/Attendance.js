import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/common/Header';
import {Calendar} from 'react-native-calendars';
import client from '../../api/client';
import {fetchUser} from '../../helpers/fetchDetails';

const Attendance = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [calendar, setCalendar] = useState(null);
  const [markedDays, setMarkedDays] = useState({});
  const [month, setMonth] = useState(10);
  const [year, setYear] = useState(2023);

  useEffect(() => {
    const getUser = async () => {
      const user = await fetchUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getAttendance = async () => {
      const data = {
        user_id: user?.id,
        month: month,
        year: year,
      };

      try {
        if (data.user_id) {
          let response = await client.post('/user-attendance', {...data});
          response = response.data;

          if (response.message) {
            setCalendar(null);
          } else {
            setCalendar(response);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAttendance();
  }, [month, year, user]);

  // Marking of Present Days

  useEffect(() => {
    const mapCalendar = () => {
      if (Array.isArray(calendar) && calendar.length > 0) {
        calendar.forEach(item => {
          setMarkedDays(prevState => ({
            ...prevState,
            [item.VisitDate]: {
              selected: true,
              marked: true,
              selectedColor: 'green',
            },
          }));
        });
      }
    };
    mapCalendar();
  }, [calendar]);

  const getMonthName = monthNumber => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
      month: 'long',
    });
  };

  const onMonthChange = month => {
    // {"dateString": "2023-11-11", "day": 11, "month": 11, "timestamp": 1699660800000, "year": 2023}
    setMonth(month.month);
    setYear(month.year);
  };

  return (
    <>
      <Header
        bg={'blue'}
        title={'Attendance'}
        leftIcon={'menu-unfold'}
        onLeftPress={() => navigation.toggleDrawer()}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{`${getMonthName(month)} Attendance`}</Text>
        <View style={styles.boxContainer}>
          <View style={[styles.statusBox, {backgroundColor: 'red'}]}>
            <Text style={styles.text}>Absent</Text>
            <Text style={styles.text}>0</Text>
          </View>
          <View style={[styles.statusBox, {backgroundColor: 'green'}]}>
            <Text style={styles.text}>Present</Text>
            <Text style={styles.text}>
              {calendar ? `${calendar?.length}` : `0`}
            </Text>
          </View>
        </View>
        <View>
          <Calendar
            style={styles.calendar}
            markedDates={markedDays}
            markingType="multi-dot"
            onMonthChange={onMonthChange}
          />
          <View style={styles.dotContainer}>
            <View style={[styles.dot, {backgroundColor: 'green'}]} />
            <Text style={{color: 'black'}}>Present</Text>
            <View style={[styles.dot, {backgroundColor: 'red'}]} />
            <Text style={{color: 'black'}}>Absent</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  boxContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 15,
  },
  statusBox: {
    width: 150,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  calendar: {
    alignSelf: 'center',
    marginVertical: 20,
    width: '90%',
    height: 350,
    elevation: 5,
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
    gap: 5,
  },
  dot: {
    marginHorizontal: 5,
    width: 15,
    height: 15,
    borderRadius: 15,
  },
});

export default Attendance;

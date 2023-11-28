import {View, Text} from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import Loader from '../components/common/Loader';

const ViewBook = ({route}) => {
  const path = route.params.path;
  const screen = route.params.screen;
  return (
    <View style={{flex: 1}}>
      <Pdf
        trustAllCerts={false}
        source={{uri: `https://bwptestpapers.com/public/${screen}/${path}`}}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{flex: 1}}
        onLoadProgress={() => <Loader />}
        enablePaging={true}
      />
    </View>
  );
};

export default ViewBook;

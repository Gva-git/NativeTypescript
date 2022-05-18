import {TabRouter} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
// import SingleUserForm from './SingleUserForm';
import SingleUserForm from './SingleUserForm';

const ViewUser = ({route}: any) => {
  return (
    <View style={{marginHorizontal: 20}}>
      {/* <Text>{route.params.id}</Text> */}
      <SingleUserForm id={route.params.id} />
    </View>
  );
};

export default ViewUser;

const styles = StyleSheet.create({});

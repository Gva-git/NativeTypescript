import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SingleUserForm from '../Forms/SingleUserForm';

const ViewUser = () => {
  return (
    <View style={{marginHorizontal: 20}}>
      <SingleUserForm />
    </View>
  );
};

export default ViewUser;

const styles = StyleSheet.create({});

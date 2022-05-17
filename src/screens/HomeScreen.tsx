import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchUser} from '../redux/slices/userSlice';
import {userList} from '../redux/store';
import {fetchIndividualUser} from '../redux/slices/userSlice';

const UserBlock = ({
  data,
  index,
}: {
  data: any;
  index: number;
}): React.ReactElement => {
  return (
    <View key={index} style={styles.userLists}>
      <View style={styles.usersName}>
        <Text style={styles.text}>{data.first_name}</Text>
        <Text>{data.last_name}</Text>
      </View>
      <Text>{data.email}</Text>
    </View>
  );
};

const HomeScreen = ({navigation}: {navigation: any}): React.ReactElement => {
  const dispatch = useDispatch();
  const {users, isLoading, hasError} = useSelector(userList);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const onViewUser = (id: number) => {
    //   navigation.navi
    dispatch(fetchIndividualUser(id));
    // console.log(id);
    navigation.navigate('ViewUser');
  };

  const renderUser = () => {
    if (hasError) {
      //   console.log('hasError');
      return (
        <View>
          <Text>Error Occured</Text>
        </View>
      );
    } else if (users) {
      //   console.log('No Data');
      if (users.data.length <= 0) {
        return (
          <View>
            <Text style={{color: '#000'}}>No Data Found</Text>
          </View>
        );
      } else {
        // console.log('return');
        return (
          <FlatList
            key={'list-user'}
            data={users.data}
            renderItem={({item, index}: {item: {}; index: number}) => (
              <>
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onViewUser(item.id)}>
                  <UserBlock key={'users' + index} data={item} index={index} />
                </TouchableOpacity>
              </>
            )}
          />
        );
      }
    }
  };

  return (
    <View style={{marginHorizontal: 10}}>
      <Text>Users List from FlatList</Text>
      {renderUser()}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userLists: {
    height: 80,
    backgroundColor: '#fff',
    elevation: 2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 8,
    borderRadius: 10,
  },
  usersName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

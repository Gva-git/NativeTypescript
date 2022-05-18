import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AddUserForm from '../Forms/AddUserForm';
import {fetchUser} from '../redux/slices/userSlice';
import {userList} from '../redux/store';
import {fetchIndividualUser} from '../redux/slices/editUserSlice';
import {addUser} from '../redux/store';
import {fetchDeleteUser} from '../redux/slices/deleteUserSlice';

const UserBlock = ({
  data,
  index,
}: {
  data: any;
  index: number;
}): React.ReactElement => {
  return (
    <View key={'inc_' + index} style={styles.userLists}>
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
  const [modalVisible, setModalVisible] = useState(false);
  const {users, isLoading, hasError} = useSelector(userList);

  const {data} = useSelector(addUser);

  useEffect(() => {
    dispatch(fetchUser());
    if (data) {
      setModalVisible(false);
    } else {
      setModalVisible(true);
    }
  }, [dispatch]);

  const onViewUser = (id: number) => {
    dispatch(fetchIndividualUser(id));
    navigation.navigate('ViewUser', {id: id});
  };

  const onDelete = (id: number) => {
    dispatch(fetchDeleteUser(id));
    console.log('id', id);
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
            // key={'list-user'}
            data={users.data}
            renderItem={({
              item,
              index,
            }: {
              item: {id: number};
              index: number;
            }) => (
              <View key={index} style={styles.listCard}>
                <TouchableOpacity
                  key={index}
                  onPress={() => onViewUser(item.id)}
                  style={{width: '85%'}}>
                  <UserBlock key={'users' + index} data={item} index={index} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onDelete(item.id)}
                  style={{
                    width: '15%',
                    height: 80,
                    backgroundColor: '#bebebe',
                    justifyContent: 'center',
                    elevation: 5,
                  }}>
                  <Text style={styles.delButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        );
      }
    }
  };

  return (
    <View style={{marginHorizontal: 10}}>
      {/* <Text>Users List from FlatList</Text> */}
      <View style={{height: '85%'}}>{renderUser()}</View>
      <View
        style={{
          height: '15%',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View
            style={{
              alignItems: 'flex-end',
              width: '70%',
              position: 'relative',
              zIndex: 999999999,
              top: 10,
            }}>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
          <View style={styles.modalView}>
            <AddUserForm />
          </View>
        </View>
      </Modal>
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
    // marginVertical: 10,
    padding: 8,
    // borderRadius: 10,
  },
  usersName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  plus: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#6600ee',
    elevation: 5,
    width: 50,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '70%',
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#6600ee',
    paddingVertical: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  textStyle: {
    color: '#fff',
  },
  delButton: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  listCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
});

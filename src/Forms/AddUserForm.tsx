import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import FormInput from '../components/FormInput';
import {fetchAddUser} from '../redux/slices/addUserSlice';
import {addUserSuccess} from '../redux/slices/addUserSlice';
import {useDispatch, useSelector} from 'react-redux';
import {addUser} from '../redux/store';

const AddUserForm = (props: any, {navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const {data, hasError} = useSelector(addUser);

  const onSubmit = (value: {
    first_name: string;
    last_name: string;
    email: string;
  }) => {
    console.log('value', value);
    dispatch(fetchAddUser(value));
    setModalVisible(true);
  };

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <View style={{width: '100%'}}>
      <Text style={{fontWeight: 'bold'}}>Add New User...</Text>
      <Field name="first_name" label="First Name" component={FormInput} />
      <Field name="last_name" label="Last Name" component={FormInput} />
      <Field name="email" label="E-mail" component={FormInput} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText} onPress={props.handleSubmit(onSubmit)}>
          Submit
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        // transparent={true}
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
              onPress={() => {
                setModalVisible(!modalVisible);
                // navigation.navigate('HomeScreen');
              }}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
          <View style={styles.modalView}>
            <Text>User Added Successfully</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default reduxForm({
  form: 'addForm',
})(AddUserForm);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6600ee',
    width: '100%',
    padding: 14,
    marginTop: 20,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
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
});

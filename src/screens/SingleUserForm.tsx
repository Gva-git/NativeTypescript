import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FormInput from '../components/FormInput';
import {Field, reduxForm} from 'redux-form';
import {useDispatch, useSelector, connect} from 'react-redux';
import {singleUser} from '../redux/store';
import {fetchUpdateUser} from '../redux/slices/updateUserSlice';
import {updateUser} from '../redux/store';

const SingleUserForm = (props: any, {navigation}: {navigation: any}) => {
  const dispatch = useDispatch();
  // console.log('props.id', props.id);
  const {user, isLoading} = useSelector(singleUser);
  const [editState, setEditState] = useState(false);

  const {data, hasError} = useSelector(updateUser);

  const onSubmit = (value: {
    first_name: string;
    last_name: string;
    email: string;
  }) => {
    dispatch(fetchUpdateUser(props.id, value));
    // console.log('update', value);s
  };

  return (
    <View style={{justifyContent: 'center', height: '100%'}}>
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 20,
          fontSize: 22,
          fontWeight: 'bold',
        }}>
        {user.data.first_name}&nbsp;&nbsp;
        {user.data.last_name}
      </Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => setEditState(!editState)}>
        <Text style={styles.editBtnTxt}>Edit</Text>
      </TouchableOpacity>

      {user && (
        <View style={styles.container}>
          <View style={styles.viewUser}>
            <Text style={styles.title}>First Name:</Text>
            {editState ? (
              <Field
                name="first_name"
                label="First Name"
                component={FormInput}
                value={user.data.first_name}
                style={{height: 10}}
              />
            ) : (
              <Text style={styles.sub}>{user.data.first_name}</Text>
            )}
          </View>
          <View style={styles.viewUser}>
            <Text style={styles.title}>Last Name:</Text>
            {editState ? (
              <Field
                name="last_name"
                label="Last Name"
                component={FormInput}
                value={user.data.last_name}
              />
            ) : (
              <Text style={styles.sub}>{user.data.last_name}</Text>
            )}
          </View>
          <View style={styles.viewUser}>
            <Text style={styles.title}>E-mail</Text>
            {editState ? (
              <Field
                name="email"
                label="E-mail"
                component={FormInput}
                value={user.data.email}
              />
            ) : (
              <Text style={styles.sub}>{user.data.email}</Text>
            )}
          </View>
        </View>
      )}
      {editState ? (
        <TouchableOpacity
          onPress={props.handleSubmit(onSubmit)}
          style={styles.subButton}>
          <Text
            style={{textAlign: 'center', color: '#fff', fontWeight: 'bold'}}>
            Submit
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

export default reduxForm({
  form: 'updateUserForm',
})(SingleUserForm);

// export default connect(state => ({
//   initialValues: {
//     first_name: 'george',
//     last_name: 'test',
//     email: 'test@gmail',
//   },
// }))(SingleUserForm);

const styles = StyleSheet.create({
  viewUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '40%',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  sub: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#6600ee',
  },
  editButton: {
    alignItems: 'flex-end',
  },
  editBtnTxt: {
    backgroundColor: '#6600ee',
    textAlign: 'center',
    color: '#fff',
    padding: 5,
    paddingHorizontal: 20,
  },
  subButton: {
    backgroundColor: '#6600ee',
    padding: 10,
  },
});

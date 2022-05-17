import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import FormInput from '../components/FormInput';
import {Field, reduxForm} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import {singleUser} from '../redux/store';

const SingleUserForm = (props: any, {navigation}: {navigation: any}) => {
  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();

  const {users, isLoading, hasError} = useSelector(singleUser);

  useEffect(() => {
    console.log('individual', users);
  }, []);

  return (
    <View>
      <Field
        name="first_name"
        label="First Name"
        component={FormInput}
        // defaultValue="hbhb"
        value={users.data && users.data.first_name}
      />
      <Field name="last_name" label="Last Name" component={FormInput} />
      <Field name="email" label="E-mail" component={FormInput} />
    </View>
  );
};

export default reduxForm({
  form: 'singleUserForm',
})(SingleUserForm);

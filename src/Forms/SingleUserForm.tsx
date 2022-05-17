import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import FormInput from '../components/FormInput';
import {Field, reduxForm} from 'redux-form';
import {useDispatch, useSelector, connect} from 'react-redux';
import {ApplicationState, singleUser} from '../redux/store';

let SingleUserForm = (
  props: any,
  {navigation}: {navigation: any},
  state: ApplicationState,
) => {
  // console.log('state', current(state));
  // const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();

  const {user, isLoading, hasError} = useSelector(singleUser);

  useEffect(() => {
    console.log('individual', user);
  }, []);

  return (
    <View>
      <Field name="first_name" label="First Name" component={FormInput} />
      <Field name="last_name" label="Last Name" component={FormInput} />
      <Field name="email" label="E-mail" component={FormInput} />
    </View>
  );
};

SingleUserForm = reduxForm({
  form: 'singleUserForm',
})(SingleUserForm);

export default connect(state => ({
  initialValues: {
    first_name: 'george',
    last_name: 'test',
    email: 'test@gmail',
  },
}))(SingleUserForm);

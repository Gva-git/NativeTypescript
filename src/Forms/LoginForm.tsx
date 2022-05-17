import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Field, reduxForm} from 'redux-form';
import FormInput from '../components/FormInput';

import {useDispatch, useSelector} from 'react-redux';

import {onLogin} from '../redux/slices/loginAuthSlice';
import {authUser} from '../redux/store';

const LoginForm = (props: any, {navigation}: {navigation: any}) => {
  const [errMsg, setErrMsg] = useState('');

  const dispatch = useDispatch();

  const {user, error} = useSelector(authUser);

  const {token} = user;

  useEffect(() => {
    if (token) {
      setErrMsg('');
      props.navigation.navigate('HomeScreen');
    } else if (error) {
      setErrMsg(error);
    }
  }, [token, error]);

  const onSubmit = (value: any) => {
    dispatch(onLogin(value));
    console.log(value);
  };

  return (
    <View>
      <Field name="email" label="Email" component={FormInput} />
      <Field name="password" label="Password" component={FormInput} />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={props.handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 10, color: '#000', textAlign: 'right'}}>
          Forgot Password?
        </Text>
      </View>

      {errMsg ? (
        <View>
          <Text>{errMsg}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default reduxForm({
  form: 'myForm',
})(LoginForm);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6600ee',
    width: '100%',
    padding: 14,
    marginTop: 20,
  },
  title: {
    color: '#6600ee',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FormInput from '../components/FormInput';
import {onLogin} from '../redux/slices/loginAuthSlice';
import {authUser} from '../redux/store';
import {Field, reduxForm} from 'redux-form';

const LoginScreen = (
  props: any,
  {navigation}: {navigation: any},
): React.ReactElement => {
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
    <View style={{height: '100%'}}>
      <View style={{height: '30%', justifyContent: 'center'}}>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <View style={styles.container}>
        {/* FORM FOR USER LOGIN */}
        <View>
          <Field
            name="email"
            label="Email"
            component={FormInput}
            secureTextEntry={false}
            testID="email.field"
          />
          <Field
            name="password"
            label="Password"
            component={FormInput}
            secureTextEntry={true}
            testID="password.field"
          />
          <View>
            <TouchableOpacity
              testID="loginButton"
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
        {/* FORM FOR USER LOGIN */}

        <Text style={{textAlign: 'center'}}>--Powered by Test--</Text>
      </View>
    </View>
  );
};

export default reduxForm({
  form: 'myForm',
})(LoginScreen);

const styles = StyleSheet.create({
  container: {
    // marginTop: 200,
    marginHorizontal: 10,
    padding: 20,
    height: '70%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 5,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    justifyContent: 'center',
    // backgroundColor: '#bebebe'
  },
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

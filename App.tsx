import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {store} from './src/redux/store';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ViewUser from './src/screens/ViewUser';

type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  ViewUser: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="LoginScreen"
            options={{headerShown: false}}
            component={LoginScreen}
          />
          <RootStack.Screen name="HomeScreen" component={HomeScreen} />
          <RootStack.Screen name="ViewUser" component={ViewUser} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

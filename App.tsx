import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {store} from './src/redux/store';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ViewUser from './src/screens/ViewUser';

const Stack = createNativeStackNavigator();

const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            options={{headerShown: false}}
            component={LoginScreen}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ViewUser" component={ViewUser} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

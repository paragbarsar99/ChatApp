import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import store from '../src/Store/store';

import {Provider} from 'react-redux';

import Login from './screens/Login';
import Home from './screens/Home';

import {firebase} from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const AuthFlow = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const HomeScreen = ({userId}) => (
  <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} initialParams={{userId:userId}} />
  </Stack.Navigator>
);

const WhereToGo = () => {
  const [user, setuser] = useState(null);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setuser(user.uid);
    } else {
      setuser(false);
      // User not logged in or has just logged out.
    }
  });
  if (user) return <HomeScreen userId={user} />;

  return <AuthFlow />;
};

export default App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <WhereToGo />
    </NavigationContainer>
  </Provider>
);

const styles = StyleSheet.create({});

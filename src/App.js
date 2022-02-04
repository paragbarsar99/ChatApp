import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

import store from '../src/Store/store';
import {Provider} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNetInfo} from '@react-native-community/netinfo';

import Login from './screens/Login';
import Home from './screens/Home';
import Chat from './screens/Chat';
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LogSign from './Component/LogSign';

const AnimatedLottieView = require('lottie-react-native');
const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();

const SignUpFlow = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen
      name="welcome"
      component={Welcome}
      options={{
        headerShown: true,
        title: 'WelCome',
      }}
    />
  </Stack.Navigator>
);

const AuthFlow = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUpFlow" component={SignUpFlow} />
  </Stack.Navigator>
);

const HomeScreen = () => (
  <Stack.Navigator
    // detachInactiveScreens
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#eee',
        elevation: 1,
        height: 50,
      },
      title: '',
      headerLeft: ({}) => (
        <View
          style={{
            left: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            defaultSource={require('./assests/firebase-icon.png')}
            source={{uri: auth().currentUser.photoURL}}
            style={{width: 40, height: 40, borderRadius: 40 / 2}}
            resizeMode="cover"
          />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 18,
              color: 'black',
              padding: 5,
              textTransform: 'capitalize',
            }}>
            {auth().currentUser.displayName}
          </Text>
        </View>
      ),
      headerTitleStyle: {
        fontSize: 18,
        color: 'blue',
      },
      headerRight: ({navigation}) => (
        <TouchableOpacity
          style={{
            width: 80,
            height: 40,
            borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.1)',
            elevation: 1,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            right: 10,
          }}
          activeOpacity={0.7}
          onPress={notificationHandler}>
          <Text style={{fontSize: 15, color: '#000000'}}>LogOut 😒</Text>
        </TouchableOpacity>
      ),
    }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen
      name="Chat"
      component={Chat}
      options={({route, navigation}) => ({
        headerShown: true,
        headerRight: null,
        headerLeft: () => {
          return (
            <Pressable onPress={() => navigation.pop()}>
              <View
                style={{
                  width: 60,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={22}
                  style={{left: 5}}
                />
                <Image
                  source={{uri: route.params.photoURL}}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    left: 3,
                  }}
                />
              </View>
            </Pressable>
          );
        },
        title: route.params.title,
        headerTitleStyle: {
          color: 'black',
          fontSize: 18,
          textAlign: 'left',
          textTransform: 'capitalize',
        },
      })}
    />
  </Stack.Navigator>
);

function NetInfo() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <StatusBar backgroundColor={'black'} />
      <View
        style={{
          width: width,
          height: height / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <AnimatedLottieView
          source={require('./assests/LottiAnimation/no-internet.json')}
          autoPlay
          loop
        />
      </View>
      <Text style={{color: 'white', fontSize: 15}}>
        no internet connection...
      </Text>
    </View>
  );
}

const notificationHandler = async () => auth().signOut();

const WhereToGo = () => {
  const [user, setuser] = useState(null);

  auth().onAuthStateChanged(user => {
    if (user) {
      setuser(user.uid);
    } else {
      setuser(false);
    }
  });
  if (user) {
    return <HomeScreen />;
  } else {
    return <AuthFlow />;
  }
};

export default App = () => {
  const netInfo = useNetInfo();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          {netInfo.isConnected ? <WhereToGo /> : <NetInfo />}
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

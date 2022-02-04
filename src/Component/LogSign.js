import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StatusBar,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {Input} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function LogSign({callback, title, navigateTo}) {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setpassword] = useState(null);
  const [emailerror, setemailerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);

  const navigation = useNavigation();
  const [onTouch, setOnTouch] = useState({
    email: false,
    password: false,
  });

  function MakeACall() {
    if (!email) {
      setemailerror(true);
    } else if (!password) {
      setpassworderror(true);
    } else {
      callback(email, password);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <View style={styles.maincontainer}>
          <View
            style={{
              alignSelf: 'flex-start',
              width: 100,
              height: 100,
              right: 18,
            }}>
            <AnimatedLottieView
              loop
              autoPlay
              source={require('../assests/LottiAnimation/chat.json')}></AnimatedLottieView>
          </View>
          <View
            style={{
              alignSelf: 'flex-start',
              justifyContent: 'space-between',
              left: 10,
            }}>
            <Text style={styles.LoginNow}>
              {title === 'Login' ? 'Hey,\nLogin Now' : 'Hey,\nSign Up Now!'}
            </Text>
            <View style={{flexDirection: 'row', top: 10}}>
              <Text style={styles.guide}>
                {title === 'Login'
                  ? 'if you are new?/'
                  : 'if you have a account?'}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{marginLeft: 5}}
                onPressIn={() => navigation.navigate(navigateTo)}>
                <Text style={styles.createNow}>
                  {title === 'Login' ? 'Create New' : 'Login Now!'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 60 + 60 + 10,
              justifyContent: 'space-between',
            }}>
            <Input
              value={email}
              onChangeText={item => {
                setEmail(item);
              }}
              errorStyle={{color: 'black'}}
              errorMessage={emailerror ? 'Please Fill The Phone' : false}
              inputContainerStyle={{borderBottomWidth: 0}}
              style={{
                //   opacity: 0.8,
                width: '100%',
                height: 55,
                backgroundColor: onTouch.email ? '#F2913DBF' : '#A4A6A94D',
                borderRadius: 10,
                color: 'black',
                fontSize: 12,
              }}
              onPressIn={() => {
                emailerror && setemailerror(!emailerror);
                passworderror && setemailerror(!passworderror);

                setOnTouch(previous => {
                  if (previous.email) {
                    return {
                      ...onTouch,
                    };
                  } else {
                    return {
                      ...onTouch,
                      email: true,
                      password: false,
                    };
                  }
                });
              }}
              placeholder={
                onTouch.email ? null : 'Enter Login Email...'
              }></Input>
            <Input
              value={password}
              errorStyle={{color: 'black'}}
              onChangeText={item => {
                setpassword(item);
              }}
              errorMessage={passworderror ? 'Please Fill The Password' : false}
              secureTextEntry={true}
              inputContainerStyle={{borderBottomWidth: 0}}
              onPressIn={() => {
                emailerror && setemailerror(!emailerror);
                passworderror && setemailerror(!passworderror);
                setOnTouch(previous => {
                  if (previous.password) {
                    return {
                      ...onTouch,
                    };
                  } else {
                    return {
                      ...onTouch,
                      password: true,
                      email: false,
                    };
                  }
                });
              }}
              style={{
                width: '100%',
                height: 55,
                borderRadius: 10,
                color: 'black',
                fontSize: 12,
                backgroundColor: onTouch.password ? '#F2913DBF' : '#A4A6A94D',
              }}
              placeholder={onTouch.password ? null : 'Enter password'}></Input>
          </View>

          <TouchableOpacity
            onPress={() => MakeACall()}
            style={{
              width: '94%',
              height: 55,
              backgroundColor: '#6E080FCC',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>
              {title === 'Login' ? 'Login' : 'SignUp'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  maincontainer: {
    width: Dimensions.get('window').width - 50,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  LoginNow: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  createNow: {
    fontSize: 13,
    color: '#292E39',
    fontWeight: '500',
  },
  guide: {
    fontSize: 12,
    color: '#A4A69C',
  },
});

import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';

import {firebase} from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const [confirm, setConfirm] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setpassword] = useState(null);
  const [emailerror, setemailerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);

  const AlretMessage = errormessage =>
    Alert.alert('Something Went Wrong', `${errormessage}`);

  async function signInWithEmailandPassword() {
    try {
      if (!email) {
        setemailerror(true);
      } else if (!password) {
        setpassworderror(true);
      } else {
        if (isSignUp) {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => console.log(res.user.uid))
            .catch(err => {
              AlretMessage(err.message);
            });
        } else {
          await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(res => console.log(res.user.getIdToken))
            .catch(err => {
              AlretMessage(err.message);
            });
        }
      }
    } catch (Error) {
      console.log(`Error catch in:  ${Error}`);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar backgroundColor="#ef8e38" />
        <View>
          <Image
            style={styles.image}
            source={require('../assests/firebase-icon.png')}
          />
          <Text style={styles.brand}>Login With Firebase</Text>
        </View>
        <Input
          containerStyle={styles.email}
          placeholder="Enter Email"
          leftIcon={{type: 'Zocial', name: 'email', color: 'white'}}
          placeholderTextColor="gray"
          inputStyle={{color: 'white'}}
          autoCapitalize="none"
          autoCompleteType="off"
          blurOnSubmit={true}
          errorMessage={emailerror ? 'Please Fill The Phone' : false}
          errorStyle={{color: 'red'}}
          onChangeText={item => {
            setEmail(item);
          }}
          keyboardType="email-address"></Input>

        <Input
          placeholder="password"
          leftIcon={{type: 'fontAwesome', name: 'lock', color: 'white'}}
          placeholderTextColor="gray"
          inputStyle={{color: 'white'}}
          autoCapitalize="none"
          autoCompleteType="off"
          blurOnSubmit={true}
          errorMessage={passworderror ? 'Please Fill The Password' : false}
          errorStyle={{color: 'red'}}
          onChangeText={item => {
            setpassword(item);
          }}
          secureTextEntry={true}></Input>
        {isSignUp ? (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: width / 2,
                alignSelf: 'center',
              }}
              onPress={signInWithEmailandPassword}>
              <LinearGradient
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 1.0}}
                colors={['#F57C00', '#FFCA28']}
                style={styles.btnlogin}>
                <Text
                  style={styles.txtlogin}
                  titleStyle={{color: 'blue', fontSize: 18}}>
                  SignUp
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setisSignUp(false)}>
              <Text style={{fontSize: 12, color: 'white', alignSelf: 'center'}}>
                Already have a account login here
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: width / 2,
                alignSelf: 'center',
              }}
              onPress={signInWithEmailandPassword}>
              <LinearGradient
                start={{x: 0.0, y: 0.25}}
                end={{x: 0.5, y: 1.0}}
                colors={['#F57C00', '#FFCA28']}
                style={styles.btnlogin}>
                <Text
                  style={styles.txtlogin}
                  titleStyle={{color: 'blue', fontSize: 18}}>
                  Login
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setisSignUp(true)}>
              <Text style={{fontSize: 12, color: 'white', alignSelf: 'center'}}>
                have no Account? Signup Here
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    backgroundColor: '#000000ff',
    width: width,
    height: height,
  },
  image: {
    width: 150,
    height: 200,
    alignSelf: 'center',
    marginTop: 0,
  },
  brand: {
    color: '#ffffff',
    fontSize: 20,
    alignSelf: 'center',
    margin: 5,
    fontWeight: '400',
    fontFamily: 'GoodFeelingSans',
  },
  email: {
    marginTop: 0,
  },

  txtlogin: {
    color: 'white',
    alignSelf: 'center',
    padding: 7,
    fontSize: 20,
  },
  btnlogin: {
    width: width / 2,
    height: 50,
    alignSelf: 'center',
    alignitem: 'center',
    borderRadius: 20,
  },
  linearGradient: {
    width: width,
    height: height,
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
  },
});

export default Login;

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


import {firebase} from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {
  CreateUserDocumentAction,
  FetchAllTheUsers,
} from '../Store/Actions/getdataAction';
import LogSign from '../Component/LogSign';

const {width, height} = Dimensions.get('window');

export const AlretMessage = errormessage =>
  Alert.alert('Something Went Wrong', `${errormessage}`);

const Login = ({navigation}) => {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setpassword] = useState(null);
  const [emailerror, setemailerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [isSignUp, setisSignUp] = useState(false);

  const dispatch = useDispatch();

  function CreateUserDocument(email, userName = null) {
    //creating new user inside Collection("chat")
    dispatch(CreateUserDocumentAction(userName, email));
  }

  async function signInWithEmailandPassword(email, password) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => CreateUserDocument(email))
        .catch(err => {
          AlretMessage(err.message);
        });
    } catch (Error) {
      console.log(`Error catch in:  ${Error}`);
    }
  }

  return (
    <LogSign
      callback={signInWithEmailandPassword}
      title={'Login'}
      navigateTo={'SignUpFlow'}
    />
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000ff',
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
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
    marginTop: 10,
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
  goToScreen: {
    alignSelf: 'center',
    alignItems: 'center',
    margin: 10,
  },
  gotofont: {
    color: 'white',
    fontSize: 13,
    fontWeight: '400',
  },
});

export default Login;

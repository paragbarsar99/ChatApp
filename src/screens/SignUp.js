import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {useDispatch} from 'react-redux';

import {styles} from './Login';
import {CreateUserDocumentAction} from '../Store/Actions/getdataAction';
import {Input} from 'react-native-elements';
import LogSign from '../Component/LogSign';
import {create} from 'react-test-renderer';

const {width, height} = Dimensions.get('window');

export default function SignUp({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setpassword] = useState(null);
  const [emailerror, setemailerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);

  const dispatch = useDispatch();

  const AlretMessage = errormessage =>
    Alert.alert('Something Went Wrong', `${errormessage}`);

  async function createUserWithEmailAndPassword(email, password) {
    try {
      navigation.navigate('welcome', {
        email,
        password,
      });
    } catch (Error) {
      console.log(`Error catch in:  ${Error}`);
    }
  }

  return (
    <LogSign
      title={''}
      callback={createUserWithEmailAndPassword}
      navigateTo={'Login'}
    />
  );
}

// const styles = StyleSheet.create({});

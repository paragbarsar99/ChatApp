import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {FetchAllTheUsersAction} from '../Store/Actions/getdataAction';

export default function LoadingScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:"red"}}>
      <Text style={{color: 'black', fontSize: 16}}> Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

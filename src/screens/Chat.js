import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Chatme from '../Component/Chatme';

export default function Chat({route}) {
 
  return <Chatme revicerId={route.params.id} email={route.params.email}/>;
}

const styles = StyleSheet.create({});

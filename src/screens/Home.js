import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
  TabBarIOSItem,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

import ItemSeperator from '../Component/ItemSeperator';
import {USER_LIST} from '../Store/Actions/AllTheAction';

const {width, height} = Dimensions.get('window');

export default function Home({navigation}) {
  const [userState, setUserState] = useState([]);

  const dispatch = useDispatch();

  function RenderUserListItem({item, index}) {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Chat', {
            email: item.email,
            id: item.id,
            title: item.userName,
            photoURL: item.photoUrl,
          })
        }
        style={{
          width: width - 50,
          height: 80,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          elevation: 1,
          backgroundColor: '#eee',
          borderRadius: 15,
        }}>
        <View style={{flex: 1}}>
          <Image
            source={{uri: item.photoUrl}}
            style={{
              width: 70,
              height: 70,
              borderRadius: 70 / 2,
              left: 20,
            }}
            resizeMethod="resize"
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 2,
          }}>
          <Text
            style={{
              textTransform: 'capitalize',
              color: 'black',
              fontSize: 18,
              alignSelf: 'flex-start',
              left: 20,
            }}>
            {item.userName}
          </Text>
        </View>
      </Pressable>
    );
  }

  console.log(auth().currentUser.displayName);
  console.log(auth().currentUser.photoURL);
  console.log(userState);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View
          style={{
            left: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
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
    });
    async function Init() {
      const LoginedInEmail = await AsyncStorage.getItem('LoginMail');
      const chatsRef = firestore().collection('users');
      const unsubcribe = chatsRef.onSnapshot(querySnapshot => {
        try {
          let userList = querySnapshot
            .docChanges()
            .filter(({type}) => type === 'added')
            .map(({doc}) => {
              return {
                id: doc.data().uid,
                userName: doc.data().name,
                email: doc.data().email,
                photoUrl: doc.data().photoUrl,
              };
            })
            .filter(item => item.email != JSON.parse(LoginedInEmail));

          setUserState(previous => previous.concat(userList));
          // dispatch({type: USER_LIST, payload: userState});
        } catch (error) {
          console.log(error);
        }
      });
      return unsubcribe;
    }
    Init();
  }, []);

  return (
    <View styles={styles.container}>
      <FlatList
        ListFooterComponent={ItemSeperator}
        scrollsToTop
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          paddingBottom: 20,
        }}
        ItemSeparatorComponent={ItemSeperator}
        data={userState}
        keyExtractor={(item, index) => String(index)}
        renderItem={RenderUserListItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
  },
});

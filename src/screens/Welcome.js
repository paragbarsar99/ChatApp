import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Touchable,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Input, Image} from 'react-native-elements';
import React, {useState} from 'react';

import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';


import {AlretMessage} from './Login';
import {CreateUserDocumentAction} from '../Store/Actions/getdataAction';
import {styles} from './Login';

const {width, height} = Dimensions.get('window');

export default function Welcome({route}) {
  const imageUrlStore = React.useRef('');
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [imageUrl, setImageUrl] = useState({
    isImageAvailable: false,
    imagesize: null,
    filename: '',
    filepath: '',
  });

  const dispatch = useDispatch();

  const {email, password} = route.params;

  function selectProfilePic() {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.5,
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const filepath =
          Platform.OS === 'ios'
            ? response.assets[0].sourceURL
            : response.assets[0].uri;
        imageUrlStore.current = filepath;
        setImageUrl({
          ...imageUrl,
          isImageAvailable: true,
          imagesize: response.assets[0].fileSize,
          filepath,
          filename: response.assets[0].fileName,
        });
      }
    });
  }

  async function SignUpMe() {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const uid = res.user.uid;
        const Filename = imageUrl.filename;
        const Filepath = imageUrl.filepath;
        dispatch(
          CreateUserDocumentAction(userName, email, uid, Filename, Filepath),
        );
      })
      .catch(err => {
        AlretMessage(err.message);
      });
  }

  function saveUserName() {
    if (userName !== '' && imageUrl.filename !== '') {
      console.log(userName, imageUrl);
      SignUpMe();
    } else {
      setUserNameError(true);
      return;
    }
  }
  console.log(imageUrlStore);
  return (
    <>

    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar translucent backgroundColor={"transparent"} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {imageUrl.isImageAvailable ? (
          <Image
            onPress={selectProfilePic}
            // defaultSource={{uri: imageUrlStore.current}}
            source={{uri: imageUrl.filepath}}
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              padding: 10,
            }}
            resizeMode="cover"
          />
        ) : (
          <TouchableOpacity
            onPress={selectProfilePic}
            style={{
              backgroundColor: '#eee',
              alignItems: 'center',
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Entypo
              name={'user'}
              size={120}
              style={{alignSelf: 'flex-start', left: 15}}
            />
            <MaterialIcons
              name="add-a-photo"
              size={22}
              style={{alignSelf: 'flex-start', right: 10}}
            />
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
        <Input
          style={{
            width: '100%',
            height: 55,
            backgroundColor: '#F2913DBF',
            borderRadius: 10,
            color: 'black',
            fontSize: 12,
          }}
          onPressIn={() => userNameError && setUserNameError(!userNameError)}
          inputContainerStyle={{borderBottomWidth: 0}}
          autoCapitalize="words"
          textContentType="name"
          containerStyle={{width: width - 40}}
          textAlign="center"
          inputStyle={{color: 'black', fontSize: 18, fontWeight: '600'}}
          value={userName}
          onChangeText={name => setUserName(name)}
          placeholder="type your name here..."
          numberOfLines={1}
          renderErrorMessage
          errorMessage={userNameError ? 'please fill your name' : null}
          errorStyle={{
            color: 'black',
            fontSize: 10,
            textAlign: 'left',
          }}></Input>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            top: 20,
            borderRadius: 10,
            height: 55,
            width: width / 2,
            alignSelf: 'center',
            backgroundColor: '#6E080FCC',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={saveUserName}>
          <Text style={{fontSize: 16, color: 'white', fontWeight: '500'}}>
            {' '}
            Login & Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </>

  );
}

// const styles = StyleSheet.create({});

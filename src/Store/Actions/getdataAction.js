import {FETCH_ITEM, USER_LIST} from './AllTheAction';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';

const usersRef = firestore().collection('users');

export const CreateUserDocumentAction = (
  userName = null,
  email,
  uid = null,
  Filename = null,
  Filepath = null,
) => {
  return async dispatch => {
    try {
      AsyncStorage.setItem('LoginMail', JSON.stringify(email));
      //check if  user is already registerd
      let newData = await (await usersRef.get()).docs;
      let isExist = newData.findIndex(
        element => element.data().email === email,
      );

      if (isExist === -1) {
        console.log(Filepath + 'Filepath');
        console.log(Filename + 'Filename');
        // create bucket storage reference to not yet existing image
        const reference = storage().ref(Filename);

        const task = reference.putFile(Filepath);

        task.then(async res => {
          storage()
            .ref(Filename)
            .getDownloadURL()
            .then(async photoUrl => {
              console.log(photoUrl + ' photoUrl');
              auth().currentUser.updateProfile({
                displayName: userName,
                photoURL: photoUrl,
              });
              await usersRef
                .add({
                  uid,
                  email,
                  name: userName,
                  photoUrl,
                })
                .then(() => {
                  console.log('new user is Saved in user collection');
                });
            });
        });
      } else {
        const currentUser = newData.filter(
          user => user.data().uid === auth().currentUser.uid,
        );
        auth().currentUser.updateProfile({
          displayName: currentUser[0].name,
          photoURL: currentUser[0].photoUrl,
        });
        Alert.alert('Welcomeback', "It's going to be Awesome");
      }
    } catch (E) {
      console.error(`Error inside LoginUser Action function is ${E}`);
    }
  };
};

export const FetchAllTheUsersAction = user => {
  return async dispatch => {
    try {
    } catch (e) {
      console.log(`error inside FetchProduct is:${e}`);
    }
  };
};

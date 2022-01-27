import {FETCH_ITEM, AUTH_USER} from './AllTheAction';
import firestore from '@react-native-firebase/firestore';

export const LoginUser = () => {
  return async dispatch => {
    try {
    } catch (E) {
      console.error(`Error inside LoginUser Action function is ${E}`);
    }
  };
};

export const FetchProduct = user => {
  return async dispatch => {
    try {
      firestore()
        .collection(user)
        .get()
        .then(querySnapshot => {
           console.log('Total users: ', querySnapshot.size);
         console.log(querySnapshot);
        });
    } catch (e) {
      console.log(`error inside FetchProduct is:${e}`);
    }
  };
};

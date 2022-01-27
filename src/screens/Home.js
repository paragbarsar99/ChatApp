import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Home({userId}) {
  const [messages, setMessages] = useState([]);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    async function addDoc() {
      const collectionRef = firestore().collection("chat");
      if (collectionRef.id) {
        // const logme = await collectionRef.get();
        console.log(logme);
        console.log(`called from collection ${collectionRef.id}`);
        // // const q = collectionRef.orderBy('createdAt', 'desc');
        // // const unsubscribe = q.onSnapshot(snapshot => {
        // //   // setMessages(
        // //   //   snapshot.docs.map(doc => ({
        // //   //     _id: doc.id,
        // //   //     createdAt: doc.data().createdAt,
        // //   //     text: doc.data().text,
        // //   //     user: doc.data().user,
        // //   //   })),
        // //   // );
        // });
        // return unsubscribe;
      } else {
        console.log('no collection avilable');
      }
    }
    addDoc();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    const {_id, createdAt, text, user} = messages[0];
    console.log(_id);
    // firestore().collection('chat').add({
    //   _id,
    //   createdAt,
    //   text,
    //   user,
    // });
  }, []);

  const GiftedChatComp = () => (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showAvatarForEveryMessage={true}
      user={{
        _id: auth().currentUser.uid,
        avatar: 'https://placeimg.com/140/140/any',
      }}
    />
  );

  return <GiftedChatComp />;
}

const styles = StyleSheet.create({});

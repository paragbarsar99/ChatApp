import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, TextInput, View, LogBox, Button} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Chatme({revicerId, email}) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);

  //make a individual Unique doc id in chat colletion between two user's

  const docId =
    revicerId > auth().currentUser.uid
      ? revicerId + auth().currentUser.uid
      : auth().currentUser.uid + revicerId;

  const chatsRef = firestore()
    .collection(`chat`)
    .doc(docId)
    .collection('messages');

  const RenderSend = props => (
    <Send {...props}>
      <View>
        <MaterialCommunityIcons
          name="send-circle"
          size={22}
          color={'#F57C00'}
          style={{right: 10, justifyContent: 'center', alignItems: 'center'}}
        />
      </View>
    </Send>
  );

  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          console.log(messages);
          return {...message, createdAt: message.createdAt.toDate()};
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      // .filter(item => item.email === email)
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);
  console.log(messages.length);

  const appendMessages = useCallback(
    messages => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [messages],
  );

  async function handleSend(messages) {
    const {text, _id, createdAt, user} = messages[0];
    const writes = chatsRef.add({
      text,
      _id,
      createdAt,
      user,
    });
    await Promise.all(writes);
  }
  console.log(auth().currentUser.displayName);
  return (
    <GiftedChat
      // renderSend={RenderSend}
      alwaysShowSend
      scrollToBottom
      messages={messages}
      renderUsernameOnMessage
      user={{
        name: auth().currentUser.displayName,
        _id: auth().currentUser.uid,
        avatar: auth().currentUser.photoURL,
      }}
      onSend={handleSend}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
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

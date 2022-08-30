import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import Background from '../../components/Background';
import ChatBoxMessage, { ChatBoxProps } from '../../components/ChatBoxMessage';
import Header from '../../components/Header';
import InputTextChat from '../../components/InputTextChat';
import { RouteStackParamList } from '../../routes';
import database from '@react-native-firebase/database';
import AuthContext from '../../context/AuthContext';

// import { Container } from './styles';
type propsScreens = NativeStackNavigationProp<RouteStackParamList>

type paramsRoute = {
  id_professional: string;
}

const Chat: React.FC = () => {
  const navigation = useNavigation<propsScreens>();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatBoxProps[]>([]);
  const route = useRoute<RouteProp<RouteStackParamList, "chat">>();
  const {user} = useContext(AuthContext);
  
  useEffect(() => {
    getMessage();
    
  }, [])

  function goBack(){
    navigation.goBack();
  }

  function getMessage(){
    database().ref(`/chats/${user._id}/${route.params.id_professional}/messages/`).orderByChild('id').on("value", snapshot => {
        var messagesArr = [];
        snapshot && snapshot.forEach((childSnapshot) => {
          let objMessage = childSnapshot.val();
          messagesArr.push(objMessage);
          if(childSnapshot.numChildren() <= 0){      
            setMessages([]);
            return true;
          }
        });

        setMessages(messagesArr) 
      

      //   const dataMessages = [];
      //   dataMessages.push(snapshot.val());
      //   let objectMessage = Object.keys(dataMessages[0]).map(key => dataMessages[0][key]);
      //   console.log({objectMessage});
        
        
      // }else{
      //   setMessages([])
  })
  
  }

  function handleChatMessage(){
    if(message){
      const newReferenceMessage = database().ref(`/chats/${user._id}/${route.params.id_professional}/messages`).push();
      const messageObject = {
        id_user: 4,
        id: Date.now(),
        message,
        sent: new Date(Date.now()),
        user_type: "pacient"
      }
      newReferenceMessage.set(messageObject).then(() => setMessage(""));
    }
  }

  return(
    <Background style={styles.container}>
        <Header buttonLeft={{label: "Voltar", onPress: goBack,}} buttonRight={{label: "Opções", onPress: goBack}} titlePage="Victoria" fontSize={24}/>
        <View style={styles.contentChatMessages}>
        <AutoScrollFlatList
          data={messages}
          contentContainerStyle={{width: "100%",}}
          renderItem={({item}) => (
            <View style={{alignItems: item.user_type === "pacient" ? "flex-end" : "flex-start",}}>
              <ChatBoxMessage data={item} />
            </View>  
          )}
        />

      </View>
      <View style={styles.contentInput}>
        <InputTextChat onPressButton={handleChatMessage} text={message} onChangeText={(text) => setMessage(text)} />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    // backgroundColor: "red"
  },

  contentChatMessages: {
    width: "100%",
    flex: 1,
    padding: 15,

   
  },

  contentInput: {
    width: "100%",
    padding: 15,
  }

})

export default Chat;
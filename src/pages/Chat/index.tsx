import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import Background from '../../components/Background';
import ChatBoxMessage, { ChatBoxProps } from '../../components/ChatBoxMessage';
import Header from '../../components/Header';
import InputTextChat from '../../components/InputTextChat';
import { RouteStackParamList } from '../../routes';
import database from '@react-native-firebase/database';
import moment from "moment";
import AuthContext from '../../context/AuthContext';
import { SendNotificationProps, sendNotificationTo } from '../../services/notificationService';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';

// import { Container } from './styles';
type propsScreens = NativeStackNavigationProp<RouteStackParamList>



const Chat: React.FC = () => {
  const {theme} = useContext(ThemeContext);
  const styles = useMemo(
    () => createStyles(theme),
    [theme]
  );
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
    if(user.role === "user"){
      const onValueChange = database().ref(`/chats/${route.params.id_professional}/${user._id}/messages/`).orderByKey().on("value", snapshot => {
        var messagesArr = [];
        snapshot && snapshot.forEach((childSnapshot) => {
          //console.log(childSnapshot.val());
          let objMessage = childSnapshot.val();
          
          messagesArr.push(objMessage);
          if(childSnapshot.numChildren() <= 0){      
            setMessages([]);
            return true;
          }
        });
        setMessages(messagesArr)
        // console.log(messagesArr.sort((a, b) => (new Date(b.id) as any) - (new Date(a.id) as any)).reverse());
        // setMessages(messagesArr.sort((a, b) => (new Date(b.id) as any) - (new Date(a.id) as any)).reverse());
      })
      return () => database().ref(`/chats/${route.params.id_professional}/${user._id}/messages/`).off('value', onValueChange);
    }

    if(user.role === "professional"){
      const onValueChange = database().ref(`/chats/${user._id}/${route.params.id_pacient}/messages/`).orderByKey().on("value", snapshot => {
        var messagesArr = [];
        snapshot && snapshot.forEach((childSnapshot) => {
          ///console.log(childSnapshot.val());
          let objMessage = childSnapshot.val();

          messagesArr.push(objMessage);
          if(childSnapshot.numChildren() <= 0){      
            setMessages([]);
            return true;
          }
        });
        setMessages(messagesArr)
        // console.log(messagesArr.sort((a, b) => (new Date(b.id) as any) - (new Date(a.id) as any)).reverse());
        // setMessages(messagesArr.sort((a, b) => (new Date(b.id) as any) - (new Date(a.id) as any)).reverse())   
      })
      return () => database().ref(`/chats/${user._id}/${route.params.id_pacient}/messages/`).off('value', onValueChange);

    }

    if(user.role === "admin"){

    }

  }

  async function handleChatMessage(){
    if(message){
      
      if(user.role === "user"){

        const newReferenceMessage = database().ref(`/chats/${route.params.id_professional}/${user._id}/messages`).push();
        const messageObject = {
          id_user: user._id,
          id: Date.now(),
          message,
          sent: moment(new Date().toLocaleTimeString("pt-BR"), "HH:mm:ss").subtract(3, "hours").format("DD/MM/YYYY-HH:mm"),
          user_type: user.role
        }
        newReferenceMessage.set(messageObject).then(() => setMessage(""));
        const dataNotification: SendNotificationProps = {
          token: route.params.pushNotification,
          title: "Mensagem",
          body: message,
          id_pacient: user._id,
          id_professional: null,
          type: "chat",
          name: user.name,
          tokenSecondary: user.tokenPush,
          sounds: "message",
          multiplesToken: false,
        }
        
        await sendNotificationTo({dataNotification});
      }

      if(user.role === "professional"){
        const newReferenceMessage = database().ref(`/chats/${user._id}/${route.params.id_pacient}/messages`).push();
        const messageObject = {
          id_user: user._id,
          id: Date.now(),
          message,
          sent: moment(new Date().toLocaleTimeString("pt-BR"), "HH:mm:ss").subtract(3, "hours").format("DD/MM/YYYY-HH:mm"),
          user_type: user.role
        }
        newReferenceMessage.set(messageObject).then(() => setMessage(""));

        const dataNotification: SendNotificationProps = {
          token: route.params.pushNotification,
          title: "Mensagem",
          body: message,
          id_pacient: null,
          id_professional: user._id,
          type: "chat",
          name: user.name,
          tokenSecondary: user.tokenPush,
          sounds: "message",
          multiplesToken: false
        }

        await sendNotificationTo({dataNotification})
      
      
      }
    }
  }

  return(
    <Background style={styles.container}>
        <Header buttonLeft={{label: "Voltar", onPress: goBack,}} buttonRight={{label: "Opções", onPress: goBack}} titlePage={route.params.name} fontSize={24}/>
        <View style={styles.contentChatMessages}>
        <AutoScrollFlatList
          data={messages}
          contentContainerStyle={{width: "100%",}}
          renderItem={({item}) => (
            <View style={{alignItems: item.user_type === user.role && item.id_user === user._id ? "flex-end" : "flex-start",}}>
              <ChatBoxMessage user_role={user.role} data={item} />
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


const createStyles = (theme :Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flex: 1,
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
  return styles;
}

export default Chat;
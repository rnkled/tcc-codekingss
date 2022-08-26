import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Background from '../../components/Background';
import ChatBoxMessage, { ChatBoxProps } from '../../components/ChatBoxMessage';
import Header from '../../components/Header';
import InputTextChat from '../../components/InputTextChat';
import { RouteStackParamList } from '../../routes';

// import { Container } from './styles';
type propsScreens = NativeStackNavigationProp<RouteStackParamList>

const Chat: React.FC = () => {
  const navigation = useNavigation<propsScreens>();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatBoxProps[]>([
    {message: "Oooooooooiii", user: "pacient"},
    {message: "tudooooo beeeeem?", user: "pacient"},
    {message: "Olá, boa tarde, tudo sim e você?", user: "professional"},
    {message: "Euuu estoooou beeeem", user: "pacient"},
    // {message: "Oooooooooiii", user: "pacient"},
    // {message: "Oooooooooiii", user: "pacient"},
    // {message: "Oooooooooiii", user: "pacient"},

    // {message: "Oooooooooiii", user: "pacient"},
    // {message: "Oooooooooiii", user: "pacient"},
    // {message: "Oooooooooiii", user: "pacient"},
    // {message: "Oooooooooiii", user: "pacient"},
    // {message: "Oooooooooiii", user: "pacient"},



  ])

  function goBack(){
    navigation.goBack();
  }

  function handleChatMessage(){
    if(message){
      let arrayMessage = [...messages];
      let messageObject: ChatBoxProps;
      messageObject = {
        message,
        user: "pacient",
      }
      arrayMessage.push(messageObject);
      setMessages(arrayMessage);
      setMessage("");
    
    }
  }

  return(
    <Background style={styles.container}>
        <Header buttonLeft={{label: "Voltar", onPress: goBack,}} buttonRight={{label: "Opções", onPress: goBack}} titlePage="Victoria" fontSize={24}/>
        <View style={styles.contentChatMessages}>
        <FlatList
          data={messages}
          style={{width: "100%"}}
          contentContainerStyle={{height: "100%", justifyContent: 'flex-end' }}
          renderItem={({item}) => (
            <View style={{alignItems: item.user === "pacient" ? "flex-end" : "flex-start",}}>
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
    alignItems: "flex-end",

   
  },

  contentInput: {
    width: "100%",
    padding: 15,
  }

})

export default Chat;
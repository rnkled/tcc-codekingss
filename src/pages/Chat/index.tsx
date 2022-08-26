import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import { RouteStackParamList } from '../../routes';

// import { Container } from './styles';
type propsScreens = NativeStackNavigationProp<RouteStackParamList>

const Chat: React.FC = () => {
  const navigation = useNavigation<propsScreens>();

  function goBack(){
    navigation.goBack();
  }


  return(
    <Background style={styles.container}>
      <Header buttonLeft={{label: "Voltar", onPress: goBack}} buttonRight={{label: "Opções", onPress: goBack}} titlePage="Victoria" fontSize={24}/>
      <View style={styles.contentChatMessages}>

      </View>
      <View style={styles.contentInput}>

      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },

  contentChatMessages: {
    width: "100%",
    flex: 1,
    padding: 15
  },

  contentInput: {
    width: "100%",
    padding: 15,
    height: 55,
  }

})

export default Chat;
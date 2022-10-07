import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { View } from 'react-native';
import Header from '../../components/Header';
import AgoraUIKit, {PropsInterface} from 'agora-rn-uikit';
import { useNavigation } from '@react-navigation/native';
import Background from '../../components/Background';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../routes';
import AuthContext from '../../context/AuthContext';
import messaging from '@react-native-firebase/messaging';
import api from '../../services/api';
import UserInterface from '../../interfaces/userInterface';
import { SendNotificationProps, sendNotificationTo } from '../../services/notificationService';

type rateScreenProps = NativeStackNavigationProp<RouteStackParamList, 'rateVideoCall'>

const VideoCall: React.FC = () => {

  const navigation = useNavigation<rateScreenProps>();
  const [videoCall, setVideoCall] = useState(false);
  const [idProfessional, setIdProfessional] = useState("");
  const [isEnableAudio, setIsEnableAudio] = useState(false);
  const [isEnableVideo, setIsEnableVideo] = useState(false);
  const {user} = useContext(AuthContext);

 
  const props: PropsInterface = {
    rtcProps: {
      appId: '885ca3cade8f4a3e81c7550a827300a2',
      channel: 'teste',
      enableAudio: user.role === "user" ? isEnableAudio : true,
      enableVideo: user.role === "user" ? isEnableVideo : true,
      mode: 2,
      role: 1

    },
    callbacks: {
      EndCall: () => goToNextScreen(),

    },
    styleProps: {
      localBtnStyles:{
          muteLocalAudio: {backgroundColor: "#8B97FF", borderWidth: 0 },
          muteLocalVideo: {backgroundColor: "#8B97FF", borderWidth: 0 },
          switchCamera: {backgroundColor: "#8B97FF", borderWidth: 0 },
          endCall: {backgroundColor: '#f66', borderWidth: 0, },

        },
        localBtnContainer: {
          backgroundColor: '#0C0150',
          bottom: 0,
          paddingVertical: 10,
          height: 80,
          
          
        },

        iconSize: 30
    }
    // connectionData: {
    //   appId: '<Agora App ID>',
    //   channel: 'test',
    // },
    // rtcCallbacks: {
    //   EndCall: () => setVideoCall(false),
    // },
  };

    useEffect(() => {
      handleSendNotificationCall();
    },[]);

    async function handleSendNotificationCall(){
      
      const { data } = await api.get("/user/list?role=professional");
     
      const tokenPush = [];
      data.length > 0 && data.map((item: UserInterface) => item.tokenPush && tokenPush.push(item.tokenPush))
      
      const dataNotification: SendNotificationProps = {
        title: "Atendimento com urgencia"
      }
      
      await sendNotificationTo()
      
      

    }

    useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if(remoteMessage.data.type && remoteMessage.data.type === "call"){
        Alert.alert(`${remoteMessage.notification.title}`, `${remoteMessage.notification.body}`, [
          {text: "Não", onPress: () => handleCancelCall(), style: "cancel"},
          {text: "Sim", onPress: () => handleCall(remoteMessage.data?.id_professional), style: "default"}
        ]);
      }
    });

    return unsubscribe;
  }, []);


  function handleCancelCall(){
    navigation.navigate("home");
  }

  function handleCall(id_professional: string){
    console.log({id_professional});
    
    setIdProfessional(id_professional);
    setVideoCall(true);
  }



  function goToNextScreen(){
    navigation.navigate("rateVideoCall", {id_professional: idProfessional || "630bfccfd7c33a229c57f04c"})
  }


  

  return videoCall ? (
    <AgoraUIKit 
      styleProps={props.styleProps}   
      rtcProps={props.rtcProps} 
      callbacks={props.callbacks}
      // settings={{
      //   mode: 2,
      //   role: 1, // analisar o acesso do psicologo aqui  
      // }}
    />
  ) : (
    <Background style={styles.container}> 
      <Text style={styles.titlePage}>Encontrando um profissional...</Text>
      <View style={styles.contentPrimary}>
        <View style={styles.circleContent}>
          <Ionicons name="videocam-outline" size={90} color="#8B97FF" />
        </View>
        <View style={styles.messageContent}>
          <Text style={styles.message}>Para sua melhor comodidade, ative o vídeo e audio da chamada somente se sentir-se confortável.</Text>
          {/* <Text style={styles.message}>Para sua melhor comodidade, iremos te notificar a hora que um profissional entrar e perguntar se você realmente deseja ingressar nessa chamada!</Text> */}
        </View>
        <View style={styles.buttonsContent}>
          <TouchableOpacity onPress={() => setIsEnableAudio(!isEnableAudio)} activeOpacity={0.8} style={styles.buttonRadio}>
            {isEnableAudio ? (
              <Feather name="mic" size={30} color="#0C0150" />
            ) : (
              <Feather name="mic-off" size={30} color="#0C0150" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsEnableVideo(!isEnableVideo)} activeOpacity={0.8} style={styles.buttonRadio}>
            {isEnableVideo ? (
              <Feather name="video" size={30} color="#0C0150" />
            ) : (
              <Feather name="video-off" size={30} color="#0C0150" />
            )}
            
          </TouchableOpacity>
        </View>

      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50
  },

  contentPrimary: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 90,
  },

  titlePage: {
    color: "#8B97FF",
    fontSize: 21,
    fontFamily: "Inter_600SemiBold"
  },

  circleContent: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    backgroundColor: "transparent",
    borderWidth: 1.9,
    borderColor: "#8B97FF",
    justifyContent: "center",
    alignItems: "center",
  },

  messageContent: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    color: "#8B97FF",
    fontFamily: "Inter_400Regular"
  },

  buttonsContent: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: 'center'
  },

  buttonRadio: {
    width: 70,
    height: 70,
    borderRadius: 70/2,
    backgroundColor: "#8B97FF",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5
  

  }
})

export default VideoCall;
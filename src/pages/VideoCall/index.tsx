import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import Header from '../../components/Header';
import AgoraUIKit from 'agora-rn-uikit';
import { useNavigation } from '@react-navigation/native';
import Background from '../../components/Background';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../routes';

type rateScreenProps = NativeStackNavigationProp<RouteStackParamList, 'rateVideoCall'>

const VideoCall: React.FC = () => {

  const navigation = useNavigation<rateScreenProps>();
  const [videoCall, setVideoCall] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    return () => {
      setVideoCall(false)
    }
  }, [])


  const connectionData = {
    appId: '885ca3cade8f4a3e81c7550a827300a2',
    channel: 'test',
    rtmUid: "1234",
    rtcUid: 1234,
    username: "Joao",
    disableAudio: true

  };




  
  const rtcCallbacks = {
    EndCall: () => {
      // setVideoCall(false),
      // PASSAR O ID DO PROFISSIONAL NA ROTA
      navigation.navigate("rateVideoCall")
    },
    // JoinChannelSuccess: (uid) => {
      
    //   uid.UserMuteAudio(uid);
    //   uid.UserMuteVideo();
    // },
    
    
    
  };
  

  return videoCall ? (
    <AgoraUIKit styleProps={{
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
      }}   
      settings={{
        mode: 2,
        role: 1, // analisar o acesso do psicologo aqui
        activeSpeaker: true,
        initialDualStreamMode: 2,
        dual: true,
        displayUsername: true,
      
        

      }}
      connectionData={connectionData} 
      rtcCallbacks={rtcCallbacks}

  
    
    />
  ) : (
    <Background style={styles.container}> 
      <Text style={styles.titlePage}>Encontrando um profissional...</Text>
      <View style={styles.contentPrimary}>
        <View style={styles.circleContent}>
          <Ionicons name="videocam-outline" size={90} color="#8B97FF" />
        </View>
        <View style={styles.messageContent}>
          <Text style={styles.message}>Para sua melhor comodidade, ative o vídeo da chamada somente se sentir-se confortável.</Text>
        </View>
        <View style={styles.buttonsContent}>
          <TouchableOpacity onPress={() => setVideoCall(!videoCall)} activeOpacity={0.8} style={styles.buttonRadio}>
            <Feather name="mic-off" size={30} color="#0C0150" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonRadio}>
            <Feather name="video-off" size={30} color="#0C0150" />
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
    height: "auto",
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
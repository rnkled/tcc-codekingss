import React, { useContext, useEffect, useState, useRef } from 'react';
import { TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { View } from 'react-native';
import Header from '../../components/Header';
import AgoraUIKit, {PropsInterface} from 'agora-rn-uikit';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Background from '../../components/Background';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../routes';
import AuthContext from '../../context/AuthContext';
import messaging from '@react-native-firebase/messaging';
import api from '../../services/api';
import { Notifier, Easing } from 'react-native-notifier';
import UserInterface from '../../interfaces/userInterface';
import LottieView from 'lottie-react-native';
import CallAnimation from "../../assets/callanimation.json"
import { SendNotificationProps, sendNotificationTo } from '../../services/notificationService';
import ThemeContext from "../../context/ThemeContext";
import { Theme } from "../../interfaces/themeInterface";

type rateScreenProps = NativeStackNavigationProp<RouteStackParamList, 'rateVideoCall'>

const VideoCall: React.FC = () => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme]
  );

  const navigation = useNavigation<rateScreenProps>();
  const [idProfessional, setIdProfessional] = useState("");
  const [isEnableAudio, setIsEnableAudio] = useState(false);
  const [isEnableVideo, setIsEnableVideo] = useState(false);
  const {user} = useContext(AuthContext);
  const route = useRoute<RouteProp<RouteStackParamList, "videoCall">>();
  const channelIdNotification = route.params?.channel_id;
  const channelId = user.role === "user" ? String(Date.now()) : channelIdNotification
  const [videoCall, setVideoCall] = useState(user.role === "professional" && !!channelId || true);

  const animation = useRef(null);

  if(user.role === "professional" && !channelId){
    console.log({channelId});
    
    Alert.alert("Atenção", "Não foi possível se conectar com a chamada de video!")
    navigation.navigate("home");
    return 

  }
 
  const props: PropsInterface = {
    rtcProps: {
      appId: '885ca3cade8f4a3e81c7550a827300a2',
      channel: channelId,
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
          muteLocalAudio: {backgroundColor: theme.primaryVariant, borderWidth: 0 },
          muteLocalVideo: {backgroundColor: theme.primaryVariant, borderWidth: 0 },
          switchCamera: {backgroundColor: theme.primaryVariant, borderWidth: 0 },
          endCall: {backgroundColor: theme.backgroundCallEnd, borderWidth: 0, },

        },
        localBtnContainer: {
          backgroundColor: 'transparent',
          bottom: 0,
          paddingVertical: 10,
          height: 80,
          
          
        },

        iconSize: 30
    }
  };

    useEffect(() => {
      handleSendNotificationCall();
    },[]);

    async function handleSendNotificationCall(){
      if(user.role === "user"){

        
        const { data } = await api.get("/user/list?role=professional");
        
        const tokenPush = [];
        data.length > 0 && data.map((item: UserInterface) => item.tokenPush && tokenPush.push(item.tokenPush))
        
        const dataNotification: SendNotificationProps = {
          token: tokenPush,
          multiplesToken: true,
          title: "Emergência",
          body: "Olá Dr. (a), temos um paciente esperando pelo seu atendimento. Toque para atendê-lo",
          id_professional: null,
          id_pacient: user._id,
          name: user.name,
          sounds: "call",
          tokenSecondary: user.tokenPush,
          type: "call",
          channel_id: String(Date.now())
          
        }
        
        await sendNotificationTo({dataNotification});
      }

      setTimeout(() => {
        if(!videoCall){
          Alert.alert("Atenção", "Não conseguimos encontrar um profissional para o seu atendimento, tente novamente mais tarde!")
          navigation.goBack()
          return 
        }

      }, 180000 )
      
      

    }

    useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if(remoteMessage.data.type && remoteMessage.data.type === "requestCall"){
        Alert.alert(`${remoteMessage.notification.title}`, `${remoteMessage.notification.body}`, [
          {text: "Não", onPress: () => handleCancelCall(remoteMessage.data?.tokenPush), style: "cancel"},
          {text: "Sim", onPress: () => handleCall(remoteMessage.data?.id_professional), style: "default"}
        ]);
      }

      if(user.role === "professional" && remoteMessage.data.type && remoteMessage.data.type === "responseCall"){
        console.log("aqqtbm");
        
        Notifier.showNotification({
          title: `${remoteMessage.notification.title}`,
          description: `${remoteMessage.notification.body}`,
          duration: 10000,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          translucentStatusBar:true,
          onHidden: () => console.log('Hidden'),
          onPress: () => {
            console.log("press");
          },
          hideOnPress: false,
          componentProps: {
            titleStyle: {color: theme.secondary, fontSize: 18, fontFamily: "Inter_500Medium"},
            descriptionStyle: {fontFamily: "Inter_400Regular"},
            containerStyle: {backgroundColor: theme.backgroundVariant}
          }
        });
        navigation.canGoBack() ? navigation.goBack() : navigation.navigate("home")
      }
    });

    return unsubscribe;
  }, []);


  async function handleCancelCall(token: string){
    
    if(!!token){
      const dataNotification: SendNotificationProps = {
        token,
        title: "Chamada encerrada",
        body: "O paciente desistiu de entrar na chamada!",
        id_pacient: null,
        id_professional: null,
        name: "",
        sounds: "message",
        tokenSecondary: null,
        type: "responseCall",
        multiplesToken: false
        
      }
      await sendNotificationTo({dataNotification})
    }
    navigation.navigate("home");
  }
  
  function handleCall(id_professional: string){
    console.log({id_professional});
    
    setIdProfessional(id_professional);
    setVideoCall(true);
  }



  function goToNextScreen(){
    user.role === "user" ?
      navigation.navigate("rateVideoCall", {id_professional: idProfessional || "630bfccfd7c33a229c57f04c"}) :
      navigation.canGoBack() ? navigation.goBack() : navigation.navigate("home")
  
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
        <LottieView
          style={styles.circleContent}
          speed={1.5} 
          source={CallAnimation}
          autoPlay={true}
          loop={true}
          
        />
          {/* <Ionicons name="videocam-outline" size={90} color=theme.primaryVariant />
        </View> */}
        <View style={styles.messageContent}>
          <Text style={styles.message}>Para sua melhor comodidade, ative o vídeo e audio da chamada somente se sentir-se confortável.</Text>
          {/* <Text style={styles.message}>Para sua melhor comodidade, iremos te notificar a hora que um profissional entrar e perguntar se você realmente deseja ingressar nessa chamada!</Text> */}
        </View>
        <View style={styles.buttonsContent}>
          <TouchableOpacity onPress={() => setIsEnableAudio(!isEnableAudio)} activeOpacity={0.8} style={styles.buttonRadio}>
            {isEnableAudio ? (
              <Feather name="mic" size={30} color={theme.callButtons} />
            ) : (
              <Feather name="mic-off" size={30} color={theme.callButtons} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsEnableVideo(!isEnableVideo)} activeOpacity={0.8} style={styles.buttonRadio}>
            {isEnableVideo ? (
              <Feather name="video" size={30} color={theme.callButtons} />
            ) : (
              <Feather name="video-off" size={30} color={theme.callButtons} />
            )}
            
          </TouchableOpacity>
        </View>

      </View>
    </Background>
  );
}

const createStyles = (theme :Theme) => {
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
      paddingTop: 35,

    },

    titlePage: {
      color: theme.primaryVariant,
      fontSize: 21,
      fontFamily: "Inter_600SemiBold"
    },

    circleContent: {
      width: 300,
      height: 300,
    
      // backgroundColor: "red",
  
      borderColor: theme.primaryVariant,
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
      color: theme.primaryVariant,
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
      backgroundColor: theme.primaryVariant,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5
    

    }
  })
  
    return styles;
}


export default VideoCall;
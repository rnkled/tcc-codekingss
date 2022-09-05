import React, { useEffect, useState, useContext } from 'react';
import { RouteProp, useNavigation, useRoute, } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Background from '../../components/Background';
import Button from '../../components/Button';
import AuthContext from '../../context/AuthContext';
import { RouteStackParamList } from '../../routes';
import { Notifier, Easing } from 'react-native-notifier';
import messaging from '@react-native-firebase/messaging';

// import { Container } from './styles';

type professionalScreenProps = NativeStackNavigationProp<RouteStackParamList, 'professionalProfile'>

const RateCallVideo: React.FC = () => {

  
  const navigation = useNavigation<professionalScreenProps>();
  const route = useRoute<RouteProp<RouteStackParamList, "rateVideoCall">>()
  const {user} =  useContext(AuthContext);
  
  const [countRate, setCountRate] = useState(0);
  const [isDisableRate, setIsDisableRate] = useState(false);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if(remoteMessage.data.type && remoteMessage.data.type === "chat"){
        Notifier.showNotification({
          title: `${remoteMessage.notification.title}`,
          description: `${remoteMessage.notification.body}`,
          duration: 10000,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          onHidden: () => console.log('Hidden'),
          onPress: () => {
            if(user.role === "user"){
              navigation.navigate("chat", {
                id_professional: remoteMessage.data.id_professional,
                pushNotification: remoteMessage.data.tokenPush,
                id_pacient: undefined,
                name: remoteMessage.data.name
              })
            }
            if(user.role === "admin"){
              
            }
          },
          hideOnPress: false,
          componentProps: {
            titleStyle: {color: "#0C0150", fontSize: 18, fontFamily: "Inter_500Medium"},
            descriptionStyle: {fontFamily: "Inter_400Regular"},
            containerStyle: {backgroundColor: "#EEE"}
          }
        });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log({countRate});
    
    
  }, [countRate])

  function handleRateFinish(value){
    setCountRate(value);
    setIsDisableRate(true);

    
  }

  
  function goToHome(){
    navigation.navigate('home');
  }

  function goToProfessionalProfile(){
    navigation.navigate("professionalProfile", {id_professional: route.params.id_professional})

  }


  return(
    <View style={styles.container}>
      <View style={styles.contentPrimary}>
        <View style={styles.rateContainer}>
          <AirbnbRating
            showRating={false}
            count={5}
            starContainerStyle={styles.rateStyled}
            isDisabled={isDisableRate}
            defaultRating={countRate}
            selectedColor={"#FFB84E"}
            size={24}
            onFinishRating={value => handleRateFinish(value)}
          />
        </View>
        <View style={styles.messageContent}>
          <Text style={styles.titleMessage}>Avalie este atendimento</Text>

          <Text style={styles.message}>
            Sua avaliação é importante para o 
            nosso serviço pois ela nos permite mantermos a 
            qualidade sempre em primeiro lugar!
          </Text>

        </View>
        <View style={styles.contentButtons}>
          <Button onPress={() => goToProfessionalProfile()} label='Eu amei o atendimento!'/>
          <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
            <Text style={styles.labelButton}>
              Teve problemas técnicos? Nos avise!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => goToHome()}>
            <Text style={styles.labelButton}>
              Avaliar depois
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8B97FF"
  },
  
  contentPrimary: {
    width: "95%",
    height: "auto",
    backgroundColor: "#0C0150",
    paddingHorizontal: 10,
    paddingTop:  10,
    paddingBottom: 20,
    borderRadius: 8
  },
  rateContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
  },

  messageContent: {
    width: "100%",
    height: "auto",
    
  },
  
  titleMessage: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Inter_500Medium",
    color: "#FFF"
  },
  
  message: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Inter_400Regular",
    color: "#FFF",
    paddingVertical: 25,
  },

  contentButtons: {
    height: "auto",
    width: "100%",
    alignItems: "center",
  },

  labelButton: {
    fontSize: 16,
    color: "#8B97FF",
    fontFamily: "Inter_600SemiBold",
    marginTop: 20,
  },

  rateStyled: {
    width: "50%", 
    justifyContent: "space-between"
  }

})

export default RateCallVideo;
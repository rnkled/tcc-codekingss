import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { AirbnbRating } from 'react-native-ratings';
import NavComponent from '../../components/NavComponent';
import userInterface from '../../interfaces/userInterface';
import Button from '../../components/Button';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PropsCardComment } from '../../components/CardComment';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../routes';
import Background from '../../components/Background';
import Loading from '../../components/Loading';
import api from '../../services/api';
import { Ionicons } from '@expo/vector-icons';
import { Notifier, Easing } from 'react-native-notifier';
import messaging from '@react-native-firebase/messaging';
import AuthContext from '../../context/AuthContext';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';

type propsScreens = NativeStackNavigationProp<RouteStackParamList>

const ProfessionalProfile: React.FC = () => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme]
  );

  const navigation = useNavigation<propsScreens>();
  const route = useRoute<RouteProp<RouteStackParamList, "professionalProfile">>()
  const id = route.params.id_professional
  const [loading, setLoading] = useState(true)
  const [loadingImage, setLoadingImage] = useState(true)
  const {user} =  useContext(AuthContext);
  const [dataProfessional, setDataProfessional] = useState<userInterface>();

  const [dataComments, setDataComments] = useState<PropsCardComment[]>([
    {comment: "Amei, vou fazer mais novas consultas com ela!", pacientName: "Maria", published_at: "10min atrás"}, 
    {comment: "Gostei demais!!", pacientName: "Jubiscleide", published_at: "Há 10d"}, 
    {comment: "Hoje sou outra pessoa gracas a ela!", pacientName: "Josefina", published_at: "Há 1h"}, 
  
  ])

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
            titleStyle: {color: theme.secondary, fontSize: 18, fontFamily: "Inter_500Medium"},
            descriptionStyle: {fontFamily: "Inter_400Regular"},
            containerStyle: {backgroundColor: theme.backgroundVariant}
          }
        });
      }
    });

    return unsubscribe;
  }, []);


  useEffect(() => {
    async function getDataProfessional() {
      api.get(`/user/list/${id}`).then(response => {        
        setDataProfessional(response.data[0]);
        setLoading(false)
      }).catch(err => {
        console.log(err)
      })
    }
    getDataProfessional()
  } , [id])

  function goToHome(){
    navigation.navigate("home")
  }

  function goToChat(){
    navigation.navigate("chat", {
      id_professional: dataProfessional._id,
      id_pacient: null, 
      pushNotification: dataProfessional.tokenPush,
      name: dataProfessional.name 
    })
  }

  return(
    loading ? 
      <Loading/> 
      :
      (<View style={styles.container}>
        <Header buttonLeft={{label: "Voltar", onPress: goToHome, isIcon: false}} titlePage='Profissional' color={theme.secondary} fontSize={30} />
        <View style={styles.contentPrimary}/>
        <Background style={styles.contentSecondary}>
        { dataProfessional.profilePhoto ? 
          (<>
            <View style={styles.contentPhoto}>
              <Image 
                  style={[styles.imageStyled, {display: (loadingImage ? 'none' : 'flex')}]} 
                  source={{uri: dataProfessional.profilePhoto } as ImageSourcePropType} 
                  onLoad={() => setLoadingImage(false)}
              /> 
              <ActivityIndicator
                  color={theme.primaryVariant}
                  size={100}
                  style={{ display: (loadingImage ? 'flex' : 'none'), backgroundColor: theme.secondary, borderRadius: 100 }}
              /> 
            </View>  
            </>) : ( 
            <View style={[styles.contentPhoto, {backgroundColor: theme.primaryVariant, borderRadius: 100}]}>
                <Ionicons name="person-circle" size={170} color={theme.secondary} style={{marginLeft: 10}} />
          </View> )} 
          <View style={styles.rateContent}>
            <AirbnbRating
              showRating={false}
              count={5}
              starContainerStyle={styles.rateStyled}
              defaultRating={dataProfessional.rate}
              isDisabled={true}
              selectedColor={theme.stars}
              size={26}
            />
          </View>
          <View style={styles.contentMotivational}>
            <Text style={styles.labelProfessionalName}>{dataProfessional.name}</Text>
            <Text style={styles.motivationalDescription}>
              {dataProfessional.skills}
            </Text>
          </View>
          <View style={styles.contentDescription}>
            <NavComponent dataProfessional={dataProfessional} dataComments={dataComments}/>
          </View>
          <Button onPress={goToChat} label='Entrar em contato'/>
        </Background>
      </View>
    )
  );
}

const createStyles = (theme :Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.primaryVariant,
    },
    
    contentPrimary: {
      width: "100%",
      height: 90,
      backgroundColor: theme.primaryVariant,
      paddingTop: 10,
      alignItems: "center",
      justifyContent: "flex-end",
    },

    contentSecondary: {
      alignContent: "center",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      flex: 1,
      padding: 15,
      paddingTop: 0,
      zIndex: 10, 
    },

    contentPhoto: {
      width: 180,
      height: 180,
      borderRadius: 180/2,
      top: -80,
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: -70,
    },
    imageStyled: {
      width: "100%",
      height: "100%",
      borderRadius: 180/2,
      borderColor: theme.secondary,
      borderWidth: 4,
    },
    rateContent: {
      width: "100%",
      height: "auto",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 5,
    },

    rateStyled: {
      width: "55%", 
      justifyContent: "space-between"
    },

    contentMotivational: {
      width: "100%",
      height: "auto",
      justifyContent: "center",
      paddingHorizontal: 5,
    },

    labelProfessionalName: {
      fontSize: 24,
      fontFamily: "Inter_500Medium",
      color: theme.textVariant,
      textAlign: "center",
      marginBottom: 5,
    },
    
    motivationalDescription: {
      marginVertical: 5,
      fontSize: 16,
      color: theme.textVariant,
      textAlign: "center",
    },

    contentDescription: {
      width: "100%",
      paddingTop: 15,
      flex: 1,
    },

    labelButton: {
      fontSize: 16,
      color: theme.primaryVariant,
      fontFamily: "Inter_600SemiBold",
      marginTop: 20,
      textAlign: "center"
    },
  })
  return styles
}

export default ProfessionalProfile;
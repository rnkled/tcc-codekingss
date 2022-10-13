import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Header from '../../components/Header';
import { EvilIcons, Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import Background from '../../components/Background';
import AuthContext from "../../context/AuthContext";
import CircleAnimation from "../../assets/effectButton.json";
import { RouteStackParamList } from '../../routes';
import { Notifier, Easing } from 'react-native-notifier';
import messaging from '@react-native-firebase/messaging';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedLottieView from 'lottie-react-native';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';

type propsScreens = NativeStackNavigationProp<RouteStackParamList>



const Home: React.FC = () => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme]
  );
  
  const navigation = useNavigation<propsScreens>();

  const {signOut, user} =  useContext(AuthContext);

   useEffect(() => {
    console.log(user);
    
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if(remoteMessage.data.type && remoteMessage.data.type === "chat"){
        Notifier.showNotification({
          title: `${remoteMessage.notification.title}`,
          description: `${remoteMessage.notification.body}`,
          duration: 10000,
          translucentStatusBar: true,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          onHidden: () => console.log('Hidden'),
          onPress: () => {
            if(user.role === "user"){
              navigation.navigate("chat", {
                id_professional: remoteMessage.data.id_professional,
                pushNotification: user.tokenPush,
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


  function handleNewVideoCall(){

    navigation.navigate("videoCall", {channel_id: null});

  }

  function handleLogOut() {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair de sua conta?",
      [
        {
          text: "Cancelar",
          onPress: () => {}
        },
        {
          text: "Sim",
          onPress: () => {
            signOut();
          }
        }
      ],
    );
  }

  function goToSearch() {
    navigation.navigate("search");
  }

  function goToSettings() {
    navigation.navigate("settings");
  }

  function goToCalendar() {
    console.log('teste');
    
    navigation.navigate("calendar");
  }


  return(
    <Background>
      <Header 
        titlePage={"Bem-Vindo " + user.name.split(" ")[0]}
        fontSize={18}
        buttonLeft={{
          isIcon: true,
          icon: () => <Ionicons name="settings-outline"  size={30} color={theme.primaryVariant}/>,
          onPress: goToSettings,
        }} 
        buttonRight={{
          isIcon: true,
          icon: () =><MaterialIcons name="logout" size={30} color={theme.primaryVariant} />,
          onPress: handleLogOut,
        }}
      />
      <View style={styles.contentPrimary}>
       
        <TouchableOpacity onPress={handleNewVideoCall} activeOpacity={0.8} style={styles.buttonCircle}>
          <LinearGradient
            colors={[theme.buttonCircleFirst, theme.buttonCircleSecond]}
            style={styles.contentBorderButton}
          >
                <Text style={styles.labelButtonCircle}>Atendimento Rápido</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
      <View style={styles.contentSecondary}>
        <Button label='Minhas consultas' onPress={goToCalendar} />
        <Button label='Buscar profissionais' onPress={goToSearch}/>
      </View>
      <View style={styles.footer}>
        <Footer/>
      </View>
    </Background>
  );
}

const createStyles = (theme :Theme) => {
  const styles = StyleSheet.create({
    contentPrimary: {
      width: "100%",
      height: "40%",
      justifyContent: "space-between",
      paddingTop: 25,
      alignItems: "center"
    },
  
    buttonCircle: {
      width: 190,
      height: 190,
      backgroundColor: theme.buttonCircleSecond,
      borderRadius: 190 / 2,
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10%",
      zIndex: 10
    },
  
    contentBorderButton: {
      width: 175,
      height: 175,
      borderRadius: 175 / 2,
      backgroundColor: "transparent",
      borderWidth: 1.9,
      borderColor: theme.buttonCircleBorder,
      justifyContent: "center",
      alignItems: "center",
    },
  
    contentSecondary: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      height: "30%",
      
    },
  
    labelButtonCircle: {
      fontSize: 20,
      textAlign: "center",
      color: theme.titleButton,
      fontFamily: "Inter_600SemiBold"
    },
  
  
    titleHome: {
      color: theme.textVariant,
      fontSize: 24,
      fontFamily: "Inter_600SemiBold"
  
    },
  
    footer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
  
    }
  })
  return styles;
};

export default Home;
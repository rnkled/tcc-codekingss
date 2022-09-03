import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Header from '../../components/Header';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Background from '../../components/Background';
import AuthContext from "../../context/AuthContext";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteStackParamList } from '../../routes';
import { requestUserNotificationPermission } from '../../services/notificationService';


type propsScreens = DrawerNavigationProp<RouteStackParamList>

const HomeProfessional: React.FC = () => {
  
  const navigation = useNavigation<propsScreens>();

  const {signOut, user} =  useContext(AuthContext);

  function handleNav() {
    navigation.openDrawer();
  }

  function handleNewVideoCall(){
    navigation.navigate("videoCall");
    
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
    navigation.navigate("searchProfessional");
  }


  return(
    <Background>
      <Header 
        titlePage={"Bem-Vindo " + user.name}
        fontSize={18}
        buttonLeft={{
          isIcon: true,
          icon: () => <EvilIcons name="navicon" size={35} color="#8B97FF"/>,
          onPress: handleNav,
        }} 
        buttonRight={{
          isIcon: true,
          icon: () =><MaterialIcons name="logout" size={30} color="#8B97FF" />,
          onPress: handleLogOut,
        }}
      />
      
      <View style={styles.contentPrimary}>
        <Button label='Minha agenda' onPress={() => {}} />
        <Button label='Meus pacientes' onPress={goToSearch}/>
      </View>
      <View style={styles.footer}>
        <Footer/>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  contentPrimary: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    paddingTop: 25,
  
    alignItems: "center"
  
  },

  buttonCircle: {
    width: 190,
    height: 190,
    backgroundColor: "#8B97FF",
    borderRadius: 190 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },

  contentBorderButton: {
    width: 175,
    height: 175,
    borderRadius: 175 / 2,
    backgroundColor: "transparent",
    borderWidth: 1.9,
    borderColor: "#0C0150",
    justifyContent: "center",
    alignItems: "center",
  },


  labelButtonCircle: {
    fontSize: 20,
    textAlign: "center",
    color: '#0C0150',
    fontFamily: "Inter_600SemiBold"
  },


  titleHome: {
    color: "#FFF",
    fontSize: 24,
    fontFamily: "Inter_600SemiBold"

  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",

  }


})

export default HomeProfessional;
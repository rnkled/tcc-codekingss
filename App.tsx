import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, LogBox, Alert } from 'react-native';
import { NavigationContainer, RouteProp, useNavigation } from '@react-navigation/native';
import Routes, { RouteStackParamList } from "./src/routes/index";
import { useFonts, Inter_600SemiBold, Inter_300Light, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import Loading from './src/components/Loading';
import * as Updates from "expo-updates";
import { AuthProvider } from './src/context/AuthContext';
import messaging from '@react-native-firebase/messaging';
import { NotifierWrapper } from 'react-native-notifier';
import moment from "moment";
import "moment/locale/pt-br"; // without this line it didn't work
import { SendNotificationProps, sendNotificationTo } from './src/services/notificationService';
import UserInterface from './src/interfaces/userInterface';
import AsyncStorage from '@react-native-community/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
moment.locale('pt-br');


export default function App() {
  LogBox.ignoreLogs(['new NativeEventEmitter']); 


  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     if(remoteMessage.data.type && remoteMessage.data.type !== "call" && remoteMessage.data.type !== "chat"){
  //       Alert.alert(`${remoteMessage.notification.title}`, `${remoteMessage.notification.body}`);
  //     }
  //   });

  //   return unsubscribe;
  // }, []);




    useEffect(() => {
    
    async function updateApp() {
      try{

        const { isAvailable } = await Updates.checkForUpdateAsync();
        if (isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync(); // depende da sua estratégia
        }
      }catch(error){
        console.log(error);
      }
    }
    
    updateApp();
    // askPermission;
  }, []);
  
  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium
    
  });
  
  
  if (!fontsLoaded) {
    return <Loading/>;
  }

  
  return (
    <View style={{ flex: 1, width: '100%'}}>
        <NavigationContainer>
          <AuthProvider>
            <NotifierWrapper>
              <Routes />
            </NotifierWrapper>
          </AuthProvider>
        </NavigationContainer>
      </View>
  );
}


import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, LogBox, Alert } from "react-native";
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import Routes, { RouteStackParamList } from "./src/routes/index";
import {
  useFonts,
  Inter_600SemiBold,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import Loading from "./src/components/Loading";
import { AuthProvider } from "./src/context/AuthContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import messaging from "@react-native-firebase/messaging";
import { NotifierWrapper } from "react-native-notifier";
import moment from "moment";
import "moment/locale/pt-br"; // without this line it didn't work
import {
  SendNotificationProps,
  sendNotificationTo,
} from "./src/services/notificationService";
import UserInterface from "./src/interfaces/userInterface";
import AsyncStorage from "@react-native-community/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
moment.locale("pt-br");

export default function App() {
  LogBox.ignoreLogs(["new NativeEventEmitter"]);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     if(remoteMessage.data.type && remoteMessage.data.type !== "call" && remoteMessage.data.type !== "chat"){
  //       Alert.alert(`${remoteMessage.notification.title}`, `${remoteMessage.notification.body}`);
  //     }
  //   });

  //   return unsubscribe;
  // }, []);

  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <NavigationContainer>
        <AuthProvider>
          <ThemeProvider>
            <NotifierWrapper>
              <Routes />
            </NotifierWrapper>
          </ThemeProvider>
        </AuthProvider>
      </NavigationContainer>
    </View>
  );
}

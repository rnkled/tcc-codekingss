import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from "./src/routes/index";
import { useFonts, Inter_600SemiBold, Inter_300Light, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import Loading from './src/components/Loading';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
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
            <Routes/>
          </AuthProvider>
        </NavigationContainer>
      </View>
  );
}


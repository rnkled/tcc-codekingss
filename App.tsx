import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Routes from "./src/routes/index";

export default function App() {
  return (
    <View style={{ flex: 1, width: '100%'}}>
        <Routes/>
    </View>
  );
}


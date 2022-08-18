import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";


function Home() {
  
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Espere!", "Tem certeza que deseja Sair?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Sim", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ ...styles.header, backgroundColor: color }}>
        <View style={{ width: 60, height: 60, top: "3%", left: -5 }}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.iconMenu}
          >
            <Ionicons
              name="menu-outline"
              size={26}
              color={`${fontColor ? fontColor : "white"}`}
              style={{ left: "-20%" }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "50%",
            height: "42%",
            top: "2%",
            alignItems: "center",
            left: "-14%",
          }}
        >
          <Text style={styles.logo}>Bem vindo ao Fulano</Text>
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            top: "3%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  webview: {
    height: "100%",
    width: "100%",
  },
  header: {
    height: 115,
    width: "100%",
    top: 0,

    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    shadowColor: "#000",
  },
  logo: {
    resizeMode: "contain",
    height: "100%",

    top: "11%",
  },
  buttonsView: {
    flex: 3,
    width: "100%",
    position: "absolute",
    top: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "90%",
    backgroundColor: "#056EBA",
    borderRadius: 3,
    height: 60,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 9,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  iconNotification: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  iconMenu: {
    width: "160%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
export default Home;

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// import { Container } from './styles';

const Home: React.FC = () => {

  function handleNav() {

  }


  return(
    <View style={styles.container}>
      <Header 
        buttonLeft={{
          isIcon: true,
          icon: () => <EvilIcons name="navicon" size={24} color="#8B97FF"/>,
          onPress: () => handleNav,
        }} 
        buttonRight={{
          isIcon: true,
          icon: () =><MaterialIcons name="logout" size={24} color="#8B97FF" />,
          onPress: () => handleNav,
        }}
      />
      <View style={styles.contentPrimary}>
        <Text style={styles.titleHome}>Bem-Vindo, Fulano!</Text>
        <TouchableOpacity style={styles.buttonCircle}>
          <View style={styles.contentBorderButton}>
            <Text style={styles.labelButton}>Atendimento Rápido</Text>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.contentSecondary}>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#0C0150",
    
  },

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
    backgroundColor: "#8B97FF",
    borderRadius: 190 / 2,
    justifyContent: "center",
    alignItems: "center"
  },

  contentBorderButton: {
    width: 175,
    height: 175,
    borderRadius: 175 / 2,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#0C0150",
    justifyContent: "center",
    alignItems: "center"
  },

  contentSecondary: {
    flex: 1,
  },

  labelButton: {
    fontSize: 24,
    textAlign: "center",
    color: '#0C0150',
    fontFamily: "Inter_500Medium"
  },

  titleHome: {
    color: "#FFF",
    fontSize: 24
  }

})

export default Home;
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import { Container } from './styles';

type Props = {
  buttonLeftPressed: boolean,
  buttonRightPressed: boolean,
  onPressButtonLeft: () => void, 
  onPressButtonRight: () => void,

}


const NavComponent = ({buttonLeftPressed, buttonRightPressed, onPressButtonLeft, onPressButtonRight} : Props) => {
  return(
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressButtonLeft} style={buttonLeftPressed ? styles.buttonNavPressed : styles.buttonNav}>
        <Text style={[styles.labelNavButton, {color: buttonLeftPressed ? "#8B97FF" : "#828282"}]}>Avaliações</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressButtonRight} style={buttonRightPressed ? styles.buttonNavPressed : styles.buttonNav}>
        <Text style={[styles.labelNavButton, {color: buttonRightPressed ? "#8B97FF" : "#828282"}]}>Informações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    borderRadius: 100,
  },

  buttonNav: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },

  buttonNavPressed: {
    backgroundColor: "#0C0150",
    borderRadius: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderColor: "#EEE",
    borderWidth: 0.9
  },

  labelNavButton: {
    fontSize: 18,
    fontFamily: "Inter_400Regular",
  }
})

export default NavComponent;
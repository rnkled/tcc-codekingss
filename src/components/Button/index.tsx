import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';


type Props = {
  label: string;
  onPress: () => void;
}

const Button = ({label, onPress, ...rest}: Props) => {
  return(
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0C0150",
  },
  button: {
    width: 350,
    height: 50,
    marginTop: "5%",
    backgroundColor: "#8B97FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#0C0150",
  },
})

export default Button;
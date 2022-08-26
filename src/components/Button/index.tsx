import React from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';


type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

const Button = ({label, onPress, loading, ...rest}: Props) => {
  return(
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
      {loading && (<ActivityIndicator style={styles.loading} size={25} color="#0C0150"/>)}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "Inter_600SemiBold",
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
    flexDirection: "row",
  },
  loading: {
    position: "absolute",
    right: '5%',
  }
})

export default Button;
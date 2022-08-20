import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import { Container } from './styles';

const Copyright: React.FC = () => {
  return(
    <View style={styles.container}>
      <Text style={styles.label}>Powered By CodeKingss</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },

  label: {
    color: "#8B97FF",
    fontSize: 16,
    fontFamily: "Inter_400Regular"
  }
})

export default Copyright;
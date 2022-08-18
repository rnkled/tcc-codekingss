import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// import { Container } from './styles';

const Loading: React.FC = () => {
  return(
    <View style={styles.container}>
      <ActivityIndicator size={25} color="#8B97FF"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#0C0150",
    justifyContent: "center"
  }
})

export default Loading;
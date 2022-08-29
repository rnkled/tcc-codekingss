import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Background from '../Background';

// import { Container } from './styles';

const Loading: React.FC = () => {
  return(
    <Background style={styles.container}>
      <ActivityIndicator size={25} color="#8B97FF"/>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center"
  }
})

export default Loading;
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Background from '../Background';

// import { Container } from './styles';

type props = {
  transparent?: boolean,
  color?: string,
  containerStyle?: object,
}

const Loading = ({transparent, color, containerStyle} :props) => {
  return(
    !transparent ? 
    (<Background style={[styles.container, containerStyle]}>
      <ActivityIndicator size={25} color={color ? color : "#8B97FF"}/>
    </Background>)
    :
    (<View style={[styles.container, containerStyle]}>
      <ActivityIndicator size={25} color={color ? color : "#8B97FF"}/>
    </View>)
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
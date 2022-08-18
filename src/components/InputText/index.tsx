import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FilledTextField, } from "rn-material-ui-textfield";


// import { Container } from './styles';

type Props = {
  value: string;
  setValue: () => {};

}

const InputText = ({setValue, value, ...rest}: Props) => {
  return(
    <View style={styles.container}>
      <FilledTextField 
        placeholderTextColor="#00000044"
        containerStyle={styles.input}
        value={value}
        onChangeText={setValue}
        labelActiveColor="#FFF"
        inputContainerStyle={{borderRadius: 5}}
        {...rest}
        
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  input: {
    width: "95%",
    height: 50,
    marginBottom: 25,
    borderRadius: 50,
    backgroundColor: "#FFF",
    // borderColor: "#A3A3A3",
    paddingBottom: 50
  },

})

export default InputText;
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

// import { Container } from './styles';

type Props = {
  text:  string;
  onChangeText: Function;
  onPressButton: Function;
}

const InputTextChat = ({onChangeText, text, onPressButton}: Props) => {
  return(
    <View style={styles.container}>
        <TextInput value={text} onChangeText={(text) => onChangeText(text)} placeholderTextColor={"#828282"} placeholder='Digite sua mensagem aqui' style={styles.inputStyle}/>
     
       <TouchableOpacity activeOpacity={0.8} onPress={() => onPressButton()} style={styles.buttonInput}>
        <View>
          <AntDesign name="arrowup" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row', 
    width: "100%", 
    alignItems:'center',  
  },

  inputStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#EEEEEE",
    borderRadius: 100,
    paddingLeft: 15,
    fontSize: 17,
  },

  buttonInput: {
   width: 35, 
   height: 35, 
   left: -45, 
   borderRadius: 100, 
   backgroundColor: "#8B97FF",
   justifyContent: "center",
   alignItems: "center"

  },

  contentButton: {
    position: "relative",
    zIndex: 1000,
     width: "auto",
    height: "auto",
    left: -20 ,
  },

  contentInput: {
    width: "100%",
    
  }
})

export default InputTextChat;
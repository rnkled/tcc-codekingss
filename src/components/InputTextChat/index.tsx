import React, { useContext } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';
// import { Container } from './styles';

type Props = {
  text:  string;
  onChangeText: Function;
  onPressButton: Function;
}

const InputTextChat = ({onChangeText, text, onPressButton}: Props) => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
  );
  return(
    <View style={styles.container}>
        <TextInput value={text} onChangeText={(text) => onChangeText(text)} placeholderTextColor={theme.textVariant8} placeholder='Digite sua mensagem aqui' style={styles.inputStyle}/>
     
       <TouchableOpacity activeOpacity={0.8} onPress={() => onPressButton()} style={styles.buttonInput}>
        <View>
          <AntDesign name="arrowup" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme :Theme) => {

  const styles = StyleSheet.create({
    container: {
      flexDirection:'row', 
      width: "100%", 
      alignItems:'center',  
    },

    inputStyle: {
      width: "100%",
      height: 50,
      backgroundColor: theme.backgroundVariant,
      borderRadius: 100,
      paddingLeft: 15,
      fontSize: 17,
    },

    buttonInput: {
    width: 35, 
    height: 35, 
    left: -45, 
    borderRadius: 100, 
    backgroundColor: theme.primaryVariant,
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
  return styles;
};

export default InputTextChat;
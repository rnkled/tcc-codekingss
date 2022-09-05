import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, StyleSheetProperties } from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
import { Entypo } from '@expo/vector-icons';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  secure?: boolean;
  containerStyle?: object;
  textColor?: string;
  baseColor?: string;
}

const TextInput = ({setValue, value, label, secure=false, containerStyle, textColor, baseColor, ...rest}: Props) => {
  const [showingPassword, setShowingPassword] = useState(secure);

  return(
    <View style={{...styles.container, ...containerStyle}}>
      <FilledTextField 
        textColor={textColor}
        label={label}
        placeholderTextColor="#0C015044"
        containerStyle={styles.input}
        value={value}
        onChange={(data :any) => {setValue(data.nativeEvent.text)}}
        labelActiveColor="#FFF0"
        baseColor={baseColor ? baseColor : "#0C015088"}
        titleTextStyle={{color: "#fff"}}
        inputContainerStyle={{backgroundColor: "#FFF0",}}
        lineWidth={0}
        activeLineWidth={0}
        labelOffset={{y0: -10, y1: -8}}
        contentInset={{top: 8, bottom: 0}}
        fontSize={18}
        secureTextEntry={showingPassword}
        renderRightAccessory={() => ( secure ? 
          <TouchableOpacity
            style={{top: -10}}
            onPress={() => {setShowingPassword(!showingPassword)}}>
              {showingPassword ? 
              <Entypo name="eye" size={24} color="#0C015088" /> : 
              <Entypo name="eye-with-line" size={24} color="#0C015088" />}
          </TouchableOpacity> : null)}
        editable={true}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 60,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 10,
    borderRadius: 10,

  },

  input: {
    width: "95%",
    backgroundColor: "#FFF0",
    height: 50,
  },
})

export default TextInput;
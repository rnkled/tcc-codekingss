import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, StyleSheetProperties,  } from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,

} from 'rn-material-ui-textfield';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  secure?: boolean;
  containerStyle?: object;
  textColor?: string;
  baseColor?: string;
}

const TextAreaMaterial = ({setValue, value, label, containerStyle, textColor, baseColor, ...rest}: Props) => {
  const {theme} = React.useContext(ThemeContext);
  const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
  );
  return(
    <View style={{...styles.container, ...containerStyle}}>
      <FilledTextField 
        textColor={textColor}
        label={label}
        placeholderTextColor={theme.secondary44}
        containerStyle={styles.input}
        value={value}
        onChange={(data :any) => {setValue(data.nativeEvent.text)}}
        labelActiveColor="transparent"
        baseColor={baseColor ? baseColor : theme.secondary88}
        titleTextStyle={{color: theme.textVariant}}
        inputContainerStyle={{backgroundColor: "transparent",}}
        lineWidth={0}
        activeLineWidth={0}
        labelOffset={{y0: -10, y1: -8}}
        contentInset={{top: 8, bottom: 0}}
        fontSize={18}
        editable={true}
        multiline={true}
        numberOfLines={6}
        maxLength={200}
        {...rest}
      />
    </View>
  );
}

const createStyles = (theme :Theme) => {

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundVariant,
      height: 'auto',
      minHeight: 100,
      maxHeight: 160,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 10,
      borderRadius: 10,
      overflow: 'scroll',
    },

    input: {
      width: "95%",
      backgroundColor: "transparent",
      height: 'auto',
      maxHeight: 140,
      minHeight: 90,
    },
  })
  return styles;
};
export default TextAreaMaterial;
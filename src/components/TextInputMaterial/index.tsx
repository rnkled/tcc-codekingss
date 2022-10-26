import React, {useState} from 'react';
import { StyleSheet, View, TouchableOpacity, StyleSheetProperties } from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
import { Entypo } from '@expo/vector-icons';
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
  editable?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  mask?: (() => string) | 'cpf/cnpj' | 'cep' | 'phone' | null;
}

const TextInput = ({setValue, value, label, secure=false, containerStyle, textColor, baseColor, editable=true, keyboardType="default", mask=null, ...rest}: Props) => {
  const {theme} = React.useContext(ThemeContext);
  const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
  );

  function formatCnpjCpf(value) {

  }

  function formatCEP(str){
    var re = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/; 

    if(re.test(str)){
      setValue(str.replace(re,"$1.$2-$3"));
    }
    setValue(str);
  }


  function formatTel(str){
    let regex = /^\(?([0-9]{2})\)?([0-9]{4,5})\-?([0-9]{4})$/mg;;
    let subst = `($1)$2-$3`;

    let result = str.replace(regex, subst);
    setValue(result);
  }

  const [showingPassword, setShowingPassword] = useState(secure);

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
        baseColor={baseColor ? baseColor : theme.inputTitle}
        tintColor={theme.inputActiveTitle}
        titleTextStyle={{color: theme.textVariant}}
        inputContainerStyle={{backgroundColor: "transparent",}}
        lineWidth={0}
        activeLineWidth={0}
        labelOffset={{y0: -10, y1: -8}}
        contentInset={{top: 8, bottom: 0}}
        fontSize={18}
        secureTextEntry={showingPassword}
        keyboardType={keyboardType}
        formatText={mask ? mask === 'cpf/cnpj' ? formatCnpjCpf : mask === 'cep' ? formatCEP : mask === 'phone' ? formatTel : mask : null}
        renderRightAccessory={() => ( secure ? 
          <TouchableOpacity
            style={{top: -10}}
            onPress={() => {setShowingPassword(!showingPassword)}}>
              {showingPassword ? 
              <Entypo name="eye" size={24} color={theme.inputTitle} /> : 
              <Entypo name="eye-with-line" size={24} color={theme.inputTitle} />}
          </TouchableOpacity> : null)}
        editable={editable}
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
      backgroundColor: theme.inputBackground,
      height: 60,
      paddingTop: 0,
      paddingBottom: 0,
      marginTop: 10,
      borderRadius: 10,

    },

    input: {
      width: "95%",
      backgroundColor: "transparent",
      height: 50,
    },
  })
  return styles;
}

export default TextInput;
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  containerStyle?: object;
}

const Button = ({label, onPress, loading, containerStyle,  ...rest}: Props) => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
  );
  return(
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{...{justifyContent: 'center', alignItems:'center', width: '100%', height: 'auto'}, ...containerStyle}}>
      <LinearGradient
        colors={[theme.buttonFirst, theme.buttonSecond]}
        style={{...styles.button, ...containerStyle}}
      >
      <Text style={styles.text}>{label}</Text>
      {loading && (<ActivityIndicator style={styles.loading} size={25} color={theme.secondary}/>)}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const createStyles = (theme :Theme) => {

  const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      // fontWeight: "bold",
      fontFamily: "Inter_600SemiBold",
      color: theme.titleButton,
    },
    button: {
      width: "100%",
      height: 50,
      marginTop: "5%",
      backgroundColor: theme.primaryVariant,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
      borderWidth: 1,
      borderColor: theme.secondary,
      flexDirection: "row",
    },
    loading: {
      position: "absolute",
      right: '5%',
    }
  })
return styles;
};

export default Button;
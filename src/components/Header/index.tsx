import React, { useContext } from 'react';
import { StatusBar, StyleSheet, ViewProps, Text, TouchableOpacity, View } from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';
// import { Container } from './styles';

type Props = ViewProps & {
  buttonLeft?: { 
    label?: string, 
    onPress: Function,
    isIcon?: boolean,
    icon?: Function,
    fontSize?: number,
  },
  buttonRight?: {
    label?: string, 
    onPress: Function,
    isIcon?: boolean,
    icon?: Function,
    fontSize?: number,
  },
  titlePage?: string,
  fontSize?: number,
  color?:string,
}

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 0 : 64; 
const Header = ({titlePage, buttonLeft, buttonRight, fontSize, color, ...rest}: Props) => {  
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
  );
  return(
    <View style={styles.container} {...rest} >
      <View style={styles.contentButton}>
        {buttonLeft?.label && (
        <TouchableOpacity onPress={() => buttonLeft?.onPress()} style={styles.buttonComponent}>
          <Text style={[styles.labelButton, {textAlign: "left", fontSize:buttonLeft.fontSize, color: color ? color : theme.primaryVariant}]}>
            {buttonLeft.label}
          </Text>
        </TouchableOpacity>
        )}
        {buttonLeft?.isIcon && (
          <TouchableOpacity onPress={() => buttonLeft?.onPress()} style={[styles.buttonComponent, {alignItems: "flex-start",}]}>
          <Text style={[styles.labelButton, {textAlign: "left",}]}>
            {buttonLeft.icon()}
          </Text>
        </TouchableOpacity>
        )}
      </View>
      <View style={styles.contentTitle}>
        <Text style={[styles.titleHeader, {fontSize: fontSize ? fontSize : 16, color: color ? color : theme.textVariant}]}>{titlePage}</Text>
      </View>
      <View style={styles.contentButton}>
        {buttonRight?.label && (
        <TouchableOpacity onPress={() => buttonRight?.onPress()} style={styles.buttonComponent}>
          <Text style={[styles.labelButton, {textAlign: "right", color: color ? color : theme.primaryVariant, }]}>
            {buttonRight.label}
          </Text>
        </TouchableOpacity>
        )}

        {buttonRight?.isIcon && (
    
          <TouchableOpacity onPress={() => buttonRight?.onPress()} style={[styles.buttonComponent, {alignItems: "flex-end",}]}>
          <Text style={[styles.labelButton, {textAlign: "left"}]}>
            {buttonRight.icon()}
          </Text>
        </TouchableOpacity>
        )}
      </View>

    </View>
  );
}
const createStyles = (theme :Theme) => {
  const styles = StyleSheet.create({
    container: {
      paddingTop: statusBarHeight,
      flexDirection: "row",
      paddingHorizontal: 20,
      justifyContent: "space-between",
      alignItems: "center",
      height: 70,
      marginBottom: "5%",
    },

    titleHeader: {
      fontFamily: 'Inter_600SemiBold',
      width: "100%",
      textAlign: "center",
    },

    labelButton: {
      textAlign: "center",
      fontFamily: 'Inter_500Medium',
    },

    contentTitle: {
      width: "60%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
    },
    
    contentButton: {
      width: "20%",
      height: 150,
    },

    buttonComponent: {
      flex: 1,
      width: "100%",
      justifyContent: "center",
    }

  })
  return styles;
};

export default Header;
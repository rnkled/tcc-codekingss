import React from 'react';
import { StatusBar, StyleSheet, ViewProps, Text, TouchableOpacity, View } from 'react-native';

// import { Container } from './styles';

type Props = ViewProps & {
  buttonLeft?: { 
    label?: string, 
    onPress: () => {},
    isIcon: boolean,
    icon: Function,
  },
  buttonRight?: {
    label?: string, 
    onPress: () => {},
    isIcon: boolean,
    icon: Function,
  },
  titlePage?: string,
  fontSize?: number,
}

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 64; 
const Header = ({titlePage, buttonLeft, buttonRight, fontSize, ...rest}: Props) => {



  return(
    <View style={[styles.container, {backgroundColor: backgroundColor || "#0C0150",}]}  {...rest} >
      <View style={styles.contentButton}>
        {buttonLeft?.label && (
        <TouchableOpacity onPress={buttonLeft?.onPress} style={styles.buttonComponent}>
          <Text style={[styles.labelButton, {textAlign: "left"}]}>
            {buttonLeft.label}
          </Text>
        </TouchableOpacity>
        )}
        {buttonLeft?.isIcon && (
          <TouchableOpacity onPress={buttonLeft?.onPress} style={[styles.buttonComponent, {alignItems: "flex-start",}]}>
          <Text style={[styles.labelButton, {textAlign: "left"}]}>
            {buttonLeft.icon()}
          </Text>
        </TouchableOpacity>
        )}
      </View>
      <View style={styles.contentTitle}>
        <Text style={[styles.titleHeader, {fontSize: fontSize ? fontSize : 16}]}>{titlePage}</Text>
      </View>
      <View style={styles.contentButton}>
        {buttonRight?.label && (
        <TouchableOpacity onPress={buttonRight.onPress} style={styles.buttonComponent}>
          <Text style={[styles.labelButton, {textAlign: "right"}]}>
            {buttonRight.label}
          </Text>
        </TouchableOpacity>
        )}

        {buttonRight?.isIcon && (
    
          <TouchableOpacity onPress={buttonLeft?.onPress} style={[styles.buttonComponent, {alignItems: "flex-end",}]}>
          <Text style={[styles.labelButton, {textAlign: "left"}]}>
            {buttonRight.icon()}
          </Text>
        </TouchableOpacity>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#0C0150",
    paddingTop: statusBarHeight,
    flexDirection: "row",
    paddingHorizontal: 20,
    // paddingBottom: 44,
    justifyContent: "space-between",
    alignItems: "center",

  },

  titleHeader: {
    fontFamily: 'Inter_600SemiBold',
    color: '#FFF',
    width: "100%",
    textAlign: "center",
  },

  labelButton: {
    color: '#8B97FF',
    textAlign: "center",
    fontFamily: 'Inter_500Medium'
  },

  contentTitle: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  
  contentButton: {
    width: "auto",
    
  },

  buttonComponent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",

    
    
  }

})

export default Header;
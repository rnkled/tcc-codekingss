import React from 'react';
import { StatusBar, StyleSheet, ViewProps, Text, TouchableOpacity, View } from 'react-native';

// import { Container } from './styles';

type Props = ViewProps & {
  buttonLeft?: { 
    label?: string, 
    onPress: Function,
    isIcon?: boolean,
    icon?: Function,
  },
  buttonRight?: {
    label?: string, 
    onPress: Function,
    isIcon?: boolean,
    icon?: Function,
  },
  titlePage?: string,
  fontSize?: number,
  color?:string,
}

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 64; 
const Header = ({titlePage, buttonLeft, buttonRight, fontSize, color, ...rest}: Props) => {



  return(
    <View style={styles.container} {...rest} >
      <View style={styles.contentButton}>
        {buttonLeft?.label && (
        <TouchableOpacity onPress={() => buttonLeft?.onPress()} style={styles.buttonComponent}>
          <Text style={[styles.labelButton, {textAlign: "left"}]}>
            {buttonLeft.label}
          </Text>
        </TouchableOpacity>
        )}
        {buttonLeft?.isIcon && (
          <TouchableOpacity onPress={() => buttonLeft?.onPress()} style={[styles.buttonComponent, {alignItems: "flex-start",}]}>
          <Text style={[styles.labelButton, {textAlign: "left", color: color ? color : '#8B97FF',}]}>
            {buttonLeft.icon()}
          </Text>
        </TouchableOpacity>
        )}
      </View>
      <View style={styles.contentTitle}>
        <Text style={[styles.titleHeader, {fontSize: fontSize ? fontSize : 16, color: color ? color : "#FFF"}]}>{titlePage}</Text>
      </View>
      <View style={styles.contentButton}>
        {buttonRight?.label && (
        <TouchableOpacity onPress={() => buttonRight?.onPress()} style={styles.buttonComponent}>
          <Text style={[styles.labelButton, {textAlign: "right", color: color ? color : '#8B97FF', }]}>
            {buttonRight.label}
          </Text>
        </TouchableOpacity>
        )}

        {buttonRight?.isIcon && (
    
          <TouchableOpacity onPress={() => buttonLeft?.onPress()} style={[styles.buttonComponent, {alignItems: "flex-end",}]}>
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
    height: "10%",
    marginBottom: "5%",
  },

  titleHeader: {
    fontFamily: 'Inter_600SemiBold',
    width: "100%",
    textAlign: "center",
  },

  labelButton: {
    textAlign: "center",
    fontFamily: 'Inter_500Medium'
  },

  contentTitle: {
    width: "76%",
    justifyContent: "center",
    alignItems: "center",
  },
  
  contentButton: {
    width: "12%",
    height: 150,
    
  },

  buttonComponent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",

    
    
  }

})

export default Header;
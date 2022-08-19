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
}

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 12 : 64; 
const Header = ({titlePage, buttonLeft, buttonRight, ...rest}: Props) => {



  return(
    <View style={styles.container}  {...rest} >
      <View style={styles.contentButton}>
        {buttonLeft?.label && (
        <TouchableOpacity onPress={buttonLeft?.onPress} style={styles.buttonComponent}>
          <Text style={[styles.labelButton, {textAlign: "left"}]}>
            {buttonLeft.label}
          </Text>
        </TouchableOpacity>
        )}
        {buttonLeft?.isIcon && (
          <TouchableOpacity onPress={buttonLeft?.onPress} style={styles.buttonComponent}>
          <Text style={[styles.labelButton, {textAlign: "left"}]}>
            {buttonLeft.icon()}
          </Text>
        </TouchableOpacity>
        )}
      </View>
      <View style={styles.contentTitle}>
        <Text style={styles.titleHeader}>{titlePage}</Text>
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
          <TouchableOpacity onPress={buttonLeft?.onPress} style={styles.buttonComponent}>
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
    backgroundColor: "#0C0150",
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
    fontSize: 30,
  },

  labelButton: {
    fontSize: 16,
    color: '#8B97FF',
    textAlign: "center",
    fontFamily: 'Inter_500Medium'
  },

  contentTitle: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center"
  },

  contentButton: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonComponent: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
    
  }

})

export default Header;
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';
// import { Container } from './styles';

const Footer: React.FC = () => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
  );
  return(
    <View style={styles.container}>
      <Text style={styles.label}>Powered By CodeKingss</Text>
    </View>
  );
}

const createStyles = (theme :Theme) => {

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 35,
    },

    label: {
      color: theme.primaryVariant,
      fontSize: 16,
      fontFamily: "Inter_400Regular"
    }
  })
return styles;
};

export default Footer;
import React, { PropsWithChildren, useContext, useEffect }  from 'react';
import { View, ViewProps } from 'react-native';
import { LinearGradient, } from 'expo-linear-gradient';
import ThemeContext from '../../context/ThemeContext';

type props = ViewProps & PropsWithChildren<{
  children?: React.ReactNode,
}>;


const Background = ({ children, ...rest }: props) => {
  const {theme, mode} = useContext(ThemeContext);
  const [colors, setColors] = React.useState(['#0C0150', '#000']);

  useEffect(() => {
    if(theme){
      setColors([theme.backgroundFirst, theme.backgroundSecond])
    }
  }, [mode])

  return (
    <LinearGradient
        colors={colors}
        style={{width: "100%", flex: 1, height: "100%"}}
        >
      
      <View {...rest}>
        {children}
      </View>
    </LinearGradient>
  );
}

export default Background;
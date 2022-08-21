import React, { PropsWithChildren }  from 'react';
import { View, ViewProps } from 'react-native';
import { LinearGradient, } from 'expo-linear-gradient';

type props = ViewProps & PropsWithChildren<{
  children?: React.ReactNode,
}>;


const Background = ({ children, ...rest }: props) => {
  return (
    <LinearGradient
        colors={['#0C0150', '#000']}
        style={{width: "100%", flex: 1}}
        >
      
      <View {...rest}>
        {children}
      </View>
    </LinearGradient>
  );
}

export default Background;
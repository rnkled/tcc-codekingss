import React, { PropsWithChildren }  from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type props = PropsWithChildren<{
  children?: React.ReactNode,
}>;


const Background = ({ children }: props) => {
  return (
    <LinearGradient
        colors={['#0C0150', '#000']}
        style={{width: "100%", flex: 1}}
    >
      {children}
    </LinearGradient>
  );
}

export default Background;
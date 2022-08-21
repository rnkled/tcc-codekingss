import React from 'react';

import LoginStack from './login.stack.routes'
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './home.drawer.routes';
import VideoCall from '../pages/VideoCall';


const Stack = createNativeStackNavigator();

const Routes = () => {

    let isSignedIn = false;
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isSignedIn ? (
                    <>
                        <Stack.Screen name="login" component={LoginStack}/>
                    </>
                    ) : (
                    <>
                        <Stack.Screen name="home" component={HomeStack} />
                        {/* <Stack.Screen name="videoCall" component={VideoCall} /> */}

                    </>
                )}
            </Stack.Navigator>)
}

export default Routes;

import React from 'react';

import LoginStack from './login.stack.routes'
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './home.drawer.routes';
import VideoCall from '../pages/VideoCall';
import RateCallVideo from '../pages/RateCallVideo';
import ProfessionalProfile from '../pages/ProfessionalProfile';


const Stack = createNativeStackNavigator();

const Routes = () => {

    let isSignedIn = true;
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isSignedIn ? (
                    <>
                        <Stack.Screen name="login" component={LoginStack}/>
                    </>
                    ) : (
                    <>
                        <Stack.Screen name="home" component={HomeStack} />
                        <Stack.Screen name="videoCall" component={VideoCall} />
                        <Stack.Screen name="rateVideoCall" component={RateCallVideo} />
                        <Stack.Screen name="ProfessionalProfile" component={ProfessionalProfile} />

                    </>
                )}
            </Stack.Navigator>)
}

export default Routes;

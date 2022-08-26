import React, {useContext} from 'react';
import LoginStack from './login.stack.routes'
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './home.drawer.routes';
import VideoCall from '../pages/VideoCall';
import RateCallVideo from '../pages/RateCallVideo';
import AuthContext from "../context/AuthContext";
import ProfessionalProfile from '../pages/ProfessionalProfile';
import Chat from '../pages/Chat';

export type RouteStackParamList = {
    login: undefined,
    home: undefined;
    videoCall: {test: string,};
    rateVideoCall: {
        id_professional: string,
    },
    professionalProfile: {
        id_professional: string;
    },
    chat: undefined,
    'home.search': undefined,
}

const Stack = createNativeStackNavigator<RouteStackParamList>();

const Routes = () => {

    const {signed } =  useContext(AuthContext);

    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!signed ? (
                    <>
                        <Stack.Screen name="login" component={LoginStack}/>
                    </>
                    ) : (
                    <>
                        <Stack.Screen name="home" component={HomeStack} />
                        <Stack.Screen name="videoCall" component={VideoCall} />
                        <Stack.Screen name="rateVideoCall" component={RateCallVideo} />
                        <Stack.Screen name="professionalProfile" component={ProfessionalProfile} />
                        <Stack.Screen name="chat" component={Chat} />


                    </>
                )}
            </Stack.Navigator>)
}

export default Routes;

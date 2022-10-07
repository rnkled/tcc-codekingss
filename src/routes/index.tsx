import React, {useContext} from 'react';
import LoginStack from './login.stack.routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VideoCall from '../pages/VideoCall';
import RateCallVideo from '../pages/RateCallVideo';
import AuthContext from "../context/AuthContext";
import ProfessionalProfile from '../pages/ProfessionalProfile';
import Chat from '../pages/Chat';
import Home from '../pages/Home'
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import NewAppointment from '../pages/NewAppointment';
import HomeProfessional from '../pages/HomeProfessional';
import SearchProfessional from '../pages/SearchProfessional';
import Calendar from '../pages/Calendar';

export type RouteStackParamList = {
    login: undefined,
    home: undefined;
    search: undefined;
    settings: undefined;
    videoCall: undefined;
    rateVideoCall: {
        id_professional: string,
    },
    professionalProfile: {
        id_professional: string;
    },
    chat: {
        id_professional: string;
        id_pacient: string;
        pushNotification: string;
        name: string;
    },
    homeProfessional: undefined;
    searchProfessional: undefined;
    calendar: undefined;
    newAppointment: {
        id_usuario?: string;
        date?: string;
    }
}

const Stack = createNativeStackNavigator<RouteStackParamList>();

const Routes = () => {

    const {signed, user } =  useContext(AuthContext);

    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!signed ? 
                    (
                            <Stack.Screen name="login" component={LoginStack}/>
                    ) : (
                        <>
                            <Stack.Screen name="home" component={user.role === "professional" ? HomeProfessional : Home} />
                            <Stack.Screen name="search" component={Search} />
                            <Stack.Screen name="searchProfessional" component={SearchProfessional} />
                            <Stack.Screen name="settings" component={Settings} />
                            <Stack.Screen name="videoCall" component={VideoCall} />
                            <Stack.Screen name="rateVideoCall" component={RateCallVideo} />
                            <Stack.Screen name="professionalProfile" component={ProfessionalProfile} />
                            <Stack.Screen name="chat" component={Chat} />
                            <Stack.Screen name="calendar" component={Calendar} />
                            <Stack.Screen name="newAppointment" component={NewAppointment} />

                        </>
                        )
                    }
            </Stack.Navigator>)
}

export default Routes;

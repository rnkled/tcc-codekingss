import React, {useContext, useState, useEffect} from 'react';
import LoginStack from './login.stack.routes';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import VideoCall from '../pages/VideoCall';
import RateCallVideo from '../pages/RateCallVideo';
import AuthContext from "../context/AuthContext";
import ThemeContext from '../context/ThemeContext';
import ProfessionalProfile from '../pages/ProfessionalProfile';
import Chat from '../pages/Chat';
import Home from '../pages/Home'
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import appointment from '../pages/Appointment';
import HomeProfessional from '../pages/HomeProfessional';
import SearchProfessional from '../pages/SearchProfessional';
import Calendar from '../pages/Calendar';
import AppointmentInterface from '../interfaces/appointmentInterface';
import messaging from '@react-native-firebase/messaging';
import UserInterface from '../interfaces/userInterface';
import AsyncStorage from '@react-native-community/async-storage';
import { SendNotificationProps, sendNotificationTo } from '../services/notificationService';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';


export type RouteStackParamList = {
    login: undefined,
    home: undefined;
    search: undefined;
    settings: undefined;
    videoCall: {
        channel_id?: string;
    };
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
    appointment: {
        id_usuario?: string;
        date?: string;
        item?: AppointmentInterface;
    }
}

const Stack = createNativeStackNavigator<RouteStackParamList>();
export type propsRouteInitial = {
    initialRoute?: string;
}

type propsCallRoute = NativeStackNavigationProp<RouteStackParamList, 'videoCall'>



const Routes = () => {

    const {signed, user } =  useContext(AuthContext);
    const {loadingTheme} = useContext(ThemeContext);
    const [initialRoute, setInitialRoute] = useState("home");
    const [loading, setLoading] = useState(false);
    const [channel, setChannel] = useState("");
    const navigation = useNavigation<propsCallRoute>();


    useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
        messaging().onNotificationOpenedApp(async (remoteMessage) => {

            const storagedUser: UserInterface = JSON.parse(await AsyncStorage.getItem('@user'));
            if(storagedUser && storagedUser.role === "professional" && remoteMessage && remoteMessage.data.type && remoteMessage.data.type === "call"){
                console.log(remoteMessage.data.navigate);
                
                
                const dataNotification: SendNotificationProps = {
                    token: remoteMessage.data.tokenPush,
                    title: "Encontramos um profissional",
                    body: "Você realmente deseja entrar nessa consulta?",
                    id_professional: storagedUser._id,
                    id_pacient: null,
                    name: storagedUser.name,
                    sounds: "message",
                    tokenSecondary: storagedUser.tokenPush,
                    type: "requestCall",
                    multiplesToken: false,
                }
                await sendNotificationTo({dataNotification});
            
                
                navigation.navigate("videoCall", {channel_id: remoteMessage.data.channel})
            }
         
        });

    // Check whether an initial notification is available
        messaging()
        .getInitialNotification()
        .then(async(remoteMessage) => {
            console.log("app fechado");
            setLoading(true);
            const storagedUser: UserInterface = JSON.parse(await AsyncStorage.getItem('@user'));
            if(storagedUser && storagedUser.role === "professional" && remoteMessage && remoteMessage.data.type && remoteMessage.data.type === "call"){
            console.log("aqqq34");
            console.log({aa: remoteMessage.data});
            
            const dataNotification: SendNotificationProps = {
                token: remoteMessage.data.tokenPush,
                title: "Encontramos um profissional",
                body: "Você realmente deseja entrar nessa consulta?",
                id_professional: storagedUser._id,
                id_pacient: null,
                name: storagedUser.name,
                sounds: "message",
                tokenSecondary: storagedUser.tokenPush,
                type: "requestCall",
                multiplesToken: false
            }
            await sendNotificationTo({dataNotification});
            
            
            setChannel(remoteMessage.data.channel);
            setInitialRoute("videoCall"); // e.g. "Settings"
          
            }
            setLoading(false);
        });
  }, []);


    if (loading || loadingTheme) {
        return <Loading/>
    }


    return (
            <Stack.Navigator initialRouteName={initialRoute as any} screenOptions={{ headerShown: false }}>
                {!signed ? 
                    (
                            <Stack.Screen name="login" component={LoginStack}/>
                    ) : (
                        <>
                            <Stack.Screen name="home" component={user.role === "professional" ? HomeProfessional : Home} />
                            <Stack.Screen name="search" component={Search} />
                            <Stack.Screen name="searchProfessional" component={SearchProfessional} />
                            <Stack.Screen name="settings" component={Settings} />
                            <Stack.Screen initialParams={{channel_id: channel}} name="videoCall" component={VideoCall} />
                            <Stack.Screen name="rateVideoCall" component={RateCallVideo} />
                            <Stack.Screen name="professionalProfile" component={ProfessionalProfile} />
                            <Stack.Screen name="chat" component={Chat} />
                            <Stack.Screen name="calendar" component={Calendar} />
                            <Stack.Screen name="appointment" component={appointment} />

                        </>
                        )
                    }
            </Stack.Navigator>)
}

export default Routes;

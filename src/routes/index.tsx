import React, {useContext, useState, useEffect} from 'react';
import LoginStack from './login.stack.routes';
import { TransitionPresets, createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
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

const Stack = createStackNavigator<RouteStackParamList>();
export type propsRouteInitial = {
    initialRoute?: string;
}

type propsCallRoute = StackNavigationProp<RouteStackParamList, 'videoCall'>



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

    // const transitionsOptions :any = {
    //     transitionSpec: {
    //       open: TransitionSpecs.TransitionIOSSpec,
    //       close: TransitionSpecs.TransitionIOSSpec,
    //     },
    //     cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
    //   }

    const transitionsGeral :any = TransitionPresets.ModalSlideFromBottomIOS;
    const transitionsConfigure :any = TransitionPresets.SlideFromRightIOS;


    return (
            <Stack.Navigator initialRouteName={initialRoute as any} screenOptions={{ headerShown: false }}>
                {!signed ? 
                    (
                            <Stack.Screen name="login" component={LoginStack}/>
                    ) : (
                        <>
                            <Stack.Screen name="home" component={user.role === "professional" ? HomeProfessional : Home} options={transitionsGeral} />
                            <Stack.Screen name="search" component={Search} options={transitionsGeral} />
                            <Stack.Screen name="searchProfessional" component={SearchProfessional} options={transitionsGeral} />
                            <Stack.Screen name="settings" component={Settings} options={transitionsConfigure}/>
                            <Stack.Screen initialParams={{channel_id: channel}} name="videoCall" component={VideoCall} options={transitionsGeral} />
                            <Stack.Screen name="rateVideoCall" component={RateCallVideo} options={transitionsGeral} />
                            <Stack.Screen name="professionalProfile" component={ProfessionalProfile} options={transitionsGeral} />
                            <Stack.Screen name="chat" component={Chat} options={transitionsGeral} />
                            <Stack.Screen name="calendar" component={Calendar} options={transitionsGeral} />
                            <Stack.Screen name="appointment" component={appointment} options={transitionsGeral} />

                        </>
                        )
                    }
            </Stack.Navigator>)
}

export default Routes;

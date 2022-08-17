import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login/index';
import Drawer from './drawer.routes';
import Recuperacao from '../pages/Login/recuperarSenha';
import Registrar from '../pages/Login/registrar';
import { StyleSheet, Text, View } from 'react-native';
const Stack = createNativeStackNavigator();

const AppRoutes = ({routeInitial}) => (

    <Stack.Navigator initialRouteName={"login"} mode={"modal"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Drawer} options={{ title: 'CodeKingss', headerLeft: null }} />
        <Stack.Screen name="login.create" component={Registrar} />
        <Stack.Screen name="login.recover" component={Recuperacao}/>
    </Stack.Navigator>
)

export default AppRoutes;
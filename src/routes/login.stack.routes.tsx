import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login/index';
import Recuperacao from '../pages/Login/recuperarSenha';
import Registrar from '../pages/Login/registrar';
import RegistrarProfissional from '../pages/Login/registrarProfissional';


const Stack = createNativeStackNavigator();


const LoginStack = () => {

    return (
        <Stack.Navigator initialRouteName={"login.index"} screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
            <Stack.Screen name="login.index" component={Login}/>
            <Stack.Screen name="login.create" component={Registrar}/>
            <Stack.Screen name="login.recover" component={Recuperacao}/>
            <Stack.Screen name="login.createProfessional" component={RegistrarProfissional}/>
        </Stack.Navigator>
)}

export default LoginStack;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './login.stack.routes'
import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStack from './home.drawer.routes';


const Stack = createNativeStackNavigator();

const Routes = () => {

    let isSignedIn = true;
    return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {!isSignedIn ? (
                        <>
                            <Stack.Screen name="login" component={LoginStack}/>
                        </>
                        ) : (
                        <>
                            <Stack.Screen name="home" component={HomeStack} />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>)
}

export default Routes;

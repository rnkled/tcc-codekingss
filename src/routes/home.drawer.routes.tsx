import React, { useState } from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../pages/Home'

const Drawer = createDrawerNavigator();

const HomeStack = () => {
    return <>
        <Drawer.Navigator initialRouteName="home.index" screenOptions={{headerShown: false}} >
            <Drawer.Screen name="home.index" component={Home} />
        </Drawer.Navigator>
    </>
}



export default HomeStack;
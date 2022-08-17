import React, { useState } from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { StyleSheet, Image, View, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import Home from '../pages/Home'

const Drawer = createDrawerNavigator();

const AppRoutes = () => {

    const navigation = useNavigation();

    function openDrawer() {
        navigation.dispatch(DrawerActions.openDrawer());

    }

    return <>
        <Drawer.Navigator initialRouteName="home" drawerStyle={styles.drawer} >
            <Drawer.Screen name="home" component={Home} />
        </Drawer.Navigator>
        <View style={{
            position: 'absolute',
            width: 22,
            height: 42,
            backgroundColor: '#aaa4',
            top: '50%',
            left: '0%',
            marginLeft: 0,
            alignContent: 'center',
            justifyContent: 'center',
            borderBottomRightRadius: 19,
            borderTopRightRadius: 19,
            overflow: 'hidden',
            borderRightColor: '#0003',
            shadowColor: '#000',
            shadowOffset: { width: 3, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 5,
            borderRightWidth: 0.6,
            zIndex: 100,
            //elevation: 4,
        }}><TouchableOpacity onPress={() => openDrawer()} style={{ flex: 1, alignContent: 'center', marginLeft: -7, justifyContent: 'center' }}>
                <Entypo name="chevron-small-right" size={30} color="black" />
            </TouchableOpacity></View>
    </>
}


const styles = StyleSheet.create({
    drawer: {
        backgroundColor: '#FFF',
        width: '90%'
    }
})


export default AppRoutes;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Home from '../pages/Home'
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
  
function CustomDrawerContent(props) {

    function goTo(route: string) {
        props.navigation.navigate(route);
    }

return (
    <DrawerContentScrollView {...props} style={styles.container}>
        
        <DrawerItem
            label="Perfil"
            style={styles.item}
            onPress={() => goTo('settings')}
            labelStyle={styles.label}
        />
        

    </DrawerContentScrollView>
);
}


const HomeStack = () => {
    return <>
        <Drawer.Navigator initialRouteName="index" screenOptions={{headerShown: false}} drawerContent={CustomDrawerContent}>
            <Drawer.Screen name="index" component={Home} />
            <Drawer.Screen name="search" component={Search} />
            <Drawer.Screen name="settings" component={Settings} />
        </Drawer.Navigator>
    </>
}


const styles = StyleSheet.create({
    container: {
        paddingTop: '20%',
        flex: 1,
        backgroundColor: '#0C0150',
    }, 
    item: {
        alignItems: 'flex-start',
        height: 50,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#8B97FF',
        left: -10,
        position: 'relative',
    },
    label: {
        textAlign:'center',
        width: 260,
        height: 40,
        color: '#8B97FF',
        fontSize: 25,
        top: -6
    },
});


export default HomeStack;
import { AntDesign, EvilIcons, Feather, FontAwesome, Foundation, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, ColorValue, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteStackParamList } from "../../routes";
import AppointmentInterface from '../../interfaces/appointmentInterface';
import { OutlinedTextField } from 'rn-material-ui-textfield';


type AppointmentItemProps = {
    item: AppointmentInterface;
    updateData: () => void;
    goToAppointment: (item: AppointmentInterface) => void;
}

type propsScreens = DrawerNavigationProp<RouteStackParamList>;

const AppointmentItem = ({item, updateData, goToAppointment} :AppointmentItemProps) => {

    const navigation = useNavigation<propsScreens>();

    function handleEditAppointment(){

        Alert.alert('Editar', 'Deseja editar este agendamento?', [
            {
                text: 'Não',
                style: 'cancel'
            },{
                text: 'Sim',
                onPress: () => {goToAppointment(item)}
            }
            
        ]);       
    }

    function handleDeleteAppointment(){
        Alert.alert('ATENÇÃO!', 'Deseja realmente cancelar este agendamento?', [
            {
                text: 'Cancelar',
            },
            {
                text: 'Sim',
                onPress: () => {
                    updateData();
                    console.log('deletar')
                }
            }
        ])
    }


  return (
    <View style={styles.appointmentContainer} key={item.user_id+item.time+new Date().toDateString}>
        <View style={styles.appointmentTimeContainer}>
            <Text style={styles.appointmentTime}>{item.time}</Text>
        </View>
        <View style={styles.appointmentInfo}>
            <View style={styles.titleBox}>
                {item.color && <EvilIcons name="sc-instagram" size={24} color={item.color as ColorValue} />}
                <Text style={styles.appointmentTitle}> {item.name} </Text>
            </View>
            <Text style={styles.appointmentNote}>{item.note}</Text>
            <TouchableOpacity style={[styles.appointmentTag, {right: 2}]} onPress={handleDeleteAppointment}>
                <FontAwesome name="remove" size={24} color="#b5b5ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.appointmentInfoIcon} onPress={handleEditAppointment}>
                <Feather  name="edit" size={20} color="#b5b5ff" />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    appointmentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        minHeight: 50,
        backgroundColor: '#8B97FF55',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
    },
    appointmentTimeContainer: {
        width: '15%',
        height: 50,
        borderRadius: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8B97FF22',
    },
    appointmentInfo: {
        width: '75%',
        minHeight: 50,
        justifyContent: 'space-between',
        paddingRight: '10%',
    },
    appointmentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b5b5ff',
    },
    titleBox: {
        flexDirection: 'row',
        alignItems: 'center',
        left: -5,
    },
    appointmentTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#b5b5ff',

    },
    appointmentNote: {
        fontSize: 14,
        color: '#ccf8',
    },
    appointmentTag: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    appointmentInfoIcon: {
        position: 'absolute',
        right: 1,
        bottom: 0,
    },
});

export default AppointmentItem;
import { AntDesign, Foundation, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, ColorValue } from 'react-native';
import AppointmentInterface from '../../interfaces/appointmentInterface';


type AppointmentItemProps = {
    item: AppointmentInterface;
}


const AppointmentItem = ({item} :AppointmentItemProps) => {
  return (
    <View style={styles.appointmentContainer} key={item.pacient_id+item.time+new Date().toDateString}>
        <View style={styles.appointmentTimeContainer}>
            <Text style={styles.appointmentTime}>{item.time}</Text>
        </View>
        <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentTitle}>{item.name}</Text>
            <Text style={styles.appointmentNote}>{item.note}</Text>
            <AntDesign style={styles.appointmentTag} name="tags" size={24} color={item.color as ColorValue} />
            <Ionicons style={styles.appointmentInfoIcon} name="information-circle-outline" size={22} color="#b5b5ff" />
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
    appointmentTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#115',

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
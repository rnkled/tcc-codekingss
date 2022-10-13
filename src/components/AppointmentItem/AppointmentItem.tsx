import { AntDesign, EvilIcons, Feather, FontAwesome, Foundation, Ionicons } from '@expo/vector-icons';
import React, {useContext, useMemo} from 'react';
import { View, Text, StyleSheet, ColorValue, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteStackParamList } from "../../routes";
import AppointmentInterface from '../../interfaces/appointmentInterface';
import { OutlinedTextField } from 'rn-material-ui-textfield';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';


type AppointmentItemProps = {
    item: AppointmentInterface;
    updateData: () => void;
    goToAppointment: (item: AppointmentInterface) => void;
    manage: boolean;
}

type propsScreens = DrawerNavigationProp<RouteStackParamList>;

const AppointmentItem = ({item, updateData, goToAppointment, manage} :AppointmentItemProps) => {

    const {theme} = useContext(ThemeContext);
    const styles = React.useMemo(
        () => createStyles(theme),
        [theme]
    );

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
            {manage && <TouchableOpacity style={[styles.appointmentTag, {right: 2}]} onPress={handleDeleteAppointment}>
                <FontAwesome name="remove" size={24} color={theme.appointmentCardColor} />
            </TouchableOpacity>}
            {manage && <TouchableOpacity style={styles.appointmentInfoIcon} onPress={handleEditAppointment}>
                <Feather  name="edit" size={20} color={theme.appointmentCardColor} />
            </TouchableOpacity>}
        </View>
    </View>
  );
}

const createStyles = (theme :Theme) => {
    const styles = StyleSheet.create({
        appointmentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: 'auto',
            minHeight: 50,
            backgroundColor: theme.appointmentCardBackground,
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
            backgroundColor: theme.primaryVariant22,
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
            color: theme.appointmentCardColor,
        },
        titleBox: {
            flexDirection: 'row',
            alignItems: 'center',
            left: -5,
        },
        appointmentTime: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.appointmentCardColor,
    
        },
        appointmentNote: {
            fontSize: 14,
            color: theme.textGray8,
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
    return styles;
  };

export default AppointmentItem;
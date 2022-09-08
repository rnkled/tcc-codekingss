import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Image,
    ActivityIndicator,
    ImageSourcePropType,
    TextInput,
    ListRenderItemInfo  
} from "react-native";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";
import Background from "../../components/Background";
import AuthContext from "../../context/AuthContext";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteStackParamList } from "../../routes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import api from "../../services/api";
import Loading from '../../components/Loading';
import {Calendar, Agenda, AgendaEntry, DateData} from 'react-native-calendars';
import localization from './localization';
import appointmentInterface from '../../interfaces/appointmentInterface';
import AppointmentItem from '../../components/AppointmentItem/AppointmentItem';
import { Ionicons } from '@expo/vector-icons';


localization();

type propsScreens = DrawerNavigationProp<RouteStackParamList>;

const CalendarComponent: React.FC = () => {
    const navigation = useNavigation<propsScreens>();

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [apiData, setApiData] = useState({});
    const [selectedDay, setSelectedDay] = useState<DateData>({dateString: '0000-00-00'} as DateData);

    useEffect(() => {
        setTimeout(() => {
            formatData();
            setLoading(false);
        }, 2000);
    }, []);

    function formatData() {

        const APIData = {
            '2022-09-09': [
                {
                    name: 'Consulta com Juliano',
                    time: '10:00',
                    status: 'confirmado',
                    note: 'Paciente com quadro de esquizofrenia',
                    pacient_id: 11,
                    color: '#f88'
                }, 
                {
                    name: 'Consulta com Larissa',
                    time: '15:00',
                    status: 'a confirmar',
                    note: 'Paciente com quadro de Psicose Pos Parto',
                    pacient_id: 12,
                    color: '#88f'
                },
                {
                    name: 'Consulta com Amanda',
                    time: '16:00',
                    status: 'confirmado',
                    note: 'Paciente com quadro de esquizofrenia e Psicose delirante aguda com sintomas bipolares',
                    pacient_id: 13,
                    color: '#f88'
                },
                {
                    name: 'Consulta com Eliana',
                    time: '18:00',
                    status: 'confirmado',
                    note: 'Paciente com quadro de TOC e Psicose',
                    pacient_id: 14,
                    color: '#ff0'
                }
            ],
            '2022-09-10': [
                {
                    name: 'Consulta com Juliana',
                    time: '11:00',
                    status: 'confirmado',
                    note: 'Paciente com quadro de Psicose, com risco de suicídio',
                    pacient_id: 15,
                    color: '#88f'
                }, 
                {
                    name: 'Consulta com Marieta',
                    time: '15:00',
                    status: 'a confirmar',
                    note: 'Paciente com quadro de Psicose, com delirios de perseguição',
                    pacient_id: 16,
                    color: '#88f'
                },
                {
                    name: 'Consulta com Claire',
                    time: '18:00',
                    status: 'confirmado',
                    note: 'Paciente com quadro de TOC',
                    pacient_id: 17,
                    color: '#ff0'
                },
                {
                    name: 'Consulta com Eliana',
                    time: '19:00',
                    status: 'confirmado',
                    note: 'Paciente com quadro de TOC',
                    pacient_id: 18,
                    color: '#ff0'
                }
            ]
        }

        
        let dataObject = {};
        APIData && Object.keys(APIData).map((key) => {
            dataObject[key] = {
                customStyles: {
                    container: {
                        backgroundColor: 'white',
                        elevation: 2
                    },
                    text: {
                        color: 'blue'
                    }
                }
            }
        })
        
        setApiData(APIData);
        setData(dataObject as AgendaEntry);
    }

    return (
        <Background style={{alignItems: 'center', justifyContent: 'center'}}>
                <Header
                    titlePage={"Agenda"}
                    fontSize={28}
                    color="#8B97FF"
                    buttonLeft={{
                        isIcon: false,
                        label: "Voltar",
                        onPress: () => navigation.goBack(),
                    }}
                />
            <KeyboardAwareScrollView nestedScrollEnabled={true} contentContainerStyle={{alignItems: "center",  width: '100%', paddingBottom: '15%'}}>
                {loading ? <Loading transparent/> : (
                    <>
                        <View style={styles.contentPrimary}>
                            <Calendar
                                horizontal={true}
                                pagingEnabled={true}
                                style={styles.calendar}
                                theme={calendarTheme as any}
                                items={data}
                                markingType={'custom'}
                                markedDates={{...data, [`${selectedDay.dateString}`]: {selected: true, selectedColor: '#8B97FF55'}}}
                                onDayPress={(day) => { setSelectedDay(day);}}
                            />
                        </View>
                        <View style={styles.contentSecondary}>
                            {
                                apiData[selectedDay.dateString] ? (
                                    <>
                                        <Text style={styles.titleAppointments}>Agendamentos de {new Date(selectedDay.dateString).toLocaleDateString('pt-BR')}</Text>
                                            {
                                                apiData[selectedDay.dateString] && apiData[selectedDay.dateString].map((item: appointmentInterface, index: number) => (
                                                        <AppointmentItem key={index} item={item}/>
                                                    )
                                                )
                                            }
                                    </>
                                ) : (
                                    <Text style={styles.titleAppointments}>Nenhum agendamento</Text>
                                )
                            }
                            <TouchableOpacity style={styles.buttonAddAppointment} onPress={() => {}}>
                                <Ionicons name="add-circle-outline" size={24} color="#8B97FF88" />
                                <Text style={styles.textAddAppointment}>Adicionar agendamento</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </KeyboardAwareScrollView>
        </Background>
    );
};

const calendarTheme = {
    backgroundColor: '#ffffff88',
    calendarBackground: '#ffffff88',
    textSectionTitleColor: '#b6c1cd',
    textSectionTitleDisabledColor: '#d9e1e8',
    selectedDayBackgroundColor: '#00adf5',
    selectedDayTextColor: '#ffffff',
    todayTextColor: '#00adf5',
    dayTextColor: '#8B97FF',
    textDisabledColor: '#8B97FF55',
    dotColor: '#00adf5',
    selectedDotColor: '#ffffff',
    arrowColor: 'orange',
    disabledArrowColor: '#d9e1e8',
    monthTextColor: '#fff',
    indicatorColor: 'blue',
    textDayFontFamily: 'monospace',
    textMonthFontFamily: 'monospace',
    textDayHeaderFontFamily: 'monospace',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
}

const styles = StyleSheet.create({
    contentPrimary: {
        width: '90%',
        minWidth: '90%',
        borderRadius: 10,
        height: 'auto',
        alignItems: "center",
        paddingBottom: 10,
        backgroundColor: "#8B97FF22",
    },
    calendar: {
        width: 350,
        minWidth: '90%',
        height: 'auto',
    },
    contentSecondary: {
        width: "85%",
        minWidth: '90%',
        alignItems: "center",
        justifyContent: "center",
        height: 'auto',
        marginTop: 15,
        backgroundColor: "#8B97FF22",
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    titleAppointments: {
        color: "#8B97FF",
        fontSize: 22,
        fontFamily: "Inter_600SemiBold",
        textAlignVertical: "center",
        textAlign: "center",
    },
    buttonAddAppointment: {
        flexDirection: "row",
        minWidth: '90%',
        width: '100%',
        height: 60,
        backgroundColor: '#0000',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 0.8,
        borderColor: '#8B97FF22',
    },
    textAddAppointment: {
        color: '#8B97FF88',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 10,
    },

});

export default CalendarComponent;

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
import { useIsFocused } from "@react-navigation/core";
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
import localization from '../../services/calendarLocalization';
import appointmentInterface from '../../interfaces/appointmentInterface';
import AppointmentItem from '../../components/AppointmentItem/AppointmentItem';
import { Ionicons } from '@expo/vector-icons';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';



localization();

type propsScreens = DrawerNavigationProp<RouteStackParamList>;

const CalendarComponent: React.FC = () => {
    const {theme} = useContext(ThemeContext);
    const styles = React.useMemo(
      () => createStyles(theme),
      [theme]
    );

    let isFocused = useIsFocused();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => {
        setMounted(false);
        navigation.removeListener("focus", () => {});
      };
    }, []);

    const navigation = useNavigation<propsScreens>();

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [apiData, setApiData] = useState({});
    const [selectedDay, setSelectedDay] = useState<DateData>({dateString: '0000-00-00'} as DateData);

    useEffect(() => {
        updateData();
    }, [isFocused]);

    function updateData() {
        setLoading(true);
        api.get('/appointment/list/' + user._id).then(response => {            
            const APIData = response.data.appointments;            
            let dataObject = {};
            APIData && Object.keys(APIData).map((key) => {
                dataObject[String(key).split('-').reverse().join('-')] = {
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
            setLoading(false);
        }).catch(error => {
            console.log(error);
            console.log(error.response.data);
            setLoading(false);
        });

    }

    function goToAppointment(item?: appointmentInterface) {
        if (user.role === "professional") {
            navigation.navigate('appointment', {
                date: selectedDay.dateString,
                item: item
            });
        }
    }

    return (
        <Background style={{alignItems: 'center', justifyContent: 'center'}}>
                <Header
                    titlePage={"Agenda"}
                    fontSize={28}
                    color={theme.primaryVariant}
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
                                theme={theme.calendarTheme as any}
                                items={data}
                                markingType={'custom'}
                                markedDates={{...data, [`${selectedDay.dateString}`]: {selected: true, selectedColor: theme.primaryVariant55}}}
                                onDayPress={(day) => { setSelectedDay(day);}}
                            />
                        </View>
                        <View style={styles.contentSecondary}>
                            {
                                apiData && apiData[selectedDay?.dateString.split('-').reverse().join('-')] ? (
                                    <>
                                        <Text style={styles.titleAppointments}>Agendamentos de {new Date(selectedDay.dateString).toLocaleDateString('pt-BR')}</Text>
                                            {
                                                apiData[selectedDay.dateString.split('-').reverse().join('-')] && apiData[selectedDay.dateString.split('-').reverse().join('-')].map((item: appointmentInterface, index: number) => (
                                                        <AppointmentItem key={index} item={item} updateData={updateData} goToAppointment={goToAppointment} manage={user.role === "professional" ? true : false} date={selectedDay.dateString}/>
                                                    )
                                                )
                                            }
                                    </>
                                ) : (
                                    <Text style={styles.titleAppointments}>Nenhum agendamento</Text>
                                )
                            }
                            { user.role === "professional" && <TouchableOpacity style={styles.buttonAddAppointment} onPress={() => goToAppointment()}>
                                <Ionicons name="add-circle-outline" size={24} color={theme.primaryVariant88} />
                                <Text style={styles.textAddAppointment}>Adicionar agendamento</Text>
                            </TouchableOpacity>}
                        </View>
                    </>
                )}
            </KeyboardAwareScrollView>
        </Background>
    );
};

const createStyles = (theme :Theme) => {
    const styles = StyleSheet.create({
        contentPrimary: {
            width: '90%',
            minWidth: '90%',
            borderRadius: 10,
            height: 'auto',
            alignItems: "center",
            paddingBottom: 10,
            backgroundColor: theme.calendarBackground,
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
            backgroundColor: theme.primaryVariant22,
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 10,
        },
        titleAppointments: {
            color: theme.primaryVariant,
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
            backgroundColor: 'transparent',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: theme.primaryVariant22,
        },
        textAddAppointment: {
            color: theme.primaryVariant88,
            fontSize: 16,
            fontFamily: 'Inter_600SemiBold',
            marginLeft: 10,
        },

    });
    return styles;
};

export default CalendarComponent;

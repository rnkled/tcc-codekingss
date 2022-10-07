import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { RouteStackParamList } from '../../routes';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Background from '../../components/Background';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import { MaterialIcons } from '@expo/vector-icons';
import localization from '../../services/calendarLocalization';
import {Calendar} from 'react-native-calendars';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

// import { Container } from './styles';

type propsScreens = NativeStackNavigationProp<RouteStackParamList>


const NewAppointment: React.FC = () => {

  const navigation = useNavigation<propsScreens>();
  const route = useRoute<RouteProp<RouteStackParamList, "newAppointment">>()
  var routeUser_id = route.params.id_usuario;
  var routeDate = route.params.date === '0000-00-00' ? new Date(Date.now()) : new Date(route.params.date);

  const [date, setDate] = useState(routeDate);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date ? date : new Date(Date.now()),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function getTime() {

    function padNumber(number : Number) {
      if (number < 10) {
         return String('0' + number);
      } else {
        return String(number);
      }
    }

    let h = date.getHours();
    var m = date.getMinutes();
    return padNumber(h) + ' : ' + padNumber(m)
  }

function getDate() {
  let d = date.getDate();
  let m = date.getMonth() + 1;
  let y = date.getFullYear();
  return d + '/' + m + '/' + y
}
    
  return <Background>
    <KeyboardAwareScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Header
        titlePage={"Novo Agendamento"}
        fontSize={22}
        color="#8B97FF"
        buttonLeft={{
          isIcon: false,
          label: "Voltar",
          onPress: () => navigation.goBack(),
        }}
      />
      <View style={styles.contentPrimary}>
        <View style={styles.frame}>
            <View style={styles.dateBox}>
                <Text style={styles.boxTitle}>Data e Hora</Text>
            </View>
          <TouchableOpacity style={styles.dateButton} onPress={() => showDatepicker()}>
            <Text style={styles.boxLegend}>Data: </Text>
            <Text style={styles.boxMarker}>{getDate()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateButton} onPress={() => showTimepicker()}>
            <Text style={styles.boxLegend}>Hora: </Text>
            <Text style={styles.boxMarker}>{getTime()}</Text>
          </TouchableOpacity>
          </View>
      </View>
    </KeyboardAwareScrollView>
  </Background>;
}

const styles = StyleSheet.create({
  contentPrimary: {
    width: "90%",
    borderRadius: 10,
    height: 'auto',
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#8B97FF22",
    padding: 10,
  },
  frame: {
    width: "100%",
    height: "auto",
    backgroundColor: "#8B97FF1f",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  dateBox: {
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderBottomColor: "#8B97FF",
    borderBottomWidth: 0.8,
  },
  boxTitle: {
    color: "#8B97FF",
    fontSize: 18,
    paddingBottom: 5,
    alignItems: "center",
  },
  boxLegend: {
    width: 50,
    color: "#8B97FF",
    fontSize: 18,
    paddingBottom: 5,
    alignItems: "center",
  },
  boxMarker: {
    color: "#0C0150",
    fontSize: 15,
    paddingBottom: 5,
    fontWeight: "bold",
    borderRadius: 10,
    borderColor: "#8B97FF",
    borderWidth: 0.8,
    paddingHorizontal: 15,
    textAlignVertical: "center",
    paddingVertical: 3,
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "#8B97FF",
  },
  calendar: {
    width: 315,
    minWidth: '90%',
    height: 'auto',
  },
  dateButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 10,
    alignItems: "center",
    marginTop: 20,
  },
});
export default NewAppointment;
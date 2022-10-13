import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, LogBox, Alert } from 'react-native';
import { RouteStackParamList } from '../../routes';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Background from '../../components/Background';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import localization from '../../services/calendarLocalization';
import {Calendar} from 'react-native-calendars';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import SearchCard from '../../components/SearchCard';
import UserInterface from '../../interfaces/userInterface';
import SearchUserComponent from '../../components/SearchUserComponent';
import SearchCardLite from '../../components/SearchCardLite';
import TextInputMaterial from '../../components/TextInputMaterial';
import TextAreaMaterial from '../../components/TextAreaMaterial';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../../components/Button';
import api from '../../services/api';
DropDownPicker.setTheme("DARK");
import AuthContext from "../../context/AuthContext";
import Loading from '../../components/Loading';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';


type propsScreens = NativeStackNavigationProp<RouteStackParamList>


const Appointment: React.FC = () => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme]
  );

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);
  }, [])

  const navigation = useNavigation<propsScreens>();
  const route = useRoute<RouteProp<RouteStackParamList, "appointment">>()
  var routeItem = route.params.item ? route.params.item : undefined;
  var routeDate = route.params.date === '0000-00-00' ? new Date(Date.now()) : new Date(route.params.date);

  const { user } = useContext(AuthContext);
  
  const [date, setDate] = useState<Date>(routeDate);
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
  const [professionalID, setProfessionalID] = useState<string | null>(user._id);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [openColorPicker, setOpenColorPicker] = useState<boolean>(false);
  const [colorPickerItems, setColorPickerItems] = useState([
    {label: 'Vermelho', value: theme.appoimentColor1, icon: () => <View style={{width: 18, height: 18, borderRadius: 4, backgroundColor: theme.appoimentColor1}} />},
    {label: 'Azul', value: theme.appoimentColor2, icon: () => <View style={{width: 18, height: 18, borderRadius: 4, backgroundColor: theme.appoimentColor2}} />},
    {label: 'Verde', value: theme.appoimentColor3, icon: () => <View style={{width: 18, height: 18, borderRadius: 4, backgroundColor: theme.appoimentColor3}} />},
    {label: 'Amarelo', value: theme.appoimentColor4, icon: () => <View style={{width: 18, height: 18, borderRadius: 4, backgroundColor: theme.appoimentColor4}} />},
    {label: 'Vazio', value: null, icon: () => <View style={{width: 18, height: 18, borderRadius: 4, backgroundColor: 'transparent'}} />},
  ]);


  const [title, setTitle] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  


  useEffect(() => {

    async function getUserData() {
      setLoadingUser(true);
      api.get(`/user/list/${routeItem.user_id}`).then(response => {        
        setSelectedUser(response.data[0]);
        setLoadingUser(false);
      }).catch(err => {
        setLoadingUser(false);
        console.log(err)
      })
    }
    
    if(routeItem && routeItem !== null || routeItem !== undefined || !!routeItem) {      
      setTitle(routeItem.name);
      setStatus(routeItem.status);
      setDescription(routeItem.note);
      setColor(routeItem.color);
      routeDate.setHours(parseInt(routeItem.time.split(':')[0]))
      routeDate.setMinutes(parseInt(routeItem.time.split(':')[1]))
      setDate(new Date(routeDate));
      getUserData();
    }
  }, [routeItem])

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date ? date : new Date(Date.now()),
      onChange: onChangeDate,
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

  function padNumber(number : Number) {
    if (number < 10) {
       return String('0' + number);
    } else {
      return String(number);
    }
  }

  function getTime() {
    let h = date.getHours();
    var m = date.getMinutes();
    return padNumber(h) + ':' + padNumber(m)
  }

  function getDate() {
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    return padNumber(d) + '/' + padNumber(m) + '/' + padNumber(y)
  }

  function check(label, value) {
    if (value == '' || value == undefined || value == null) {
      Alert.alert('Atenção!', `Por favor, preencha o campo ${label} para finalizar o processo!`);
      return false;
    }
  }

  function handleSave() {
    setLoadingSave(true);

    if (check('Título', title) == false) {
      setLoadingSave(false);
      return;
    }

    let data = {
      "professionalId": professionalID,
      "appointment": {
          "name": title,
          "time": getTime(),
          "status": status,
          "note": description,
          "user_id": selectedUser ? selectedUser._id : null,
          "color": color,
    },
      "date": getDate().replace(/\//g, '-')
    }
    api.post("/appointment/create/", data).then((response) => {
      setLoadingSave(false);
      Alert.alert("Sucesso", "Novo Agendamento feito com sucesso!",
      [
        { text: "OK", onPress: () => navigation.navigate('calendar') }
      ])
    }).catch((error) => {
      setLoadingSave(false);
      console.log(error.response.data);
      Alert.alert("Erro", "Erro ao salvar o Agendamento!");
    });

  }
    
  return <Background>
    <KeyboardAwareScrollView contentContainerStyle={{ alignItems: "center" }} nestedScrollEnabled={true} overScrollMode={'auto'}>
      <Header
        titlePage={"Novo Agendamento"}
        fontSize={22}
        color={theme.primaryVariant}
        buttonLeft={{
          isIcon: false,
          label: "Voltar",
          onPress: () => navigation.goBack(),
        }}
      />
      <View style={styles.contentPrimary}>
        <View style={styles.frame}>
            <View style={styles.titleBox}>
                <Text style={styles.boxTitle}>Data e Hora</Text>
            </View>
          <TouchableOpacity style={styles.dateButton} onPress={() => showDatepicker()}>
            <Text style={styles.boxDateLegend}>Data: </Text>
            <Text style={styles.boxMarker}>{getDate()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dateButton} onPress={() => showTimepicker()}>
            <Text style={styles.boxDateLegend}>Hora: </Text>
            <Text style={styles.boxMarker}>{getTime()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.frame}>
          <View style={[styles.titleBox]}>
              <Text style={styles.boxTitle}>Paciente</Text>
          </View>
          {
            loadingUser ? 
              <Loading transparent={true} containerStyle={{height: 50, marginTop: 10}}/> :
              (showSearch ? 
                <SearchUserComponent setValue={setSelectedUser} value={selectedUser} setShow={setShowSearch}/> : 
                (selectedUser ? 
                <SearchCardLite data={selectedUser} marginTop={10} type_user={'user'} altFunction={() => setShowSearch(true)}/> :
                <TouchableOpacity style={styles.addPacienteBox} onPress={() => setShowSearch(true)}>
                  <Ionicons name="add-circle-outline" size={24} color={theme.primaryVariant} />
                  <Text style={styles.boxLegend}>Selecione um paciente</Text>
                </TouchableOpacity>
              )
            )
          }
        </View>
        <View style={styles.frame}>
          <View style={[styles.titleBox]}>
              <Text style={styles.boxTitle}>Informações</Text>
          </View>
          <TextInputMaterial
              value={title}
              setValue={setTitle}
              label="Titulo"
              containerStyle={styles.inputMaterial}
              textColor={theme.textVariant}
              baseColor={theme.primaryVariant}
          />
          <TextInputMaterial
              value={status}
              setValue={setStatus}
              label="Situação"
              containerStyle={styles.inputMaterial}
              textColor={theme.textVariant}
              baseColor={theme.primaryVariant}
          />
          <DropDownPicker
            style={styles.inputDropDown}
            open={openColorPicker}
            value={color}
            items={colorPickerItems}
            setOpen={setOpenColorPicker}
            setValue={setColor}
            setItems={setColorPickerItems}
            dropDownContainerStyle={styles.dropDownContainer}
            listItemLabelStyle={{color: theme.primaryVariant}}
            labelProps={{style: {color: color ? theme.textVariant : theme.primaryVariant, marginLeft: 9, fontSize: 18}}}
            placeholder="Selecione uma cor"
            hideSelectedItemIcon={false}
            dropDownDirection="TOP"
          />
          <TextAreaMaterial
              value={description}
              setValue={setDescription}
              label="Descrição"
              containerStyle={styles.inputAreaMaterial}
              textColor={theme.textVariant}
              baseColor={theme.primaryVariant}
          />
        </View>
        <Button label="Salvar" onPress={handleSave} loading={loadingSave} containerStyle={{marginVertical: 5}}/>
      </View>
    </KeyboardAwareScrollView>
  </Background>;
}

const createStyles = (theme :Theme) => {
  const styles = StyleSheet.create({
    contentPrimary: {
      width: "90%",
      borderRadius: 10,
      height: 'auto',
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.primaryVariant22,
      padding: 10,
    },
    frame: {
      width: "100%",
      height: "auto",
      backgroundColor: theme.primaryVariant22,
      borderRadius: 10,
      marginTop: 10,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    titleBox: {
      borderRadius: 10,
      justifyContent: "space-between",
      flexDirection: "row",
      paddingHorizontal: 10,
      borderBottomColor: theme.primaryVariant,
      borderBottomWidth: 0.8,
    },
    boxTitle: {
      color: theme.primaryVariant,
      fontSize: 18,
      paddingBottom: 5,
      alignItems: "center",
    },
    boxLegend: {
      color: theme.primaryVariant,
      fontSize: 18,
      paddingBottom: 3,
      marginLeft: 5,
      alignItems: "center",
    },
    boxDateLegend: {
      width: 50,
      color: theme.primaryVariant,
      fontSize: 18,
      paddingBottom: 5,
      alignItems: "center",
    },
    boxMarker: {
      color: theme.appointmentTimeLegend,
      fontSize: 15,
      paddingBottom: 5,
      fontWeight: "bold",
      borderRadius: 10,
      borderColor: theme.primaryVariant,
      borderWidth: 0.8,
      paddingHorizontal: 15,
      textAlignVertical: "center",
      paddingVertical: 3,
      alignItems: "center",
      marginLeft: 10,
      backgroundColor: theme.primaryVariant,
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
    addPacienteBox: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderColor: theme.primaryVariant,
      borderWidth: 0.8,
      marginTop: 10,
    },
    inputMaterial: {
      backgroundColor: theme.primaryVariant22,
      height: 50,
    },
    inputAreaMaterial: {
      backgroundColor: theme.primaryVariant22,
    },
    inputDropDown: {
      backgroundColor: theme.primaryVariant22,
      height: 50,
      marginTop: 10,
      borderColor: "transparent",
    },
    dropDownContainer: {
      backgroundColor: theme.appoimentColorPicker,
      borderColor: theme.borderVariant,
    },
  });
  return styles;
}
export default Appointment;
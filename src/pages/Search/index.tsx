import React, {useState} from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import { AntDesign } from '@expo/vector-icons';
import SearchCard from '../../components/SearchCard';
import { DataProfileProfessional } from '../../components/NavComponent';
import ImageProfissional from "../../assets/th.jpg"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';

type propsScreens = NativeStackNavigationProp<RouteStackParamList>

const Search: React.FC = () => {

  const navigation = useNavigation<propsScreens>();
  
  const [searchTerm, setSearchTerm] = useState('');
  const data = [
    {
      id: '1',
      address: "Av. do Café, 2998, Vila Tibério, 14050-220",
      city: "Ribeirão Preto - SP",
      clinicName: "Clínica Pense bem",
      college: "Universidade Paulista",
      course: "Neuropsicologia",
      skills: "Capaz de dialogar profundamente sobre a vida dos pacientes que estão a sua procura para melhor entende-lo as suas necessidades e soluciona-los os seus problemas!",
      when: "10/12/2021",
      name: "Victoria Robertson",
      legend: "Seja você a maior inspiração do mundo!",
      rate: 4,
      urlImage: ImageProfissional
    } as DataProfileProfessional,
    {
      id: '2',
      address: "Av. do Café, 2998, Vila Tibério, 14050-220",
      city: "Ribeirão Preto - SP",
      clinicName: "Clínica Pense bem",
      college: "Universidade Paulista",
      course: "Neuropsicologia",
      skills: "Capaz de dialogar profundamente sobre a vida dos pacientes que estão a sua procura para melhor entende-lo as suas necessidades e soluciona-los os seus problemas!",
      when: "10/12/2021",
      name: "Annalise Robertson",
      legend: "Seja você a maior inspiração do mundo!",
      rate: 4,
      urlImage: ImageProfissional
    } as DataProfileProfessional,
    {
      id: '3',
      address: "Av. do Café, 2998, Vila Tibério, 14050-220",
      city: "Ribeirão Preto - SP",
      clinicName: "Clínica Pense bem",
      college: "Universidade Paulista",
      course: "Neuropsicologia",
      skills: "Capaz de dialogar profundamente sobre a vida dos pacientes que estão a sua procura para melhor entende-lo as suas necessidades e soluciona-los os seus problemas!",
      when: "10/12/2021",
      name: "Maria Robertson",
      legend: "Seja você a maior inspiração do mundo!",
      rate: 4,
      urlImage: ImageProfissional
    } as DataProfileProfessional,
  ];

  function goToHome() {
    navigation.navigate('home.index');
  }
  

  return <Background>
    <View style={styles.container}>
    <Header
      titlePage={"Buscar"}
      fontSize={22}
      color={"#8B97FF"}
      buttonLeft={{
        label: 'Voltar',
        onPress: goToHome,
        isIcon: false,
        fontSize: 18
      }}
      buttonRight={{
        onPress: () => {},
        isIcon: true,
        icon: () => <AntDesign name="search1" size={28} color="#8B97FF" />,
      }}
    />
    <TextInput 
      style={styles.input}
      placeholder="Pesquisar"
      onChangeText={(text) => setSearchTerm(text)}
      value={searchTerm}
    />
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <SearchCard professionalData={item}/>}
        style={styles.list}
      />
    </View>

    </View>
  </Background>}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 45,
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listContainer: {
    width: "90%",
    height: "80%",
  },
  list: {
    width: "100%",
    marginTop: 20,
    flex: 1,
  },
})

export default Search;
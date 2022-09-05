import React, {useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import { AntDesign } from '@expo/vector-icons';
import SearchCard from '../../components/SearchCard';
import ImageProfissional from "../../assets/th.jpg"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../routes';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Loading from '../../components/Loading';
import UserInterface from '../../interfaces/userInterface';

type propsScreens = NativeStackNavigationProp<RouteStackParamList>

const Search: React.FC = () => {

  const navigation = useNavigation<propsScreens>();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserInterface[]>([]);

  function goToHome() {
    navigation.navigate('home');
  }

  useEffect(() => {
    async function getFirstData() {
      await getData();
      setLoading(false);
    }
    setLoading(true);
    getFirstData();
  } , [])
  
  let refSearch = useRef<TextInput>(null);
  async function getData(){
    setLoading(true);
    refSearch.current?.blur();
    api.get(`/user/search/${searchTerm}?role=professional`).then(response => {
      setData(response.data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })
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
          onPress: getData,
          isIcon: true,
          icon: () => <AntDesign name="search1" size={28} color="#8B97FF" />,
        }}
      />
      <TextInput 
        style={styles.input}
        placeholder="Pesquisar"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
        onEndEditing={getData}
        ref={refSearch}
      />
      <View style={styles.listContainer}>
        {loading ? <Loading transparent={true}/> : 
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => <SearchCard dataProfessional={item}/>}
          style={styles.list}
        />}
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
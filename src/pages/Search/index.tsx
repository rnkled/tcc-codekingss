import React, {useState} from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Search: React.FC = () => {
  
  const [searchTerm, setSearchTerm] = useState('');

  const data = [
    {
      id: '1',
      name: 'John Doe',
      rating: 4.5,
      image: '',
      adress: 'Rua dois, nº 01',
    },
    { 
      id: '2',
      name: 'Joahna Doe',
      rating: 2.5,
      image: '',
      adress: 'Rua tres, nº 02',
    },
    {
      id: '3',
      name: 'Jane Doe',
      rating: 3.5,
      image: '',
      adress: 'Rua quatro, nº 04',
    }
  ];
  
  return <Background>
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
    <Header
      titlePage={"Buscar"}
      fontSize={22}
      color={"#8B97FF"}
      buttonLeft={{
        label: 'Voltar',
        onPress: () => {},
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
        renderItem={({item}) => <></>}
        style={styles.list}
      />
    </View>

    </KeyboardAwareScrollView>
  </Background>}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: "6%",
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
    backgroundColor: "#F00",
    flex: 1,
  },
})

export default Search;
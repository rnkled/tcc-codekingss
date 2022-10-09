import React, {useState, useRef, useEffect} from 'react';
import { View, StyleSheet, TextInput, FlatList, Text, TouchableOpacity, LogBox } from 'react-native';
import userInterface from '../../interfaces/userInterface';
import Loading from '../Loading';
import api from '../../services/api';
import SearchCardLite from '../SearchCardLite';



type CardPrams = {
    value: userInterface;
    setValue: React.Dispatch<React.SetStateAction<userInterface>>;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    marginTop?: number;
}


const SearchUserComponent = ({ value, setValue, setShow, marginTop } :CardPrams) => {

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<userInterface[]>([]);
  let refSearch = useRef<TextInput>(null);

  useEffect(() => {
    async function getFirstData() {
      await getData();
      setLoading(false);
    }
    setLoading(true);
    getFirstData();
  } , [])
  
  async function getData(){
    setLoading(true);
    refSearch.current?.blur();
    api.get(`/user/search/${searchTerm}?role=user`).then(response => {
      setData(response.data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })
  }
  
  function setUser(item) {
    setValue(item);
    setShow(false);
  }
    
  
  return (
    <View style={[styles.container, marginTop && {marginTop: marginTop}]}>
      
      <TextInput 
        style={styles.input}
        placeholder="Digite o Nome ou CPF do usuário"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
        onEndEditing={getData}
        ref={refSearch}
      />
      <View style={styles.listContainer}>
        {loading ? <Loading transparent={true}/> : 
        <FlatList
          data={data}
          nestedScrollEnabled = {true}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => <SearchCardLite data={item} type_user={'user'} altFunction={() => setUser(item)}/>}
          style={styles.list}
        />}
        <TouchableOpacity onPress={() => {setUser(null)}} style={styles.button}>
          <Text style={styles.buttonText}>Deixar Vazio</Text>  
        </TouchableOpacity>
      </View>
    </View>
  )
}
  
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    maxHeight: 320,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 35,
    marginTop: 20,
    marginBottom: 10,
    width: "90%",
    backgroundColor: "#8B97FF",
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  listContainer: {
    width: "100%",
    height: "80%",
    alignItems: "flex-end",
  },
  list: {
    width: "100%",
    marginTop: 10,
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
    color: "#8B97FF",
    bottom: 1.5,
  },
  button: {
    width: "40%",
    height: 40,
    marginTop: "3%",
    backgroundColor: "#8B97FF00",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#8B97FF",
    flexDirection: "row",
    position: "relative",
  },
})
export default SearchUserComponent;
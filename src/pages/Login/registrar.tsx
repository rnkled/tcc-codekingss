import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { TextInput } from 'react-native-material-textinput';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const image = { uri: "https://data.whicdn.com/images/270290896/original.gif" };

const Registrar = () => {

  type Nav = {
    navigate: (value: string) => void;
  }
  const navigation = useNavigation<Nav>();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState(''); 
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaConfirma, setMostrarSenhaConfirma] = useState(false);

  function irParaLogin() {
    navigation.navigate('login.index');
  }

  return (
  <ImageBackground source={image} resizeMode="cover" style={{flex: 1, justifyContent: "center", }} blurRadius={90} >
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
      >
          <View style={styles.header}>
            <MaterialCommunityIcons name="format-float-left" size={30} color="#8B97FF" />
            <Text style={styles.textoHeader}>Cadastro</Text>
            <TouchableOpacity onPress={irParaLogin}>
              <Text style={[styles.textoAzul, {fontSize: 20}]}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <TextInput
              label="Nome"
              value={nome}
              setValue={setNome}
            />
            <TextInput
              label={"E-mail"} 
              value={email} 
              setValue={setEmail}
            />
            <TextInput
              label={"Senha"} 
              value={senha} 
              setValue={setSenha} 
              secure={true}
            />
            <TextInput
              label="Confirme sua senha"
              value={senhaConfirma}
              setValue={setSenhaConfirma} 
              secure={true}
            />
          </View>
          <View style={styles.footer}>
            <Button label={"Cadastrar"} onPress={() => {}}/>
          </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  </ImageBackground>);
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    // backgroundColor: "#0C0150",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: '8%',
    paddingTop: '8%',
  },
  header: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-evenly',
  },
  textoHeader: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
    width: "90%",
    textAlign: "center",
  },
  form: {
    width: 350,
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    marginTop: "5%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#0C0150",
  },
  mostrarSenha: {
    position: "relative",
    width: "100%",
  },
  textoAzul: {
    fontSize: 15,
    color: "#8B97FF",
    marginTop: "3%",
  },
  footer: {
    position: "relative",
    bottom: 0,
    alignItems: "center",
    marginBottom: "5%",
  },
  botao: {
    width: 350,
    height: 50,
    marginTop: "5%",
    backgroundColor: "#8B97FF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#0C0150",
  },
  textoBotao: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0C0150",
  },
});


export default Registrar;
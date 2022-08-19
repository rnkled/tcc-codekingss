import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { TextInput } from 'react-native-material-textinput';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import InputText from '../../components/InputText';

const Login = () => {

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function irParaRegistrar() {
    navigation.navigate('login.create');
  }


  return (
  <KeyboardAwareScrollView contentContainerStyle={styles.container}>
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
    >
      <Header titlePage={"Entrar"} />
      <View style={styles.form}>
        {/* <TextInput
          value={email}
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setEmail}
        /> */}
        {/* <TextInput
          value={senha}
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!mostrarSenha}
          onChangeText={setSenha}
        /> */}
        <InputText label={"E-mail"} keyboardType="name-phone-pad"  />
        <InputText label={"Senha"}  keyboardType="name-phone-pad" secureTextEntry={true}/>
        <TouchableOpacity onPress={irParaRegistrar}>
          <Text style={styles.textoAzul}>Não possui uma conta? Crie uma agora.</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.botao} onPress={() => {}}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.textoAzul}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAwareScrollView>);
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#0C0150",
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
  textoHeader: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
  },
  form: {
    width: 350,
    height: "70%",
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
    height: "30%",
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


export default Login;
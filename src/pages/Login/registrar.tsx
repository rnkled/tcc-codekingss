import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { TextInput } from 'react-native-material-textinput';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Registrar = () => {

  const navigation = useNavigation();

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
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setNome}
        />
        <TextInput
          label="E-mail"
          value={email}
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setEmail}
        />
        <TextInput
          label="Senha"
          value={senha}
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!mostrarSenha}
          onChangeText={setSenha}
        />
        <TextInput
          label="Senha"
          value={senhaConfirma}
          style={styles.input}
          placeholder="Confirme sua Senha"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!mostrarSenhaConfirma}
          onChangeText={setSenhaConfirma}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.botao} onPress={() => {}}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
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


export default Registrar;
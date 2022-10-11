import React, {useState, useContext} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import { TextInput } from 'react-native-material-textinput';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import TextInputMaterial from '../../components/TextInputMaterial';
import Button from '../../components/Button';
import Background from '../../components/Background';
import { Ionicons } from '@expo/vector-icons';
import AuthContext from "../../context/AuthContext";
import Loading from '../../components/Loading';
import ThemeContext from '../../context/ThemeContext';
import { Theme } from '../../interfaces/themeInterface';

const Login = () => {
  const {theme} = useContext(ThemeContext);
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme]
  );
  type Nav = {
    navigate: (value: string) => void;
  }
  

  const {signIn, loading} =  useContext(AuthContext);
  const navigation = useNavigation<Nav>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  function irParaRegistrar() {
    navigation.navigate('login.create');
  }

  async function handleLogin() {
    if (!email || email == '') {
      Alert.alert('Erro', 'Preencha o campo de e-mail');
      return;
    }

    if (!password || password == '') {
      Alert.alert('Erro', 'Preencha o campo de senha');
      return;
    }
    setLoadingLogin(true);
    let result = await signIn(email, password);

    if (!result) {
      setEmail('');
      setPassword('');
      setLoadingLogin(false);
    }
  }

  return ( 
    loading ? 
      <Loading /> 
    : 
      (<Background style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.contentTitleIconPage}>
            <Ionicons name="person-circle-outline" size={120} color={theme.primaryVariant} />
            <Text style={styles.textoHeader}>Acesse sua Conta:</Text>
          </View>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.form}>
            <TextInputMaterial label={"E-mail"} value={email} setValue={setEmail} />
            <TextInputMaterial label={"Senha"} value={password} setValue={setPassword} secure={true}/>
            <TouchableOpacity onPress={irParaRegistrar}>
              <Text style={styles.textoAzul}>Não possui uma conta? Crie uma agora.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Button label={"Entrar"} onPress={handleLogin} loading={loadingLogin}/>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.textoAzul}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Background>));
}
const createStyles = (theme :Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    scrollViewContainer: {
      width: "100%",
      height: "100%",
      // justifyContent: "flex-start",
      // alignItems: "center",
      paddingBottom: '8%',
      paddingTop: '8%',
    },
    textoHeader: {
      fontSize: 34,
      fontWeight: "bold",
      color: theme.textVariant,
    },
    form: {
      width: 350,
      height: "50%",
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
      backgroundColor: theme.backgroundVariant,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.secondary,
    },
    mostrarSenha: {
      position: "relative",
      width: "100%",
    },
    textoAzul: {
      fontSize: 15,
      color: theme.primaryVariant,
      marginTop: "3%",
    },
    footer: {
      height: "30%",
      alignItems: "center",
      marginBottom: "5%",
    },

    contentTitleIconPage: {
      width: "100%", 
      height: "auto", 
      justifyContent: "center", 
      alignItems: "center", 
      paddingTop: 10,
    }
  });
  return styles;
}

export default Login;
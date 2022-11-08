import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import { TextInput } from 'react-native-material-textinput';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TextInputMaterial from "../../components/TextInputMaterial";
import Button from "../../components/Button";
import Background from "../../components/Background";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
import { Theme } from "../../interfaces/themeInterface";

const Registrar = () => {
  const { theme } = useContext(ThemeContext);
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  type Nav = {
    navigate: (value: string) => void;
  };
  const navigation = useNavigation<Nav>();

  const { signIn } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirma, setSenhaConfirma] = useState("");

  function goToLogin() {
    cleanFields();
    navigation.navigate("login.index");
  }

  function register() {
    setLoading(true);
    api
      .post("/user/create", {
        name: nome,
        email: email,
        password: senha,
        role: "user",
      })
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        signIn(email, senha);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.data);
        Alert.alert("Erro", "Erro ao cadastrar usuário!");
      });
  }

  function cleanFields() {
    setNome("");
    setEmail("");
    setSenha("");
    setSenhaConfirma("");
  }

  return (
    <Background style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.header}>
            <Text style={styles.textoHeader}>Cadastro</Text>
          </View>
          <Text style={[styles.textoAzul, { fontSize: 20 }]}>
            Primeira vez por aqui? Crie uma conta.
          </Text>
          <View style={styles.form}>
            <TextInputMaterial label="Nome" value={nome} setValue={setNome} />
            <TextInputMaterial
              label={"E-mail"}
              value={email}
              setValue={(value) => {
                setEmail(
                  value.toString().replace(/\s/g, "").toLocaleLowerCase()
                );
              }}
            />
            <TextInputMaterial
              label={"Senha"}
              value={senha}
              setValue={setSenha}
              secure={true}
            />
            <TextInputMaterial
              label="Confirme sua senha"
              value={senhaConfirma}
              setValue={setSenhaConfirma}
              secure={true}
            />
          </View>
          <View style={styles.footer}>
            <Button label={"Cadastrar"} onPress={register} loading={loading} />
            <TouchableOpacity onPress={goToLogin}>
              <Text style={[styles.textoAzul, { fontSize: 20 }]}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Background>
  );
};

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      paddingHorizontal: 10,
      justifyContent: "center",
    },
    scrollViewContainer: {
      width: "100%",
      height: "100%",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingBottom: "8%",
      paddingTop: "8%",
    },
    header: {
      width: "80%",
      height: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    textoHeader: {
      fontSize: 38,
      fontWeight: "bold",
      color: theme.textVariant,
      width: "90%",
      textAlign: "center",
      fontFamily: "Inter_600SemiBold",
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
      backgroundColor: theme.textVariant,
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
      position: "relative",
      width: "100%",
      bottom: 0,
      alignItems: "center",
      marginBottom: "5%",
    },
    botao: {
      width: 350,
      height: 50,
      marginTop: "5%",
      backgroundColor: theme.primaryVariant,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
      borderWidth: 1,
      borderColor: theme.secondary,
    },
    textoBotao: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.secondary,
    },
  });
  return styles;
};

export default Registrar;

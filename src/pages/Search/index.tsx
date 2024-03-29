import React, { useState, useEffect, useRef, useContext } from "react";
import { View, TextInput, StyleSheet, FlatList } from "react-native";
import Background from "../../components/Background";
import Header from "../../components/Header";
import { AntDesign } from "@expo/vector-icons";
import SearchCard from "../../components/SearchCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteStackParamList } from "../../routes";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
import Loading from "../../components/Loading";
import UserInterface from "../../interfaces/userInterface";
import { Notifier, Easing } from "react-native-notifier";
import messaging from "@react-native-firebase/messaging";
import AuthContext from "../../context/AuthContext";
import ThemeContext from "../../context/ThemeContext";
import { Theme } from "../../interfaces/themeInterface";

type propsScreens = NativeStackNavigationProp<RouteStackParamList>;

const Search: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation<propsScreens>();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserInterface[]>([]);
  const { user } = useContext(AuthContext);
  let refSearch = useRef<TextInput>(null);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data.type && remoteMessage.data.type === "chat") {
        Notifier.showNotification({
          title: `${remoteMessage.notification.title}`,
          description: `${remoteMessage.notification.body}`,
          duration: 10000,
          showAnimationDuration: 800,
          translucentStatusBar: true,
          showEasing: Easing.bounce,
          onHidden: () => console.log("Hidden"),
          onPress: () => {
            if (user.role === "user") {
              navigation.navigate("chat", {
                id_professional: remoteMessage.data.id_professional,
                pushNotification: remoteMessage.data.tokenPush,
                id_pacient: undefined,
                name: remoteMessage.data.name,
              });
            }
            if (user.role === "admin") {
            }
          },
          hideOnPress: false,
          componentProps: {
            titleStyle: {
              color: theme.cardNotificationColor,
              fontSize: 18,
              fontFamily: "Inter_500Medium",
            },
            descriptionStyle: {
              fontFamily: "Inter_400Regular",
              color: theme.cardNotificationColor,
            },
            containerStyle: {
              backgroundColor: theme.cardNotificationBackground,
            },
          },
        });
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    async function getFirstData() {
      await getData();
      setLoading(false);
    }
    setLoading(true);
    getFirstData();
  }, []);

  function goToHome() {
    navigation.navigate("home");
  }
  async function getData() {
    setLoading(true);
    refSearch.current?.blur();
    api
      .get(`/user/search/${searchTerm}?role=professional`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <Background>
      <View style={styles.container}>
        <Header
          titlePage={"Buscar"}
          fontSize={22}
          color={theme.primaryVariant}
          buttonLeft={{
            label: "Voltar",
            onPress: goToHome,
            isIcon: false,
            fontSize: 18,
          }}
          buttonRight={{
            onPress: getData,
            isIcon: true,
            icon: () => (
              <AntDesign
                name="search1"
                size={28}
                color={theme.primaryVariant}
              />
            ),
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
          {loading ? (
            <Loading transparent={true} />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <SearchCard data={item} type_user={"professional"} />
              )}
              style={styles.list}
            />
          )}
        </View>
      </View>
    </Background>
  );
};

const createStyles = (theme: Theme) => {
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
      backgroundColor: theme.inputBackground,
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
  });
  return styles;
};

export default Search;

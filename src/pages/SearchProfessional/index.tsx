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
import database from "@react-native-firebase/database";
import AuthContext from "../../context/AuthContext";
import { ChatBoxProps } from "../../components/ChatBoxMessage";
import { Notifier, Easing } from "react-native-notifier";
import messaging from "@react-native-firebase/messaging";
import ThemeContext from "../../context/ThemeContext";
import { Theme } from "../../interfaces/themeInterface";
import Button from "../../components/Button";

type propsScreens = NativeStackNavigationProp<RouteStackParamList>;

const SearchProfessional: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<propsScreens>();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserInterface[]>([]);
  const [messagesExisting, setMessagesExisting] = useState<ChatBoxProps[]>([]);
  const { user } = useContext(AuthContext);

  function goToHome() {
    navigation.navigate("home");
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data.type && remoteMessage.data.type === "chat") {
        Notifier.showNotification({
          title: `${remoteMessage.notification.title}`,
          description: `${remoteMessage.notification.body}`,
          duration: 10000,
          showAnimationDuration: 800,
          showEasing: Easing.bounce,
          onHidden: () => console.log("Hidden"),
          onPress: () => {
            if (user.role === "professional") {
              navigation.navigate("chat", {
                id_pacient: remoteMessage.data.id_pacient,
                pushNotification: remoteMessage.data.tokenPush,
                id_professional: undefined,
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
    getDataMessages();
  }, []);

  useEffect(() => {
    async function getFirstData() {
      await getData();
      setLoading(false);
    }
    if (!!messagesExisting) {
      getFirstData();
    }
  }, [messagesExisting]);

  function getDataMessages() {
    database()
      .ref(`/chats/${user._id}`)
      .orderByChild("id")
      .on("value", (snapshot) => {
        var messagesArr = [];
        snapshot &&
          snapshot.forEach((childSnapshot) => {
            let objMessage = childSnapshot.val();
            messagesArr.push(objMessage.messages);
            if (childSnapshot.numChildren() <= 0) {
              return true;
            }
          });
        setMessagesExisting(messagesArr);
      });
  }

  let refSearch = useRef<TextInput>(null);
  async function getData() {
    setLoading(true);
    refSearch.current?.blur();
    api
      .get(`/user/search/${searchTerm}?role=user`)
      .then((response) => {
        var arrUsers = [];
        messagesExisting.map((item) => {
          response.data.map((user) => {
            var users = Object.keys(item).map((key) =>
              item[key].id_user === user._id && item[key].user_type
                ? user
                : false
            );
            var uniqueUsers = [...new Set(users)];
            uniqueUsers?.map((us) => {
              if (us !== false) {
                arrUsers.push(us);
              }
            });
          });
        });

        setData(arrUsers);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function goToComments() {
    navigation.navigate("commentsManagement");
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
          placeholderTextColor={theme.primaryVariant}
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
                <SearchCard type_user="user" data={item} />
              )}
              style={styles.list}
            />
          )}
        </View>
        <Button
          label="Gerenciar Comentários"
          onPress={goToComments}
          containerStyle={{ width: "95%" }}
        />
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
      height: "70%",
    },
    list: {
      width: "100%",
      marginTop: 20,
      flex: 1,
    },
  });
  return styles;
};

export default SearchProfessional;

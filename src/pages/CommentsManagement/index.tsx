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
import CardComment from "../../components/CardComment";
import commentaryInterface from "../../interfaces/commentaryInterface";
import { Text } from "react-native-elements";

type propsScreens = NativeStackNavigationProp<RouteStackParamList>;

const CommentsManagement: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const styles = React.useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<propsScreens>();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<commentaryInterface[]>([]);
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
    async function getFirstData() {
      await getData();
    }
    getFirstData();
  }, []);

  async function getData() {
    setLoading(true);
    api
      .get(`/comment/list/${user._id}/professionalId`)
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
          titlePage={"Comentários"}
          fontSize={22}
          color={theme.primaryVariant}
          buttonLeft={{
            label: "Voltar",
            onPress: goToHome,
            isIcon: false,
            fontSize: 18,
          }}
        />
        <View style={styles.listContainer}>
          {loading ? (
            <Loading transparent={true} />
          ) : data.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <CardComment
                  data={item}
                  updateData={getData}
                  managementMode={true}
                />
              )}
              style={styles.list}
            />
          ) : (
            !loading && (
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text>Nenhum comentário encontrado.</Text>
              </View>
            )
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
      width: "95%",
      height: "90%",
    },
    list: {
      width: "100%",
      marginTop: 20,
      flex: 1,
    },
  });
  return styles;
};

export default CommentsManagement;

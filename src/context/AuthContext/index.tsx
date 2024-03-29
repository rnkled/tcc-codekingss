import { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import * as auth from "../../services/auth";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";
import userInterface from "../../interfaces/userInterface";
import {
  removePermissionNotification,
  requestUserNotificationPermission,
} from "../../services/notificationService";

interface AuthContextData {
  signed: boolean;
  user: userInterface | null;
  signIn(email: String, password: String): Promise<boolean>;
  signOut(): void;
  loading: boolean;
  updateLocalUser(): void;
  firstTime: boolean;
  checkFirstTime(): Promise<boolean>;
  endFirstTime(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<userInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [firstTime, setFirstTime] = useState(null);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("@user");
      const storagedToken = await AsyncStorage.getItem("@token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.common[
          "Authorization"
        ] = `Baerer ${storagedToken}`;
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function checkFirstTime() {
    let string = await AsyncStorage.getItem("@firstTime");
    let ft = string === "true" ? true : false;
    setFirstTime(ft);
    console.log("firstTime", ft);
    return ft;
  }

  async function signIn(email: string, password: string) {
    auth
      .signIn(email, password)
      .then(async (response) => {
        console.log(response.data);

        setUser(response.data.user as userInterface);
        api.defaults.headers.common[
          "Authorization"
        ] = `Baerer ${response.data.token}`;
        await AsyncStorage.setItem("@user", JSON.stringify(response.data.user));
        await AsyncStorage.setItem("@token", response.data.token);
        if (!response.data.user.tokenPush) {
          let token = await requestUserNotificationPermission(
            response.data.user._id
          );
          if (!!token) {
            updateLocalUser(response.data.user._id);
          }
        }
        return true;
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response);
          Alert.alert("Erro", error.response.data.message);
        } else {
          console.log(error);
        }
        setUser(null);
        return false;
      });
    return false;
  }

  async function signOut() {
    await AsyncStorage.clear();
    // await AsyncStorage.removeItem("@user");
    // await AsyncStorage.removeItem("@token");
    removePermissionNotification(user._id);
    setUser(null);
  }

  async function updateLocalUser(id?: string) {
    const userId = id || user._id;

    api
      .get(`/user/list/${userId}`)
      .then(async (response) => {
        setUser(response.data[0]);
        await AsyncStorage.setItem("@user", JSON.stringify(response.data[0]));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function endFirstTime() {
    console.log("endFirstTime");
    await AsyncStorage.setItem("@firstTime", "false");
    setFirstTime(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        signOut,
        loading,
        updateLocalUser,
        firstTime,
        checkFirstTime,
        endFirstTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

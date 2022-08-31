import { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import * as auth from "../../services/auth";
import AsyncStorage from  '@react-native-community/async-storage';
import api from "../../services/api";
import userInterface from "../../interfaces/userInterface";
import { removePermissionNotification, requestUserNotificationPermission } from "../../services/notificationService";

interface AuthContextData {
  signed: boolean;
  user: userInterface | null;
  signIn(email: String, password: String): Promise<boolean>;
  signOut(): void;
  loading: boolean;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children } : any) => {
    
  const [user, setUser] = useState<userInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@user');
      const storagedToken = await AsyncStorage.getItem('@token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers.common['Authorization'] = `Baerer ${storagedToken}`;
      }
      setLoading(false);
    }
    loadStorageData();
  });


  async function signIn(email: string, password: string) {
    auth.signIn(email, password).then(async (response) => {
      setUser(response.data.user as userInterface);
      api.defaults.headers.common['Authorization'] = `Baerer ${response.data.token}`;
      await AsyncStorage.setItem('@user', JSON.stringify(response.data.user));
      await AsyncStorage.setItem('@token', response.data.token);
      if(!response.data.tokenPush){
        await requestUserNotificationPermission(response.data._id);
      }
      return true;
    }).catch((error) => {
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
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@token');
    removePermissionNotification(user._id);
    setUser(null);
  }

  return(
  <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, loading }}>
    {children}
  </AuthContext.Provider>)
};

export default AuthContext;
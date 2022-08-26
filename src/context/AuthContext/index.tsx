import { createContext, useState, useEffect } from "react";
import * as auth from "../../services/auth";
import AsyncStorage from  '@react-native-community/async-storage';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn(email: String, password: String): Promise<boolean>;
  signOut(): void;
  loading: boolean;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children } : any) => {
    
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem('@user');
      const storagedToken = await AsyncStorage.getItem('@token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        // api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }
      setLoading(false);
    }
    loadStorageData();
  });


  async function signIn(email: string, password: string) {
    const response = await auth.signIn();
    if (response) {
      setUser(response.user);
      await AsyncStorage.setItem('@user', JSON.stringify(response.user));
      await AsyncStorage.setItem('@token', response.token);
      return true;
    } else {
      return false;
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@user');
    await AsyncStorage.removeItem('@token');
    setUser(null);
  }

  return(
  <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, loading }}>
    {children}
  </AuthContext.Provider>)
};

export default AuthContext;
import { createContext, useState } from "react";
import * as auth from "../../services/auth";

interface AuthContextData {
  signed: boolean;
  user: object | null;
  signIn(email: String, password: String): Promise<boolean>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children } : any) => {
    
  const [user, setUser] = useState<object | null>(null);

  async function signIn(email: string, password: string) {
    const response = await auth.signIn();
    if (response) {
      setUser(response as object);
      return true;
    } else {
      return false;
    }
  }

  function signOut() {
    setUser(null);
  }

  return(
  <AuthContext.Provider value={{signed: !!user, user, signIn, signOut }}>
    {children}
  </AuthContext.Provider>)
};

export default AuthContext;
import { createContext } from "react";

interface AuthContextData {
    signed: boolean;
    token: string;
    user: object;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children } : any) => (
    <AuthContext.Provider value={{signed:  false, token:  '', user: {}}}>
      {children}
    </AuthContext.Provider>
);

export default AuthContext;
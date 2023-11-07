import { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { AuthContext } from "./context";

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const sessionStorageValue = localStorage.getItem("token") || "";
  const [token, setToken] = useState<string>(sessionStorageValue);
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const login = useCallback(async (): Promise<void> => {}, []);

  const authContext = useMemo(() => ({ token, login, logout }), [login, token]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

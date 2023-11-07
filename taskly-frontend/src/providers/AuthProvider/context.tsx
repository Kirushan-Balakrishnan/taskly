import React from "react";

export type AuthContextType = {
  token: string;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  token: "",
  login: () => Promise.resolve(),
  logout: () => null,
});

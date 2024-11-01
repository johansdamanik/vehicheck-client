import React, { createContext, useState, useEffect } from "react";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      access_token
      message
    }
  }
`;

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userToken, setToken] = useState(null);

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ userToken, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

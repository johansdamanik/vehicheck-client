import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import AuthProvider from "./context/AuthContext";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StackLogin from "./router/StackLogin";
import TabNavigation from "./router/TabNavigation";
import { Provider } from "react-redux";
import store from "./store";

const httpLink = createHttpLink({
  uri: "https://8114-180-241-59-153.ngrok-free.app/",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("access_token");
  return {
    headers: {
      ...headers,
      access_token: token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Provider store={store}>
            <StackLogin />
            <StatusBar />
          </Provider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

const styles = StyleSheet.create({});

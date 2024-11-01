import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../view/Login";
import SignUp from "../view/SignUp";
import TabNavigation from "./TabNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

export default function StackLogin() {
  const { userToken, setToken } = useContext(AuthContext);
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");

        setToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken ? (
          <Stack.Screen
            name="tabAja"
            component={TabNavigation}
            options={{
              headerShown: false,
              headerTitle: "",
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              headerTitle: "",
            }}
          />
        )}

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
            headerTitle: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

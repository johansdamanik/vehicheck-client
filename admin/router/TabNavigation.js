import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  AntDesign,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";

import React from "react";
import InspectionList from "../view/InspectionList";
import Chat from "../view/Chat";
import Profile from "../view/Profile";
import Login from "../view/Login";
import Home from "../view/Home";
import StackNavigation from "./StackNavigation";
import InspectionDetail from "../view/Stack/InspectionDetail";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const [loaded] = useFonts({
    Poppins: require("../assets/font/Poppins.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // headerShown: false,
          headerStyle: {
            backgroundColor: "#FDA62A",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 34,
            fontWeight: "bold",
            fontFamily: "Poppins",
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FDA62A",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color }) => {
            return <AntDesign name="home" size={30} color={color} />;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="StackNavigation"
        component={StackNavigation}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FDA62A",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color }) => {
            return <Octicons name="checklist" size={30} color={color} />;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FDA62A",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ color }) => {
            return (
              <MaterialIcons name="person-outline" size={30} color={color} />
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

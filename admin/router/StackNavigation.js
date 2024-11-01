import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import React from "react";
import Home from "../view/Home";
import InspectionDetail from "../view/Stack/InspectionDetail";
import InspectionList from "../view/InspectionList";
import Chat from "../view/Chat";

export default function StackNavigation() {
  const Stack = createNativeStackNavigator();
  const [loaded] = useFonts({
    Poppins: require("../assets/font/Poppins.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={InspectionList}
        options={{
          headerStyle: {
            backgroundColor: "#FDA62A",
          },
          headerTitle: 'Inspection List',
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 34,
            fontWeight: "bold",
            fontFamily: "Poppins",
          },
        }}
      />
      <Stack.Screen
        name="InspectionDetail"
        component={InspectionDetail}
        options={{
          headerStyle: {
            backgroundColor: "#FDA62A",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 34,
            fontWeight: "bold",
            fontFamily: "Poppins",
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerStyle: {
            backgroundColor: "#FDA62A",
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

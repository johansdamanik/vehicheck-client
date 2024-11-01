import { StyleSheet, Text, View } from "react-native";

import Home from "../view/Home";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FirstForm from "../view/Stack/FirstForm";
import SecondForm from "../view/Stack/SecondForm";

export default function StackNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="FirstForm"
        component={FirstForm}
        options={{
          headerTitle: "Book Cars Inspection",
          headerStyle: {
            backgroundColor: "#FDA62A",
          },
        }}
      />
      <Stack.Screen
        name="SecondForm"
        component={SecondForm}
        options={{
          headerTitle: "Your Detail",
          headerStyle: {
            backgroundColor: "#FDA62A",
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

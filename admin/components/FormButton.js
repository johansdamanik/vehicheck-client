import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function FormButton() {
  const navigation = useNavigation();
  const [form, setForm] = useState();
  const [loaded] = useFonts({
    Poppins: require("../assets/font/Poppins.ttf"),
  });

  if (!loaded) {
    return null;
  }
  const handleCars = () => {
    navigation.navigate("FirstForm", form, setForm);
  };
  const handleMotors = () => {
    navigation.navigate("FirstForm");
  };
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "Poppins",
          fontWeight: "bold",
        }}
      >
        Choose your wheels
      </Text>
      <TouchableOpacity onPress={handleCars} style={{ marginTop: 20 }}>
        <View style={styles.card}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins",
                fontWeight: "bold",
              }}
            >
              Cars
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Poppins" }}>
              General Inspections
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FDA62A",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <SimpleLineIcons name="arrow-right" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMotors} style={{ marginTop: 20 }}>
        <View style={styles.card}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins",
                fontWeight: "bold",
              }}
            >
              Motorcycles
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Poppins" }}>
              General Inspections
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#FDA62A",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <SimpleLineIcons name="arrow-right" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 94,
    backgroundColor: "#FFFFFF",
    shadowColor: "#B2B2B2",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
});

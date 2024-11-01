import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function HeaderHome() {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    Poppins: require("../assets/font/Poppins.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <>
      <View
        style={{
          height: 100,
          width: "100%",
          backgroundColor: "#FDA62A",

        }}
      >
        <SafeAreaView style={{ padding: 20 }}>
          
          <View>
            <Text
              style={{
                fontSize: 32,
                color: "white",
                fontWeight: "bold",
                fontFamily: "Poppins",
              }}
            >
              Dashboard
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});

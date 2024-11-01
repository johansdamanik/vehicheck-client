import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { Badge } from "react-native-paper";

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
          height: 235,
          width: "100%",
          backgroundColor: "#FDA62A",
          borderBottomStartRadius: 35,
          borderBottomEndRadius: 35,
        }}
      >
        <SafeAreaView style={{ padding: 20 }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "rgba(255, 255, 255, 0.75)",
                  fontSize: 16,
                  fontFamily: "Poppins",
                }}
              >
                Welcome to Vehicheck!
              </Text>
            </View>
            <View
              style={{
                height: 51,
                width: 51,
                backgroundColor: "rgba(245, 245, 245, 0.35)",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Tanggal")}
                >
                  <View style={{ position: "relative" }}>
                    <Ionicons
                      name="notifications-outline"
                      size={24}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 32,
                color: "white",
                fontWeight: "bold",
                fontFamily: "Poppins",
              }}
            >
              chose your vehicle inspection
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});

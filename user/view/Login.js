import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useContext } from "react";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      access_token
      message
    }
  }
`;

export default function Login({ navigation }) {
  const { setToken, userToken } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(null);
  const handleLogin = async () => {
    try {
      const { data } = await loginUserMutation({
        variables: {
          email: form.email,
          password: form.password,
        },
      });
      if (!data.loginUser.access_token) throw new Error(data.loginUser.message);
      await AsyncStorage.setItem("access_token", data.loginUser.access_token);
      setToken(data.loginUser.access_token);
      console.log(userToken);
    } catch (error) {
      console.log(error);
      setInvalid(error);
    }
  };

  const [loginUserMutation, { loading, error }] = useMutation(LOGIN_USER);

  const [loaded] = useFonts({
    Poppins: require("../assets/font/Poppins.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../assets/VEHICHECK-BG.png")}
      style={{ width: "100%", height: "100%", color: "#FDA62A" }}
    >
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          flex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
          overflow: "hidden",
        }}
      >
        <View style={{ padding: 40 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Hello,
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins",
                }}
              >
                Please login to your Account
              </Text>
            </View>
            <Pressable style={{ marginTop: 10 }}>
              <MaterialIcons name="arrow-forward-ios" size={40} color="black" />
            </Pressable>
          </View>
          <View style={{ marginTop: 40 }}>
            {invalid && (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins",
                  color: "red",
                }}
              >
                {invalid.message}
              </Text>
            )}
            <TextInput
              label="Email"
              value={form.email}
              theme={{ colors: { primary: '#FDA62A', underlineColor: 'transparent' } }}
              style={{
                backgroundColor: "rgba(240, 240, 238, 0.95)",
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                marginBottom: 20,
                fontFamily: "Poppins",
              }}
              underlineColor="transparent"
              onChangeText={(email) =>
                setForm({
                  ...form,
                  email: email,
                })
              }
            />
            <TextInput
              label="Password"
              value={form.password}
              theme={{ colors: { primary: '#FDA62A', underlineColor: 'transparent' } }}
              style={{
                backgroundColor: "rgba(240, 240, 238, 0.95)",
                borderWidth: 1,
                borderColor: "gray",
                marginBottom: 20,
                borderRadius: 5,
                fontFamily: "Poppins",
              }}
              underlineColor="transparent"
              underlineColorAndroid="transparent"
              secureTextEntry
              onChangeText={(password) =>
                setForm({
                  ...form,
                  password: password,
                })
              }
            />
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                padding: 20,
                backgroundColor: "#FDA62A",
                borderRadius: 30,
                alignItems: "center",
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Text style={{ fontFamily: "Poppins" }}>
                Don't have an account ?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text
                  style={{
                    color: "#FDA62A",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                    textDecorationLine: "underline",
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});

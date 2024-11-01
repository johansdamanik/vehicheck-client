import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { gql, useMutation, useApolloClient } from "@apollo/client";

const CREATE_ACCOUNT = gql`
  mutation Mutation($input: CreateStaffInput!) {
    createStaff(input: $input) {
      id
      fullname
      email
      phoneNumber
      address
      specialist
    }
  }
`;

export default function SignUp({ navigation }) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    address: "",
    phoneNumber: "",
    specialist: "All", // ini belum di handle
  });
  const [createStaff, { loading, error }] = useMutation(CREATE_ACCOUNT);
  const [loaded] = useFonts({
    Poppins: require("../assets/font/Poppins.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const handleSignUp = async () => {
    try {
      const { data } = createStaff({
        variables: {
          input: form,
        },
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/VEHICHECK-BG.png")}
      style={{ width: "100%", height: "100%", color: "#FDA62A" }}
    >
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          flex: 5,
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
                Create Your Account
              </Text>
            </View>
            <Pressable style={{ marginTop: 10 }}>
              <MaterialIcons name="arrow-forward-ios" size={40} color="black" />
            </Pressable>
          </View>

          <View style={{ marginTop: 40 }}>
            <TextInput
              label="Full Name"
              value={form.fullname}
              theme={{
                colors: { primary: "#FDA62A", underlineColor: "transparent" },
              }}
              style={{
                backgroundColor: "rgba(240, 240, 238, 0.95)",
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                marginBottom: 20,
                fontFamily: "Poppins",
              }}
              underlineColor="transparent"
              onChangeText={(fullname) =>
                setForm({
                  ...form,
                  fullname,
                })
              }
            />
            <TextInput
              label="Email"
              value={form.email}
              theme={{
                colors: { primary: "#FDA62A", underlineColor: "transparent" },
              }}
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
                  email,
                })
              }
            />
            <TextInput
              label="Password"
              value={form.password}
              theme={{
                colors: { primary: "#FDA62A", underlineColor: "transparent" },
              }}
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
            <TextInput
              label="Address"
              theme={{
                colors: { primary: "#FDA62A", underlineColor: "transparent" },
              }}
              value={form.address}
              style={{
                backgroundColor: "rgba(240, 240, 238, 0.95)",
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                marginBottom: 20,
                fontFamily: "Poppins",
              }}
              underlineColor="transparent"
              onChangeText={(address) =>
                setForm({
                  ...form,
                  address,
                })
              }
            />
            <TextInput
              label="Phone Number"
              value={form.phoneNumber}
              theme={{
                colors: { primary: "#FDA62A", underlineColor: "transparent" },
              }}
              style={{
                backgroundColor: "rgba(240, 240, 238, 0.95)",
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                marginBottom: 20,
                fontFamily: "Poppins",
              }}
              underlineColor="transparent"
              onChangeText={(phoneNumber) =>
                setForm({
                  ...form,
                  phoneNumber,
                })
              }
            />
            <TouchableOpacity
              onPress={handleSignUp}
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
                You have an account ?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text
                  style={{
                    color: "#FDA62A",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                    textDecorationLine: "underline",
                    fontWeight: "600",
                  }}
                >
                  Login
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

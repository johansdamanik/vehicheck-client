import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { gql, useQuery } from "@apollo/client";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import OrderCard from "../components/OrderCard";
import { ActivityIndicator } from "react-native-paper";
import HeaderHome from "../components/HeaderHome copy";
const FECTH_ORDER = gql`
  query Orderlist {
    orders {
      id
      userId
      staffId
      fullName
      phoneNumber
      inspectionAddress
      date
      time
      vehicle {
        type
        brand
        model
        year
        transmission
      }
      map {
        city
        regional
        longitude
        latitude
      }
      status
      payment
    }
  }
`;
export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(FECTH_ORDER);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState();
  const [loaded] = useFonts({
    Poppins: require("../assets/font/Poppins.ttf"),
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        getAddressFromCoordinates(
          location.coords.latitude,
          location.coords.longitude
        );
      } else {
        alert("you need give access for take order");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const addressResponse = await LocationGeocoding.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (addressResponse && addressResponse.length > 0) {
        const formattedAddress = formatAddress(addressResponse[0]);
        setRegion("Kota Jakarta Selatan");
      } else {
        console.log("No address found");
      }
    } catch (error) {
      console.log("Error retrieving address: ", error);
    }
  };

  const formatAddress = (address) => {
    const { region, subregion } = address;
    return `${subregion}`;
  };
  if (!loaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#FDA62A" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  }

  const fillterData = data.orders.filter(
    (order) => order.map.city === region && order.status !== "taken"
  );

  return (
    <View>
      {/* <HeaderHome /> */}
      <Text
        style={{
          paddingHorizontal: 20,
          fontSize: 20,
          fontFamily: "Poppins",
          fontWeight: "bold",
        }}
      >
        Regional: {region || "All entire world and beyond"}
      </Text>
      <SafeAreaView style={{ padding: 20, overflow: "visible" }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 80 }}
          ListHeaderComponent={<></>}
          data={fillterData}
          renderItem={({ item }) => <OrderCard order={item} region={region} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 150,
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
    padding: 20,
  },
});

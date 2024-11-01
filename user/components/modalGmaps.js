import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as LocationGeocoding from "expo-location";
import { Modal } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { FormOrder } from "../store/actions/ActionCreator";
import { Ionicons } from "@expo/vector-icons";

export default function Gmaps({ setExterior, Exterior }) {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const dispatch = useDispatch();
  const form = useSelector((state) => state.Form.Form);
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude || -6.208766314363151,
          longitude: location.coords.longitude || 106.84389911592007,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        getAddressFromCoordinates(
          location.coords.latitude,
          location.coords.longitude
        );
      } else {
        alert("can use pin point");
      }
    } catch (err) {
      console.log(err);
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
        setAddress(formattedAddress);
        dispatch(
          FormOrder({
            ...form,
            Address: formattedAddress,
            map: {
              ...form.map,
              city: addressResponse[0].subregion,
              regional: addressResponse[0].region,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            },
          })
        );
      } else {
        console.log("No address found");
      }
    } catch (error) {
      console.log("Error retrieving address: ", error);
    }
  };

  const formatAddress = (address) => {
    const { region, subregion } = address;
    return ` ${subregion}, ${region}`;
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarkerPosition({
      latitude,
      longitude,
    });

    getAddressFromCoordinates(latitude, longitude);
  };

  return (
    <Modal
      style={styles.container}
      visible={Exterior}
      animationType="fade"
      transparent={true}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          width: "100%",
          height: "100%",
          borderRadius: 10,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => setExterior(false)}
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={{ marginLeft: 10 }}>Back</Text>
        </TouchableOpacity>
        <MapView
          style={styles.map}
          initialRegion={currentLocation}
          onPress={handleMapPress}
        >
          {currentLocation && (
            <Marker
              coordinate={markerPosition || currentLocation}
              title="Current Location"
              description="This is your current location"
              draggable
              onDragEnd={(e) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                setMarkerPosition({
                  latitude,
                  longitude,
                });
                getAddressFromCoordinates(latitude, longitude);
              }}
            />
          )}
        </MapView>
        <Text style={styles.address}>{address}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

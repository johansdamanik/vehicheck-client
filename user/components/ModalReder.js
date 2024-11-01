import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Button, Divider, ActivityIndicator } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { gql, useQuery } from "@apollo/client";

const FIND_INSPECTION = gql`
  query FindInspectionByOrderId($orderId: String!) {
    findInspectionByOrderId(orderId: $orderId) {
      url
    }
  }
`;

export default function ModalReder({ order, hideModal, visible }) {
  const { loading, error, data } = useQuery(FIND_INSPECTION, {
    variables: {
      orderId: order.id,
    },
  });

  const navigation = useNavigation();
  const handelDownload = () => {
    Linking.openURL(data.findInspectionByOrderId[0].url).catch((err) => {
      console.error("Failed to open URL:", err);
    });
  };

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    flex: 1,
    height: 300,
  };

  if (loading) {
    return <></>;
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      contentContainerStyle={containerStyle}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
        onPress={hideModal}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            width: "90%",
            borderRadius: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ gap: 6 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {order.vehicle.brand} {order.vehicle.model}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>
              {order.vehicle.year} | {order.vehicle.transmission}
            </Text>
            <Divider style={{ marginBottom: 24 }} />

            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: "500" }}>Name: </Text>
              {order.fullName}
            </Text>
            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: "500" }}>Phone Number: </Text>
              {order.phoneNumber}
            </Text>

            <Text style={{ fontSize: 16 }}>
              <Text style={{ fontWeight: "500" }}>Booking Date: </Text>
              {order.date}, {order.time}
            </Text>

            <View style={{ marginBottom: 24 }}>
              <Text
                style={{ fontSize: 16, marginBottom: 4, fontWeight: "500" }}
              >
                Inspection Address:
              </Text>
              <Text style={{ padding: 8, backgroundColor: "rgba(0,0,0,0.1)" }}>
                {order.inspectionAddress}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            {data?.findInspectionByOrderId?.length > 0 ? (
              <TouchableOpacity onPress={handelDownload}>
                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: 16,
                    borderWidth: 2,
                    borderColor: "#FDA62A",
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#FDA62A" }}>
                    <Button>
                      <Text style={{ color: "#FDA62A" }}>
                        {" "}
                        Download Inspection Detail
                      </Text>
                    </Button>
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              ""
            )}
            <TouchableOpacity onPress={hideModal}>
              <View
                style={{
                  alignSelf: "flex-start",
                  marginTop: 16,
                  borderWidth: 2,
                  borderColor: "#FDA62A",
                  borderRadius: 20,
                }}
              >
                <Text style={{ fontSize: 16, color: "#FDA62A" }}>
                  <Button>
                    <Text style={{ color: "#FDA62A" }}> Close</Text>
                  </Button>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});

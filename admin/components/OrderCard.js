import * as React from "react";
import { Card, Button, PaperProvider, Divider } from "react-native-paper";
import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { TAKE_ORDER, FECTH_INSPECTIONLIST } from "../config/ApolloQuery";
import { useMutation } from "@apollo/client";
export default function OrderCard({ order, region }) {
  const [visible, setVisible] = React.useState(false);
  const [takeOrder, { loading, error }] = useMutation(TAKE_ORDER, {
    refetchQueries: ["Orderlist", FECTH_INSPECTIONLIST],
  });
  const submitTakeOrder = async () => {
    try {
      const { data } = await takeOrder({
        variables: {
          updateStatusId: order.id,
          status: "taken",
        },
      });
    } catch (err) {
      console.log(err, "ini error");
    }
  };
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [loaded] = useFonts({
    Poppins: require("../assets/font/Poppins.ttf"),
    Nunito: require("../assets/font/Nunito.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    flex: 1,
    height: 300,
  };

  function renderModal() {
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
                {order.vehicle.brand} {order.vehicle.type}
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
                <Text
                  style={{ padding: 8, backgroundColor: "rgba(0,0,0,0.1)" }}
                >
                  {order.inspectionAddress}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={hideModal}>
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
                    <Text style={{ color: "#FDA62A" }}> Close</Text>
                  </Button>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <PaperProvider>
      <View style={{ marginBottom: 20 }}>
        <Card style={{ backgroundColor: "white" }}>
          <Card.Title
            titleStyle={{
              paddingTop: 6,
              textAlign: "left",
              fontWeight: "700",
              fontSize: 18,
              fontFamily: "Poppins",
            }}
            title={`${order.vehicle.brand} ${order.vehicle.model} - ${order.vehicle.year}`}
          />

          <Divider bold={true} />
          <Card.Content>
            <View style={{ gap: 5, marginVertical: 12 }}>
              <Text variant="titleLarge">
                {order.fullName} - {order.phoneNumber}
              </Text>
              <Text variant="bodyMedium">Booking Date: {order.date}</Text>
            </View>
          </Card.Content>
          <Card.Actions style={{}}>
            <Button onPress={showModal} style={{ borderColor: "#FDA62A" }}>
              <Text style={{ color: "#FDA62A" }}>View Details</Text>
            </Button>
            {order.status === "taken" ? (
              ""
            ) : (
              <Button
                onPress={submitTakeOrder}
                style={{ backgroundColor: "#FDA62A" }}
              >
                Take Order
              </Button>
            )}
          </Card.Actions>
        </Card>
        {renderModal()}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});

{
  /* <Card.Actions style={{}}>
            <Button onPress={showModal} style={{ borderColor: "#FDA62A" }}>
              <Text style={{ color: "#FDA62A" }}>View Details</Text>
            </Button>
            {order.status === "taken" ? (
              ""
            ) : (
              <Button
                onPress={submitTakeOrder}
                style={{ backgroundColor: "#FDA62A" }}
              >
                Take Order
              </Button>
            )}
          </Card.Actions> */
}

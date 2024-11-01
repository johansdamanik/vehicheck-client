import * as React from "react";
import { Card, Button, PaperProvider, Divider } from "react-native-paper";
import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

export default function InspectionCard({ order }) {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const navigate = useNavigation();

  const [loaded] = useFonts({
    Poppins: require("../assets/font/Poppins.ttf"),
    Nunito: require("../assets/font/Nunito.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <View style={{ marginBottom: 15 }}>
        <Card style={{ backgroundColor: "white" }}>
          <Card.Title
            titleStyle={{
              paddingTop: 6,
              textAlign: "left",
              fontWeight: "700",
              fontSize: 18,
              fontFamily: "Poppins",
            }}
            title={`${order.vehicle.year} ${order.vehicle.brand} ${order.vehicle.model}`}
          />
          <Divider />
          <Card.Content>
            <View style={{ gap: 5, marginVertical: 12 }}>
              <Text variant="titleLarge">
                {order.fullName} - {order.phoneNumber}
              </Text>
              <Text variant="bodyMedium">
                Booking Date: {order.date}, {order.time}
              </Text>
            </View>
          </Card.Content>
          <Card.Actions style={{}}>
            <Button
              onPress={() => navigate.navigate("InspectionDetail", { order })}
              style={{ borderColor: "#FDA62A" }}
            >
              <Text style={{ color: "#FDA62A" }}>Inspect</Text>
            </Button>
            <Button
              onPress={() =>
                navigate.navigate("Chat", {
                  userId: order.userId,
                  staffId: order.staffId,
                })
              }
              style={{
                borderColor: "#FDA62A",
                backgroundColor: "#FDA62A",
                borderWidth: 1,
                width: 100,
              }}
            >
              <Text style={{ color: "#FFFFFF" }}>Chat</Text>
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});

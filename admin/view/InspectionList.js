import React from "react";
import { StyleSheet, Text, ScrollView, View, FlatList } from "react-native";
import {
  Card,
  Button,
  PaperProvider,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { gql, useQuery } from "@apollo/client";
import InspectionCard from "../components/InspectionCard";
import { FECTH_STAFF_ORDER } from "../config/ApolloQuery";

export default function InspectionList() {
  const { loading, error, data } = useQuery(FECTH_STAFF_ORDER);
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

  return (
    <View style={{ padding: 20, overflow: "visible", gap: 15 }}>
      <FlatList
        data={data.findOrderByStaffId}
        renderItem={({ item }) => <InspectionCard order={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

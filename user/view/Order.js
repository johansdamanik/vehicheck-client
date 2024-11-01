import React, { useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import OrderCard from '../components/OrderCard';
import { gql, useQuery } from '@apollo/client';
import { SafeAreaView } from 'react-native-safe-area-context';
const FECTH_ORDER = gql`
  query Orderlist {
    findOrderByUserId {
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

export default function Order({ navigation }) {
  const { loading, error, data, refetch} = useQuery(FECTH_ORDER);

  useEffect(() => {
    refetch();
  }, []);

  const [loaded] = useFonts({
    Poppins: require('../assets/font/Poppins.ttf'),
  });

  if (!loaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#FDA62A" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <View style={{ backgroundColor: '#FDA62A', borderBottomStartRadius: 35, borderBottomEndRadius: 35 }}>
          <Text
            style={{
              padding: 15,
              marginLeft: 10,
              paddingTop: 60,
              fontSize: 25,
              fontFamily: 'Poppins',
              fontWeight: 'bold',
              marginBottom: 8,
              color: 'white'
            }}
          >
            My Inspection Orders
          </Text>
        </View>

        <View style={{ paddingHorizontal: 20, overflow: 'visible', gap: 15, marginVertical: 25 }}>
          {data.findOrderByUserId.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});

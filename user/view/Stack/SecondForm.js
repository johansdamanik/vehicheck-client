import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FormOrder } from '../../store/actions/ActionCreator';
import { WebView } from 'react-native-webview';

import { gql, useMutation } from '@apollo/client';

import Gmaps from '../../components/modalGmaps';

const ORDER_FORM = gql`
  mutation CreateOrder($newOrder: NewOrder) {
    createOrder(NewOrder: $newOrder) {
      id
      paymentUrl
    }
  }
`;

export default function SecondForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.Form.Form);
  const navigation = useNavigation();
  const [Exterior, setExterior] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const handleNavigationStateChange = (navState) => {
    if (navState.url.includes('capture')) {
      dispatch(
        FormOrder({
          fullName: '',
          phoneNumber: '',
          inspectionAddress: '',
          date: '',
          time: '',
          vehicle: {
            type: '',
            brand: '',
            model: '',
            year: 0,
            transmission: 'automatic',
          },
          map: {
            city: '',
            regional: '',
            longitude: '',
            latitude: '',
          },
          status: '',
        })
      );

      setPaymentUrl(null);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Service List' }],
      });
    }
  };

  const submitOrder = async () => {
    try {
      delete form.Address;
      const { data } = await orderFormMutation({
        variables: {
          newOrder: form,
        },
      });
      setPaymentUrl(data.createOrder.paymentUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const [orderFormMutation, { loading, error }] = useMutation(ORDER_FORM, {
    refetchQueries: ['Orderlist'],
  });

  if (paymentUrl) {
    return (
      <>
        <WebView source={{ uri: paymentUrl }} onNavigationStateChange={handleNavigationStateChange} />
      </>
    );
  }

  const { height } = Dimensions.get('window');

  return (
    <View style={{ paddingVertical: 40, paddingHorizontal: 20, justifyContent: 'space-between', height: height * 0.85 }}>
      <View style={{ gap: 15 }}>
        <View style={{ gap: 5 }}>
          <Text>Full Name</Text>
          <TextInput
            placeholder="Insert your name"
            placeholderTextColor={'#cccccc'}
            theme={{ colors: { primary: '#FDA62A', underlineColor: 'transparent' } }}
            value={form.fullName}
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 5,
              fontFamily: 'Poppins',
            }}
            onChangeText={(fullName) => {
              dispatch(
                FormOrder({
                  ...form,
                  fullName,
                })
              );
            }}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text>Phone Number</Text>
          <TextInput
            placeholder="Insert your phone number"
            placeholderTextColor={'#cccccc'}
            value={form.phoneNumber}
            theme={{ colors: { primary: '#FDA62A', underlineColor: 'transparent' } }}
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 5,
              fontFamily: 'Poppins',
            }}
            onChangeText={(phoneNumber) => {
              dispatch(
                FormOrder({
                  ...form,
                  phoneNumber,
                })
              );
            }}
          />
        </View>
        <Button onPress={() => setExterior(true)}>
          <Text style={{ color: '#FDA62A' }}>{form.Address || 'Choose your location'}</Text>
        </Button>

        <View style={{ gap: 5 }}>
          <Text>Regional</Text>
          <TextInput
            value={form.map.regional}
            theme={{ colors: { primary: '#FDA62A', underlineColor: 'transparent' } }}
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 5,
              fontFamily: 'Poppins',
            }}
            onChangeText={(regional) => {
              dispatch(
                FormOrder({
                  ...form,
                  map: {
                    ...form.map,
                    regional,
                  },
                })
              );
            }}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text>Inspection Address</Text>
          <TextInput
            placeholder=""
            theme={{ colors: { primary: '#FDA62A', underlineColor: 'transparent' } }}
            placeholderTextColor={'#cccccc'}
            value={form.inspectionAddress}
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 5,
              fontFamily: 'Poppins',
            }}
            onChangeText={(inspectionAddress) => {
              dispatch(
                FormOrder({
                  ...form,
                  inspectionAddress,
                })
              );
            }}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={submitOrder}
        style={{
          paddingVertical: 15,
          backgroundColor: '#FDA62A',
          borderRadius: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 16, color: 'white', fontWeight: '700' }}>ORDER INSPECTION</Text>
      </TouchableOpacity>
      <Gmaps Exterior={Exterior} setExterior={setExterior} />
    </View>
  );
}

const styles = StyleSheet.create({});

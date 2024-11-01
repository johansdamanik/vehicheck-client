import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FormOrder } from '../store/actions/ActionCreator';

export default function FormButton() {
  const navigation = useNavigation();
  const form = useSelector((state) => state.Form.Form);
  const dispatch = useDispatch();
  const [loaded] = useFonts({
    Poppins: require('../assets/font/Poppins.ttf'),
  });

  if (!loaded) {
    return null;
  }
  const handleCars = () => {
    dispatch(
      FormOrder({
        ...form,
        vehicle: {
          ...form.vehicle,
          type: 'cars',
        },
      })
    );
    navigation.navigate('FirstForm');
  };
  const handleMotors = () => {
    dispatch(
      FormOrder({
        ...form,
        vehicle: {
          ...form.vehicle,
          type: 'motorcyle',
        },
      })
    );
    navigation.navigate('FirstForm');
  };
  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'Poppins',
          fontWeight: 'bold',
        }}
      >
        Choose your wheels
      </Text>
      <TouchableOpacity onPress={handleCars} style={{ marginTop: 20}}>
        <View style={styles.card}>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 14}}>
            <FontAwesome5 name="car-alt" size={42} color="#EA906C" />
          </View>
          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins',
                fontWeight: 'bold',
              }}
            >
              Cars
            </Text>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins' }}>General Inspections</Text>
          </View>
          <View
            style={{
              backgroundColor: '#FDA62A',
              padding: 10,
              borderRadius: 10,
            }}
          >
            <SimpleLineIcons name="arrow-right" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleMotors} style={{ marginTop: 20 }}>
        <View style={styles.card}>
          <View style={{ flex: 1, alignItems: 'center', marginRight: 14, }}>
            <Fontisto name="motorcycle" size={42} color="#FFE194" />
          </View>
          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins',
                fontWeight: 'bold',
              }}
            >
              Motorcycles
            </Text>
            <Text style={{ fontSize: 16, fontFamily: 'Poppins' }}>General Inspections</Text>
          </View>
          <View
            style={{
              backgroundColor: '#FDA62A',
              padding: 10,
              borderRadius: 10,
            }}
          >
            <SimpleLineIcons name="arrow-right" size={24} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 94,
    backgroundColor: '#FFFFFF',
    shadowColor: '#B2B2B2',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Order from '../view/Order';
import DetailService from '../view/DetailService';
import Chat from '../view/Chat';

export default function StackMyInspection() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyInspection"
        component={Order}
        options={{
          headerStyle: {
            backgroundColor: '#FDA62A',
          
          },
          headerShown: false
        }}
        
      />
      <Stack.Screen
        name="Laporan"
        component={DetailService}
        options={{
          headerStyle: {
            backgroundColor: '#FDA62A',
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerStyle: {
            backgroundColor: '#FDA62A',
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

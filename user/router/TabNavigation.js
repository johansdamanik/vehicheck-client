import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons, Octicons , Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';

import StackNavigation from './StackNavigation';

import { AuthContext } from '../context/AuthContext';
import Profile from '../view/Profile';
import StackMyInspection from './StackMyInspection';

export default function TabNavigation() {
  const { userToken } = useContext(AuthContext);
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FDA62A',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color }) => {
          if (route.name === 'TabHome') {
            return <Octicons name="home" size={30} color={color} />;
          } else if (route.name === 'Service List') {
            return <MaterialIcons name="event" size={34} color={color} />;
          } else if (route.name === 'tabProfile') {
            return <Ionicons name="person" size={30} color={color} />;
          }
        },
        tabBarStyle: { height: 55},
      })}
    >
      <Tab.Screen
        name="TabHome"
        component={StackNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Service List"
        component={StackMyInspection}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="tabProfile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

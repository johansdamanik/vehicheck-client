import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import { useFonts } from 'expo-font';
import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
const USER = gql`
  query userData {
    userData {
      fullname
      email
      phoneNumber
      address
    }
  }
`;
export default function Profile() {
  const { logout } = useContext(AuthContext);
  const { loading, error, data } = useQuery(USER);

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
  console.log(data);
  return (
    <ImageBackground
      style={{
        width: '100%',
        height: '100%',
        color: '#FDA62A',
        backgroundColor: '#FDA62A',
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white', fontFamily: 'Poppins' }}>Hi, {data.userData.fullname.split(' ')[0]}!</Text>
        </View>
        <View
          style={{
            flex: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderTopStartRadius: 40,
            borderTopEndRadius: 40,
            overflow: 'hidden',
          }}
        >
          <View style={{ padding: 20, gap: 15 }}>
            <View style={{}}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/147/147142.png' }} style={{ alignSelf: 'center', height: 125, width: 125 }} />
              <View style={{ marginTop: 20, gap: 8 }}>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>Name :  </Text>
                  {data.userData.fullname}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>Email :  </Text>
                  {data.userData.email}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  <Text style={{ fontWeight: 'bold' }}>Phone :  </Text>
                  {data.userData.phoneNumber}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Address :  </Text>
                <View style={{ backgroundColor: '#DCDCDC', paddingVertical: 12, borderRadius: 12 }}>
                  <Text style={{ fontSize: 16, paddingHorizontal: 12 }}>{data.userData.address}</Text>
                </View>
              </View>
            </View>
            <Divider bold={1} />
            <View style={{ marginTop: 5, gap: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>More</Text>
              <View style={{ gap: 12 }}>
                <TouchableOpacity style={styles.more}>
                  <View style={{ flex: 1, marginRight: 12 }}>
                    <Ionicons name="help-buoy" size={24} color="#FDA62A" />
                  </View>
                  <Text style={{ flex: 8, fontSize: 16, fontFamily: 'Poppins', fontWeight: 'bold', color: '#484848' }}>Help & Supports</Text>
                  <View style={{ flex: 1 }}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#FDA62A" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.more}>
                  <View style={{ flex: 1, marginRight: 12 }}>
                    <Octicons name="question" size={24} color="#FDA62A" />
                  </View>
                  <Text style={{ flex: 8, fontSize: 16, fontFamily: 'Poppins', fontWeight: 'bold', color: '#484848' }}>About App</Text>
                  <View style={{ flex: 1 }}>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#FDA62A" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => logout()}
              style={styles.logout}
            >
              <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  more: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    borderColor: '#FDA62A',
    borderWidth: 1,
  },
  logout: {
    backgroundColor: 'orange',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 80
  }
});

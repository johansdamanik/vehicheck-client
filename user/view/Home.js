import { Pressable, StyleSheet, Text, View, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import FlipCard from 'react-native-flip-card';
import { Divider } from 'react-native-paper';

import React, { useRef, useState } from 'react';
import HeaderHome from '../components/HeaderHome';
import { useFonts } from 'expo-font';
import FormButton from '../components/FormButton';
import { useDispatch, useSelector } from 'react-redux';
import InfoCars from '../components/InfoCars';
import InfoMotor from '../components/InfoMotor';

export default function Home({ navigation }) {
  const [component, setComponent] = useState('car');
  const flipCardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const [loaded] = useFonts({
    Poppins: require('../assets/font/Poppins.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <ScrollView>
      <HeaderHome />
      <FormButton />
      <View style={{ padding: 20, marginBottom: 50 }}>
        <View>
          <Divider bold={1}/>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            marginVertical: 12,
          }}
        >
          We provide the following services
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
          <TouchableOpacity onPress={() => setIsFlipped(false)} style={[styles.button, { backgroundColor: isFlipped ? '#BDC3C7' : '#FDA62A' }]}>
            <Text style={{ alignSelf: 'center', color: '#404040', fontWeight: '600' }}>CARS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFlipped(true)} style={[styles.button, { backgroundColor: isFlipped ? '#FDA62A' : '#BDC3C7' }]}>
            <Text style={{ alignSelf: 'center', color: '#404040', fontWeight: '600' }}>MOTORCYCLES</Text>
          </TouchableOpacity>
        </View>

        <FlipCard flip={isFlipped} flipHorizontal={true} flipVertical={false} friction={20} perspective={1000}>
          <View>
            <InfoCars />
          </View>
          <View>
            <InfoMotor />
          </View>
        </FlipCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
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
    padding: 20,
  },
  button: {
    padding: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    marginVertical: 10,
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 5,
  },
});

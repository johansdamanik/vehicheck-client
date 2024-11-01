import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { RadioButton, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/timePicker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { FormOrder } from '../../store/actions/ActionCreator';

export default function FirstForm() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.Form.Form);
  const navigation = useNavigation();
  const { height } = Dimensions.get('window');

  return (
    <View style={{ paddingVertical: 40, paddingHorizontal: 20, justifyContent: 'space-between', height: height * 0.85 }}>
      <View style={{ gap: 15 }}>
        <View style={{ gap: 5 }}>
          <Text>Brand</Text>
          <TextInput
            placeholder="eg: Toyota"
            placeholderTextColor={'#cccccc'}
            theme={{ colors: { primary: '#FDA62A' } }}
            value={form.vehicle.brand}
            onChangeText={(brand) => {
              dispatch(
                FormOrder({
                  ...form,
                  vehicle: {
                    ...form.vehicle,
                    brand: brand,
                  },
                })
              );
            }}
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 5,
              fontFamily: 'Poppins',
            }}
          />
        </View>
        <View style={{ gap: 5 }}>
          <Text>Model</Text>
          <TextInput
            placeholder="eg: Kijang Innova 2.0 G"
            placeholderTextColor={'#cccccc'}
            theme={{ colors: { primary: '#FDA62A', underlineColor: 'transparent' } }}
            value={form.vehicle.model}
            onChangeText={(model) => {
              dispatch(
                FormOrder({
                  ...form,
                  vehicle: {
                    ...form.vehicle,
                    model: model,
                  },
                })
              );
            }}
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#cccccc',
              borderRadius: 5,
              fontFamily: 'Poppins',
            }}
          />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1, gap: 5 }}>
            <Text>Transmission</Text>
                  
            <View style={{borderColor:'#cccccc', borderBottomWidth: 1, borderRadius: 1, backgroundColor: 'white', height: 58, borderBottomColor: '#606060' }}>
              <Picker
                selectedValue={form.vehicle.transmission}
                style={{
                  fontFamily: 'Poppins',
                  paddingHorizontal: 10,
                  height: 40,
                  fontSize: 16,
                  color: 'black',

                }}
                onValueChange={(transmission) =>
                  dispatch(
                    FormOrder({
                      ...form,
                      vehicle: {
                        ...form.vehicle,
                        transmission: transmission,
                      },
                    })
                  )
                }
              >
                <Picker.Item label="Automatic" value="Automatic" />
                <Picker.Item label="Manual" value="Manual" />
              </Picker>
            </View>
          </View>
          <View style={{ flex: 1, gap: 5 }}>
            <Text>Year</Text>
            <TextInput
              placeholder="eg: 2017"
              placeholderTextColor={'#cccccc'}
              keyboardType="number-pad"
              value={form.vehicle.year.toString()}
              theme={{ colors: { primary: '#FDA62A', underlineColor: 'transparent' } }}
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#cccccc',
                borderRadius: 5,
                fontFamily: 'Poppins',
              }}
              onChangeText={(year) => {
                console.log(year);
                dispatch(
                  FormOrder({
                    ...form,
                    vehicle: {
                      ...form.vehicle,
                      year: parseInt(year),
                    },
                  })
                );
              }}
            />
          </View>
        </View>
        <DatePicker />
        <TimePicker />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SecondForm')}
        style={{
          paddingVertical: 10,
          backgroundColor: '#FDA62A',
          borderRadius: 20,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 18 }}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

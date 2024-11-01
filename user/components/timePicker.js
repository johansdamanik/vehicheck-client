import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FormOrder } from "../store/actions/ActionCreator";

const TimePicker = () => {
  const form = useSelector((state) => state.Form.Form);
  const dispatch = useDispatch();
  const [selectedTime, setSelectedTime] = useState(null);

  const timeData = [
    { id: "1", time: "9 : 00 AM" },
    { id: "2", time: "10 : 00 AM" },
    { id: "3", time: "11 : 00 AM" },
    { id: "4", time: "01 : 00 PM" },
    { id: "5", time: "02 : 00 PM" },
    { id: "6", time: "03 : 00 PM" },
  ];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    console.log(time);
    dispatch(
      FormOrder({
        ...form,
        time: time,
      })
    );
  };

  const renderTimeItem = ({ item }) => {
    const isActive = selectedTime === item.time;

    return (
      <TouchableOpacity
        onPress={() => handleTimeSelect(item.time)}
        style={{
          width: 100,
          height: 40,
          backgroundColor: isActive ? "orange" : "#cccccc",
          shadowColor: "#B2B2B2",
          borderRadius: 20,
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.2,
          shadowRadius: 30,
          elevation: 5,
          alignItems: "center",
          justifyContent: "center",
          margin: 5,
        }}
      >
        <Text style={{ color: isActive ? "black" : "black" }}>{item.time}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{gap: 5}}>
      <Text>Time</Text>
      <FlatList
        data={timeData}
        renderItem={renderTimeItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  );
};

export default TimePicker;

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { FormOrder } from "../store/actions/ActionCreator";

const DatePicker = () => {
  const form = useSelector((state) => state.Form.Form);
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    // Format the selected date as needed
    const formattedDate = date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setSelectedDate(formattedDate);
    dispatch(
      FormOrder({
        ...form,
        date: formattedDate,
      })
    );
  };

  return (
    <View style={{gap: 5}}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text>Date</Text>
      </View>
      <TouchableOpacity
        onPress={showDatePicker}
        style={{
          height: 60,
          backgroundColor: selectedDate ? 'orange' : "#cccccc",
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
          padding: 20,
        }}
      >
        <Text style={{color: 'black', fontSize: 16}}>{selectedDate ? selectedDate : "Select Date"}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default DatePicker;

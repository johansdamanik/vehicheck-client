import { ITEM_ORDER_SUCCESS } from "../actions/ActionType";

let intialState = {
  Form: {
    fullName: "",
    phoneNumber: "",
    inspectionAddress: "",
    date: "",
    time: "",
    vehicle: {
      type: "",
      brand: "",
      model: "",
      year: "",
      transmission: "automatic",
    },
    map: {
      city: "",
      regional: "",
      longitude: "",
      latitude: "",
    },
    status: "",
  },
};

export default function orderReducer(state = intialState, action) {
  switch (action.type) {
    case ITEM_ORDER_SUCCESS:
      return { Form: action.payload };
    default:
      return state;
  }
}

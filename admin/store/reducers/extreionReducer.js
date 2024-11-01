import { ITEM_INSPECTION, ITEM_ORDER_SUCCESS } from "../actions/ActionType";

let intialState = {
  Form: {
    exterior: {
      bemperDepan: {
        status: "",
        title: "Bemper Depan",
      },
      bemperBelakang: {
        status: "",
        title: "Bemper Belakang",
      },
      kapMesin: {
        status: "",
        title: "Kap Mesin",
      },
      pintuDepan: {
        status: "",
        title: "Pintu Depan",
      },
      pintuBelakang: {
        status: "",
        title: "Pintu Belakang",
      },
      kapBagasi: {
        status: "",
        title: "Kap Bagasi",
      },
      photo: [],
    },
  },
};

export default function inspectionReducer(state = intialState, action) {
  switch (action.type) {
    case ITEM_INSPECTION:
      return { Form: action.payload };
    default:
      return state;
  }
}

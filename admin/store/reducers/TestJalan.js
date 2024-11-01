import { ITEM_INSPECTION, ITEM_ORDER_SUCCESS } from "../actions/ActionType";

let intialState = {
  Form: {
    orderId: "",
    vehicle: {
      type: "",
      brand: "",
      model: "",
      year: 0,
      transmission: "",
    },
    tesJalan: {
      bunyiTransisi: {
        status: "",
        title: "Bunyi Transimis",
      },
      rodaPenggerak: {
        status: "",
        title: "Roda Penggerak",
      },
      sistemKopling: {
        status: "",
        title: "Sistem Kopling",
      },
      sistemTuasRem: {
        status: "",
        title: "Sistem Tuas Rem",
      },
      perpindahanTransmisi: {
        status: "",
        title: "Perpindahan Transmisi",
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

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
    components: {
      belts: {
        status: "",
        title: "Belt Mesin",
      },
      engine: {
        status: "",
        title: "Mesin",
      },
      mesinAkselerasi: {
        status: "",
        title: "Mesin Akselereasi",
      },
      engineIdling: {
        status: "",
        title: "Mesin Idle",
      },
      engineStarling: {
        status: "",
        title: "Mesin Starling",
      },
      suaraMesin: {
        status: "",
        title: "Suara Mesin",
      },
      aki: {
        status: "",
        title: "Aki",
      },
      dinamo: {
        status: "",
        title: "Dinamo",
      },
      moutingTransmisi: {
        status: "",
        title: "Mounting Transmisi",
      },
      radiator: {
        status: "",
        title: "Radiator",
      },
      tangkiRadiator: {
        status: "",
        title: "Tangki Radiator",
      },
      kipasRadiator: {
        status: "",
        title: "Kipas Radiator",
      },
      tutupRadiator: {
        status: "",
        title: "Tutup Radiator",
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

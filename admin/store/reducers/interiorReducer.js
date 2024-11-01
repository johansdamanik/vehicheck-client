import { ITEM_INSPECTION, ITEM_ORDER_SUCCESS } from '../actions/ActionType';

let intialState = {
  Form: {
    orderId: '',
    vehicle: {
      type: '',
      brand: '',
      model: '',
      year: 0,
      transmission: '',
    },
    exterior: {
      bemperDepan: {
        status: '',
        title: 'Bemper Depan',
      },
      bemperBelakang: {
        status: '',
        title: 'Bemper Belakang',
      },
      kapMesin: {
        status: '',
        title: 'Kap Mesin',
      },
      pintuDepan: {
        status: '',
        title: 'Pintu Depan',
      },
      pintuBelakang: {
        status: '',
        title: 'Pintu Belakang',
      },
      kapBagasi: {
        status: '',
        title: 'Kap Bagasi',
      },
      photo: [],
    },
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
    interior: {
      kameraMundur: {
        status: '',
        title: 'Kamera Mundur',
      },
      pemutarAudio: {
        status: '',
        title: 'Pemutar Audio',
      },
      speaker: {
        status: '',
        title: 'Jok Driver',
      },
      jokDriver: {
        status: '',
        title: 'Jok Driver',
      },
      laciDashboard: {
        status: '',
        title: 'Laci Dashboard',
      },
      ac: {
        status: '',
        title: 'Air Conditioner',
      },
      photo: [],
    },
    components: {
      belts: {
        status: '',
        title: 'Belt Mesin',
      },
      engine: {
        status: '',
        title: 'Mesin',
      },
      mesinAkselerasi: {
        status: '',
        title: 'Mesin Akselereasi',
      },
      engineIdling: {
        status: '',
        title: 'Mesin Idle',
      },
      engineStarling: {
        status: '',
        title: 'Mesin Starling',
      },
      suaraMesin: {
        status: '',
        title: 'Suara Mesin',
      },
      aki: {
        status: '',
        title: 'Aki',
      },
      dinamo: {
        status: '',
        title: 'Dinamo',
      },
      moutingTransmisi: {
        status: '',
        title: 'Mounting Transmisi',
      },
      radiator: {
        status: '',
        title: 'Radiator',
      },
      tangkiRadiator: {
        status: '',
        title: 'Tangki Radiator',
      },
      kipasRadiator: {
        status: '',
        title: 'Kipas Radiator',
      },
      tutupRadiator: {
        status: '',
        title: 'Tutup Radiator',
      },
      photo: [],
    },
    tesJalan: {
      bunyiTransisi: {
        status: '',
        title: 'Bunyi Transimis',
      },
      rodaPenggerak: {
        status: '',
        title: 'Roda Penggerak',
      },
      sistemKopling: {
        status: '',
        title: 'Sistem Kopling',
      },
      sistemTuasRem: {
        status: '',
        title: 'Sistem Tuas Rem',
      },
      perpindahanTransmisi: {
        status: '',
        title: 'Perpindahan Transmisi',
      },
      photo: [],
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

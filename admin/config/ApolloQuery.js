import { gql } from "@apollo/client";

export const FECTH_INSPECTIONLIST = gql`
  query fecthInspection {
    inspections {
      id
      orderId
      vehicle {
        type
        brand
        model
        year
        transmission
      }
      exterior {
        bemperDepan {
          status
          title
        }
        bemperBelakang {
          status
          title
        }
        kapMesin {
          status
          title
        }
        pintuDepan {
          status
          title
        }
        pintuBelakang {
          status
          title
        }
        kapBagasi {
          status
          title
        }
        photo
      }
      interior {
        kameraMundur {
          status
          title
        }
        pemutarAudio {
          status
          title
        }
        speaker {
          status
          title
        }
        jokDriver {
          status
          title
        }
        laciDashboard {
          status
          title
        }
        ac {
          status
          title
        }
        photo
      }
      components {
        belts {
          status
          title
        }
        engine {
          status
          title
        }
        mesinAkselerasi {
          status
          title
        }
        engineIdling {
          status
          title
        }
        engineStarling {
          status
          title
        }
        suaraMesin {
          status
          title
        }
        aki {
          status
          title
        }
        dinamo {
          status
          title
        }
        moutingTransmisi {
          status
          title
        }
        radiator {
          status
          title
        }
        tangkiRadiator {
          status
          title
        }
        kipasRadiator {
          status
          title
        }
        tutupRadiator {
          status
          title
        }
        photo
      }
      tesJalan {
        bunyiTransisi {
          status
          title
        }
        rodaPenggerak {
          status
          title
        }
        sistemKopling {
          status
          title
        }
        sistemTuasRem {
          status
          title
        }
        perpindahanTransmisi {
          status
          title
        }
        photo
      }
    }
  }
`;
export const TAKE_ORDER = gql`
  mutation Mutation($updateStatusId: ID!, $status: String!) {
    updateStatus(id: $updateStatusId, status: $status) {
      status
      staffId
    }
  }
`;
export const FECTH_STAFF_ORDER = gql`
  query Query {
    findOrderByStaffId {
      id
      userId
      staffId
      fullName
      phoneNumber
      inspectionAddress
      price
      date
      time
      vehicle {
        type
        brand
        model
        year
        transmission
      }
      map {
        city
        regional
        longitude
        latitude
      }
      status
      payment
    }
  }
`;

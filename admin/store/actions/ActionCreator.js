import { ITEM_EXTERIOR, ITEM_INSPECTION } from "./ActionType";

export function InspectionForm(payload) {
  return {
    type: ITEM_INSPECTION,
    payload,
  };
}

export function exteriorForm(payload) {
  return {
    type: ITEM_EXTERIOR,
    payload,
  };
}

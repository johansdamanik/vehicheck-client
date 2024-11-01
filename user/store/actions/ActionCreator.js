import { ITEM_ORDER_SUCCESS } from "./ActionType";

export function FormOrder(payload) {
  return {
    type: ITEM_ORDER_SUCCESS,
    payload,
  };
}

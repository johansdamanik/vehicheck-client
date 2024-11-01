import { combineReducers } from "redux";
import orderReducer from "./OrderReducer";

const rootReducer = combineReducers({
  Form: orderReducer,
});

export default rootReducer;

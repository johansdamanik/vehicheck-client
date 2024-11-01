import { combineReducers } from "redux";
import inspectionReducer from "./interiorReducer";

const rootReducer = combineReducers({
  Form: inspectionReducer,
});

export default rootReducer;

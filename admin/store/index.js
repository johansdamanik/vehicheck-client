import { createStore, applyMiddleware } from "redux";
import logger from "./middleware/logger";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(logger));

export default store;

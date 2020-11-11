import { combineReducers } from "redux";
import commonReducer from "./app.reducers";

const appReducer = combineReducers({
  commonReducer,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

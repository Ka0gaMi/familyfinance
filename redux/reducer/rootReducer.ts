import { combineReducers } from "@reduxjs/toolkit";
import financeReducer from "../slice/financeSlice";
import incomeReducer from "../slice/incomeSlice";
import typeReducer from "../slice/typeSlice";

const rootReducer = combineReducers({
  finances: financeReducer,
  incomes: incomeReducer,
  types: typeReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
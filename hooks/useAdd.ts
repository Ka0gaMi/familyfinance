import { useEffect } from "react";
import { addFinanceAndSetToStore } from "../redux/slice/financeSlice";
import { addIncomeAndSetToStore } from "../redux/slice/incomeSlice";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../redux/reducer/rootReducer";

type AddActionTypes =
  | typeof addFinanceAndSetToStore
  | typeof addIncomeAndSetToStore

export default function useAddAction(addAction: AddActionTypes, date: string) {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();
  useEffect(() => {
    void dispatch(addAction(date));
  }, [dispatch, addAction, date]);
}
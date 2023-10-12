"use client"

import React from "react";
import styles from "./Finance.module.css"
import Expected from "../expected/Expected";
import Actual from "../actual/Actual";
import { FinanceDto, fetchFinances } from "../../../../../service/finance";
import { IncomeDto } from "../../../../../service/income";
import Received from "../received/Received";
import { CircularProgress, Fab } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { 
  addFinanceAndSetToStore,
  fetchFinancesAndSetToStore, 
  selectFinances,
} from "../../../../../redux/slice/financeSlice";
import { 
  fetchIncomesAndSetToStore, 
  selectIncomes, 
  addIncomeAndSetToStore
} from "../../../../../redux/slice/incomeSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../redux/reducer/rootReducer";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import moment from "moment";

export default function Finance() {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  React.useEffect(() => {
    dispatch(fetchFinancesAndSetToStore());
    dispatch(fetchIncomesAndSetToStore());
  }, [dispatch]);

  const financesFromState = useSelector((state: RootState) => selectFinances(state));
  const incomesFromState = useSelector((state: RootState) => state.incomes.incomes);

  const [finances, setFinances] = React.useState<FinanceDto[]>([]);
  const [income, setIncome] = React.useState<IncomeDto[]>([]);
  const [date, setDate] = React.useState<string>(moment().format('YYYY-MM'));
  const [monthCount, setMonthCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (financesFromState.length > 0 && incomesFromState.length > 0) {
      setLoading(false);
    }
  }, [financesFromState, incomesFromState]);

  React.useEffect(() => {
    if (!loading) {
      const selectedFinances = cloneDeep(financesFromState.filter(finance => finance.date === date));
      const selectedIncomes = cloneDeep(incomesFromState.filter(income => income.date === date));

      if (selectedFinances.length === 0 && selectedIncomes.length === 0) {
        void dispatch(addFinanceAndSetToStore(date))
        void dispatch(addIncomeAndSetToStore(date))
      } else {
        setFinances(selectedFinances);
        setIncome(selectedIncomes);
      }
    }
  }, [date, loading, financesFromState, incomesFromState]);

  console.log(income)

  function handleLeft() {
    updateDate(-1);
  }

  function handleRight() {
    updateDate(1);
  }

  function updateDate(monthsToAdd: number) {
    const newDate = moment(date).add(monthsToAdd, 'months').format('YYYY-MM');
    setDate(newDate);
    setMonthCount(monthCount + monthsToAdd);
  }

  return (
    <>
      {loading 
      ? ( <CircularProgress size={100} style={{ color: "red" }} /> ) 
      : ( 
      <>
        <div className={styles.Menu}>
          <Fab size="small" onClick={handleLeft}>
            <KeyboardArrowLeft />
          </Fab>
          <div>{date}</div>
          <Fab size="small" onClick={handleRight} disabled={monthCount >= 3}>
            <KeyboardArrowRight />
          </Fab>
        </div>
        <div className={styles.Expected}>
          <Expected finances={finances} setFinances={setFinances} />
        </div>
        <div className={styles.Actual}>
          <Actual finances={finances} setFinances={setFinances} />
        </div>
        <div className={styles.Received}>
          <Received income={income} setIncome={setIncome} />
        </div>
      </> ) }
    </>
  )
}
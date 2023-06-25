"use client"

import React from "react";
import styles from "./Finance.module.css"
import Expected from "../expected/Expected";
import Actual from "../actual/Actual";
import { getFinanceByDate, FinanceDto, getDefaultFinances } from "../../../../../service/finance";
import { IncomeDto, getIncomeByDate, getDefaultIncomes } from "../../../../../service/income";
import Received from "../received/Received";
import { IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

export default function Finance() {
  const [finances, setFinances] = React.useState<FinanceDto[]>([] as FinanceDto[]);
  const [income, setIncome] = React.useState<IncomeDto[]>([] as IncomeDto[]);
  const [date, setDate] = React.useState<string>(new Date().toISOString().slice(0, 7));
  const [monthCount, setMonthCount] = React.useState<number>(0);

  React.useEffect(() => {
    const getFinance = async () => {
      const financeDto = await getFinanceByDate(date);
      const incomeDto = await getIncomeByDate(date);

      if (financeDto.length === 0 && incomeDto.length === 0) {
        const defaultFinances = await getDefaultFinances(date);
        const defaultIncomes = await getDefaultIncomes(date);
        setFinances(defaultFinances);
        setIncome(defaultIncomes);
        return;
      }

      setFinances(financeDto);
      setIncome(incomeDto);
    }

    getFinance();
  }, [date])

  function handleLeft() {
    updateDate(-1);
  }

  function handleRight() {
    updateDate(1);
  }

  function updateDate(monthsToAdd: number) {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + monthsToAdd);
    if (newDate.getMonth() === 3) {
      newDate.setMonth(4);
    }
    setDate(newDate.toISOString().slice(0, 7));
    setMonthCount(monthCount + monthsToAdd)
  }

  return (
    <>
      <div className={styles.Menu}>
        <IconButton onClick={handleLeft} >
          <KeyboardArrowLeft />
        </IconButton>
        <div>{date}</div>
        <IconButton onClick={handleRight} disabled={monthCount >= 3} >
          <KeyboardArrowRight />
        </IconButton>
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
    </>
  )
}
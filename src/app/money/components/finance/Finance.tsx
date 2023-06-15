"use client"

import React from "react";
import styles from "./Finance.module.css"
import Expected from "../expected/Expected";
import Actual from "../actual/Actual";
import { getFinanceByDate, FinanceDto } from "../../../../../service/finance";
import { IncomeDto, getIncomeByDate } from "../../../../../service/income";
import Received from "../received/Received";

export default function Finance() {
  const [finances, setFinances] = React.useState<FinanceDto[]>([] as FinanceDto[]);
  const [income, setIncome] = React.useState<IncomeDto[]>([] as IncomeDto[]);

  React.useEffect(() => {
    const getFinance = async () => {
      const financeDto = await getFinanceByDate();
      const incomeDto = await getIncomeByDate();
      setFinances(financeDto);
      setIncome(incomeDto);
    }

    getFinance();
  }, [])

  return (
    <>
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
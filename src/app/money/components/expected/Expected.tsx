"use client"

import React from "react";
import styles from "./Expected.module.css"
import List from "../list/List";
import { FinanceDto } from "../../../../../service/finance";

interface ExpectedProps {
  finances: FinanceDto[];
  setFinances: (finances: FinanceDto[]) => void;
}

export default function Expected({ finances, setFinances }: ExpectedProps) {
  const [totalExpenses, setTotalExpenses] = React.useState<number>(0);

  React.useEffect(() => {
    let total = 0;
    finances.forEach(finance => {
      total += finance.expectedExpenses.amount;
    setTotalExpenses(total);
    })
  }, [finances])

  return (
    <>
      <div>Expected expenses</div>
      <List finances={finances} setFinances={setFinances} typeOfExpense="expectedExpenses" />
      <div className={styles.Total}>
        <div>Total expenses</div>
        <div>{Intl.NumberFormat(
          'lt-LT',
          {
            style: 'currency',
            currency: 'EUR'
          }
        ).format(totalExpenses)
        }</div>
      </div>
    </>
  )
}
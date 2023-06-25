import React from "react";
import styles from "./Actual.module.css"
import List from "../list/List";
import { FinanceDto } from "../../../../../service/finance";

interface ExpectedProps {
  finances: FinanceDto[];
  setFinances: (finances: FinanceDto[]) => void;
}

export default function Actual({ finances, setFinances }: ExpectedProps) {
  const [totalExpenses, setTotalExpenses] = React.useState<number>(0);

  React.useEffect(() => {
    let total = 0;
    finances.forEach(finance => {
      total += finance.actualExpensesAmount;
    setTotalExpenses(total);
    })
  }, [finances])

  return (
    <>
      <div>Actual expenses</div>
      <List finances={finances} setFinances={setFinances} typeOfExpense="actualExpensesAmount" />
      <div className={styles.Total}>
        <div>Total actual expenses</div>
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
import React from "react";
import styles from "./Received.module.css"
import { IncomeDto } from "../../../../../service/income";

interface ReceivedProps {
  income: IncomeDto[];
  setIncome: (income: IncomeDto[]) => void;
}

export default function Received({ income, setIncome }: ReceivedProps) {

  function handleIsGotClick(id: string) {
    const newIncome = [...income];
    const index = newIncome.findIndex((income) => income.id === id);
    newIncome[index].isGot = !newIncome[index].isGot;
    setIncome(newIncome);
  }

  return (
    <div>
      <div className={styles.Name}>Received income</div>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th>Siuntejas</th>
            <th>Suma</th>
            <th>Gavimo diena</th>
            <th>Komentarai</th>
            <th>Ar gauti?</th>
          </tr>
        </thead>
        <tbody>
          {income.map((income) => (
            <tr key={income.id} className={styles.TableRow}>
              <td>{income.name}</td>
              <td>{Intl.NumberFormat(
                'lt-LT',
                {
                  style: 'currency',
                  currency: 'EUR'
                }
              ).format(income.amount)}</td>
              <td>{income.expectedDay}</td>
              <td>{income.notes}</td>
              <td onClick={() => handleIsGotClick(income.id)}>{income.isGot ? "Taip" : "Ne"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.Add}>
        <div>Add</div>
        <div>+</div>
      </div>
      <div className={styles.Total}>
        <div>Total income</div>
        <div>{Intl.NumberFormat(
          'lt-LT',
          {
            style: 'currency',
            currency: 'EUR'
          }
        ).format(income.reduce((total, income) => total + income.amount, 0))
        }</div>
      </div>
    </div>
  )
}
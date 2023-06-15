"use client"

import React from "react";
import styles from "./List.module.css"
import { FinanceDto } from "../../../../../service/finance";

interface ListProps {
  finances: FinanceDto[];
  setFinances: (finances: FinanceDto[]) => void;
  typeOfExpense: string;
}

export default function List({ finances, setFinances, typeOfExpense }: ListProps) {
  const [editableIndex, setEditableIndex] = React.useState<number | null>(null);
  const [amount, setAmount] = React.useState<number | null>(null);
  const [name, setName] = React.useState<string | null>(null);

  const handleAmountClick = (index: number) => {
    setEditableIndex(index);
    setAmount(finances[index].expectedExpenses.amount)
  }

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  }

  const handleAmountBlur = () => {
    if (amount != null && name === null) {
      const newFinances = [...finances];
      newFinances[editableIndex as number].expectedExpenses.amount = amount;
      // updateExpectedExpense(newExpenses[editableIndex as number]);
      setFinances(newFinances);
    }
    setEditableIndex(null);
    setAmount(null);
  }

  const handleAmountEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (amount != null && name === null) {
        const newFinances = [...finances];
        newFinances[editableIndex as number].expectedExpenses.amount = amount;
        // updateExpectedExpense(newExpenses[editableIndex as number]);
        setFinances(newFinances);
      }
      if (name != null && amount === null) {
        const newFinances = [...finances];
        newFinances[editableIndex as number].type.name = name;
        // updateExpectedExpense(newExpenses[editableIndex as number]);
        setFinances(newFinances);
      }
      setEditableIndex(null);
      setAmount(null);
      setName(null);
      // handleAddEnter(finances[finances.length - 1])
    }
  }

  const handleNameClick = (index: number) => {
    setEditableIndex(index);
    setName(finances[index].type.name)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleNameBlur = () => {
    if (name != null && amount === null) {
      const newFinances = [...finances];
      newFinances[editableIndex as number].type.name = name;
      // updateExpectedExpense(newExpenses[editableIndex as number]);
      setFinances(newFinances);
    }
    setEditableIndex(null);
    setName(null);
    // handleAddEnter(finances[finances.length - 1])
  }

  // const handleAddClick = () => {
  //   const randomUUID = () => {
  //     return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
  //       const r = Math.random() * 16 | 0;
  //       const v = c === 'x' ? r : (r && 0x3 | 0x8);
  //       return v.toString(16);
  //     });
  //   }
  //   const newExpenses = [...expectedExpenses, { id: randomUUID(), type: "", amount: 0, date: new Date().toLocaleDateString(), typeId: randomUUID() }];
  //   addExpectedExpense(newExpenses[newExpenses.length - 1]);
  //   setExpectedExpenses(newExpenses);
  //   setEditableIndex(newExpenses.length - 1);
  //   setName(newExpenses[newExpenses.length - 1].type);
  // }

  // const handleAddEnter = (expense: ExpectedExpenseDto) => {
  //   if (expense.type != "" && expense.amount === 0) {
  //     setEditableIndex(expectedExpenses.length - 1);
  //     setAmount(0);
  //   }
  // }

  return (
    <div className={styles.List}>
      {finances.map((finance, index) => (
        <div key={finance.id} className={styles.ListItem}>
          <div className={styles.ListItemName} onClick={() => handleNameClick(index)}>{
            editableIndex === index && name !=null ? (
              <input
                type="text"
                value={name?.toString()}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                onKeyDown={handleAmountEnter}
                className={styles.ListItemNameInput}
                autoFocus
              />
              ) : (
              finance.type.name
              )
          }</div>
          <div onClick={() => handleAmountClick(index)} className={styles.ListItemAmount}>{
            editableIndex === index && amount != null ? (
              <input
                type="number"
                value={amount?.toString()}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
                onKeyDown={handleAmountEnter}
                className={styles.ListItemAmountInput}
                autoFocus
              />
              ) : (
              Intl.NumberFormat(
                'lt-LT',
                {
                  style: 'currency',
                  currency: 'EUR'
                }
                // @ts-expect-error
              ).format(finance[typeOfExpense as keyof FinanceDto].amount)
              )
          }</div>
        </div>
      ))}
      <div className={styles.ListItemAdd} >
        <div>Add</div>
        <div>+</div>
      </div>
    </div>
  )
}
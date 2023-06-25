"use client"

import React from "react";
import styles from "./List.module.css"
import { FinanceDto, deleteFinance, updateFinance, addFinance, createFinanceDto } from "../../../../../service/finance";

interface ListProps {
  finances: FinanceDto[];
  setFinances: (finances: FinanceDto[]) => void;
  typeOfExpense: string;
}

export default function List({ finances, setFinances, typeOfExpense }: ListProps) {
  const [editableNameIndex, setEditableNameIndex] = React.useState<number | null>(null);
  const [editableAmountIndex, setEditableAmountIndex] = React.useState<number | null>(null);
  const [isExpenseAdded, setIsExpenseAdded] = React.useState<boolean>(false);

  function handleNameClick(index: number) {
    setEditableNameIndex(index);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newFinances = [...finances];
    const index = editableNameIndex as number;
    newFinances[index].type.name = event.target.value;
    setFinances(newFinances);
  }

  function handleNameBlur() {
    if (editableNameIndex != null) {
      const newFinances = [...finances];
      const index = editableNameIndex as number;
      updateFinance(newFinances[index]);
      setFinances(newFinances);
    }
    if (isExpenseAdded) {
      setEditableNameIndex(null);
      handleAmountClick(editableNameIndex as number);
    }
    setEditableNameIndex(null);
  }

  function handleAmountClick(index: number) {
    setEditableAmountIndex(index);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newFinances = [...finances];
    const index = editableAmountIndex as number;
    // @ts-expect-error
    newFinances[index][typeOfExpense as keyof FinanceDto] = Number(event.target.value);
    setFinances(newFinances);
  }

  function handleAmountBlur() {
    if (editableAmountIndex != null) {
      const newFinances = [...finances];
      const index = editableAmountIndex as number;
      updateFinance(newFinances[index]);
      setFinances(newFinances);
    }
    if (isExpenseAdded) {
      setIsExpenseAdded(false);
    }
    setEditableAmountIndex(null);
  }

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (editableNameIndex != null) {
        handleNameBlur();
      } else if (editableAmountIndex != null) {
        handleAmountBlur();
      }
    }
  }

  function handleDeleteClick(finance: FinanceDto) {
    deleteFinance(finance);
    setFinances(finances.filter((f) => f.id !== finance.id));
  }

  function handleAddClick() {
    const newFinances = [...finances];
    const newFinance = createFinanceDto();
    addFinance(newFinance);
    newFinances.push(newFinance);
    setFinances(newFinances);
    setIsExpenseAdded(true);
    handleNameClick(newFinances.length - 1);
  }

  return (
    <div className={styles.List}>
      {finances.map((finance, index) => (
        <div key={finance.id} className={styles.ListItem}>
          <div className={styles.ListDelete} onClick={() => handleDeleteClick(finance)}>x</div>
          <div className={styles.ListItemName} onClick={() => handleNameClick(index)}>{
            editableNameIndex === index ? (
              <input
                type="text"
                value={finance.type.name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                onKeyDown={handleEnter}
                className={styles.ListItemNameInput}
                autoFocus
              />
              ) : (
              finance.type.name
              )
          }</div>
          <div onClick={() => handleAmountClick(index)} className={styles.ListItemAmount}>{
            editableAmountIndex === index ? (
              <input
                type="text"
                // @ts-expect-error
                value={finance[typeOfExpense as keyof FinanceDto]}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
                onKeyDown={handleEnter}
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
              ).format(finance[typeOfExpense as keyof FinanceDto])
              )
          }</div>
        </div>
      ))}
      <div className={styles.ListItemAdd} onClick={handleAddClick} >
        <div>Add</div>
        <div>+</div>
      </div>
    </div>
  )
}
"use client"

import React from "react";
import styles from "./List.module.css"
import { FinanceDto, deleteFinance, updateFinance, addFinance, createFinanceDto } from "../../../../../service/finance";
import { updateFinanceAndSetToStore, deleteFinanceAndSetToStore, createFinanceAndSetToStore } from "../../../../../redux/slice/financeSlice";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../redux/reducer/rootReducer";
import { Dialog } from "@mui/material";
import AddExpenseForm from "../forms/addExpenseForm/AddExpenseForm";
import DeleteExpenseForm from "../forms/deleteForm/DeleteExpenseForm";

interface ListProps {
  finances: FinanceDto[];
  setFinances: (finances: FinanceDto[]) => void;
  typeOfExpense: string;
}

export default function List({ finances, setFinances, typeOfExpense }: ListProps) {
  const [editableNameIndex, setEditableNameIndex] = React.useState<number | null>(null);
  const [editableAmountIndex, setEditableAmountIndex] = React.useState<number | null>(null);
  const [isExpenseAdded, setIsExpenseAdded] = React.useState<boolean>(false);

  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState<boolean>(false);
  const [financeToDelete, setFinanceToDelete] = React.useState<FinanceDto | null>(null);

  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

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
      dispatch(updateFinanceAndSetToStore(newFinances[index]));
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
    newFinances[index][typeOfExpense as keyof FinanceDto] = event.target.value.replace(',', '.');
    setFinances(newFinances);
  }

  function handleAmountBlur() {
    if (editableAmountIndex != null) {
      const newFinances = [...finances];
      const index = editableAmountIndex as number;
      void dispatch(updateFinanceAndSetToStore(newFinances[index]));
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
    setFinanceToDelete(finance)
    setIsDeleteDialogOpen(true);
  }

  function handleAddClick() {
    setIsAddDialogOpen(true);
  }

  function handleDeleteDialogClose() {
    setIsDeleteDialogOpen(false);
  }

  function handleAddDialogClose() {
    setIsAddDialogOpen(false);
  }

  return (
    <div className={styles.List}>
      {finances.map((finance, index) => (
        <div key={finance.id} className={styles.ListItem}>
          <div className={styles.ListDelete} onClick={
            () => handleDeleteClick(finance)
          }>x</div>
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
      <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
        <AddExpenseForm handleDialogClose={handleAddDialogClose} />
      </Dialog>
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DeleteExpenseForm handleDeleteDialogClose={handleDeleteDialogClose} financeToDelete={financeToDelete} />
      </Dialog>
    </div>
  )
}
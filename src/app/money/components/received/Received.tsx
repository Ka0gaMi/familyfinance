"use client"

import React from "react";
import styles from "./Received.module.css"
import { IncomeDto } from "../../../../../service/income";
import { deleteIncomeAndSetToStore, updateIncomeAndSetToStore } from "../../../../../redux/slice/incomeSlice";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../redux/reducer/rootReducer";
import { Dialog } from "@mui/material";
import AddIncomeForm from "../forms/addIncomeForm/AddIncomeForm";
import { cloneDeep } from "lodash";

interface ReceivedProps {
  income: IncomeDto[];
  setIncome: (income: IncomeDto[]) => void;
}

export default function Received({ income, setIncome }: ReceivedProps) {
  const [editableNameIndex, setEditableNameIndex] = React.useState<number | null>(null);
  const [editableAmountIndex, setEditableAmountIndex] = React.useState<number | null>(null);
  const [editableExpectedDayIndex, setEditableExpectedDayIndex] = React.useState<number | null>(null);
  const [editableNotesIndex, setEditableNotesIndex] = React.useState<number | null>(null);
  const [isIncomeAdded, setIsIncomeAdded] = React.useState<boolean>(false);

  const [isSortedByAmount, setIsSortedByAmount] = React.useState<boolean | null>(null);
  const [isSortedByExpectedDay, setIsSortedByExpectedDay] = React.useState<boolean | null>(null);
  const [isSortedByIsGot, setIsSortedByIsGot] = React.useState<boolean | null>(null);

  const [isAddIncomeDialogOpen, setIsAddIncomeDialogOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  function handleIsGotClick(id: string) {
    const newIncome = cloneDeep(income);
    const index = newIncome.findIndex((income) => income.id === id);
    newIncome[index].isGot = !newIncome[index].isGot;
    dispatch(updateIncomeAndSetToStore(newIncome[index]));
    setIncome(newIncome);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newIncome = [...income];
    const index = editableNameIndex as number;
    newIncome[index].name = event.target.value;
    setIncome(newIncome);
  }

  function handleNameBlur() {
    if (editableNameIndex != null) {
      const newIncome = [...income];
      const index = editableNameIndex as number;
      dispatch(updateIncomeAndSetToStore(newIncome[index]));
      setIncome(newIncome);
    }
    if (isIncomeAdded) {
      setEditableNameIndex(null);
      setEditableAmountIndex(editableNameIndex as number);
    }
    setEditableNameIndex(null);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newIncome = [...income];
    const index = editableAmountIndex as number;
    newIncome[index].amount = event.target.value.replace(',', '.');
    setIncome(newIncome);
  }

  function handleAmountBlur() {
    if (editableAmountIndex != null) {
      const newIncome = [...income];
      const index = editableAmountIndex as number;
      dispatch(updateIncomeAndSetToStore(newIncome[index]));
      setIncome(newIncome);
    }
    if (isIncomeAdded) {
      setEditableAmountIndex(null);
      setEditableExpectedDayIndex(editableAmountIndex as number);
    }
    setEditableAmountIndex(null);
  }

  function handleExpectedDayChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newIncome = [...income];
    const index = editableExpectedDayIndex as number;
    newIncome[index].expectedDay = event.target.value;
    setIncome(newIncome);
  }

  function handleExpectedDayBlur() {
    if (editableExpectedDayIndex != null) {
      const newIncome = [...income];
      const index = editableExpectedDayIndex as number;
      dispatch(updateIncomeAndSetToStore(newIncome[index]));
      setIncome(newIncome);
    }
    if (isIncomeAdded) {
      setEditableExpectedDayIndex(null);
      setEditableNotesIndex(editableExpectedDayIndex as number);
    }
    setEditableExpectedDayIndex(null);
  }

  function handleNotesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newIncome = [...income];
    const index = editableNotesIndex as number;
    newIncome[index].notes = event.target.value;
    setIncome(newIncome);
  }

  function handleNotesBlur() {
    if (editableNotesIndex != null) {
      const newIncome = [...income];
      const index = editableNotesIndex as number;
      dispatch(updateIncomeAndSetToStore(newIncome[index]));
      setIncome(newIncome);
    }
    if (isIncomeAdded) {
      setIsIncomeAdded(false);
    }
    setEditableNotesIndex(null);
  }

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      if (editableNameIndex != null) {
        handleNameBlur();
      } else if (editableAmountIndex != null) {
        handleAmountBlur();
      } else if (editableExpectedDayIndex != null) {
        handleExpectedDayBlur();
      } else if (editableNotesIndex != null) {
        handleNotesBlur();
      }
    }
  }

  function handleDeleteClick(incomeToDelete: IncomeDto) {
    void dispatch(deleteIncomeAndSetToStore(incomeToDelete));
  }

  function handleAddClick() {
    setIsAddIncomeDialogOpen(true);
  }

  function handleAddIncomeDialogClose() {
    setIsAddIncomeDialogOpen(false);
  }

  function sortByAmount() {
    const newIncome = [...income];
    setIsSortedByExpectedDay(null);
    setIsSortedByIsGot(null);
    if (isSortedByAmount) {
      newIncome.sort((a, b) => Number(a.amount) - Number(b.amount));
    } else {
      newIncome.sort((a, b) => Number(b.amount) - Number(a.amount));
    }
    setIsSortedByAmount(!isSortedByAmount);
    setIncome(newIncome);
  }

  function sortByExpectedDay() {
    const newIncome = [...income];
    setIsSortedByAmount(null);
    setIsSortedByIsGot(null);
    if (isSortedByExpectedDay) {
      newIncome.sort((a, b) => Number(a.expectedDay) - Number(b.expectedDay));
    } else {
      newIncome.sort((a, b) => Number(b.expectedDay) - Number(a.expectedDay));
    }
    setIsSortedByExpectedDay(!isSortedByExpectedDay);
    setIncome(newIncome);
  }

  function sortByIsGot() {
    const newIncome = [...income];
    setIsSortedByAmount(null);
    setIsSortedByExpectedDay(null);
    if (isSortedByIsGot) {
      newIncome.sort((a, b) => Number(a.isGot) - Number(b.isGot));
    } else {
      newIncome.sort((a, b) => Number(b.isGot) - Number(a.isGot));
    }
    setIsSortedByIsGot(!isSortedByIsGot);
    setIncome(newIncome);
  }

  return (
    <div>
      <div className={styles.Name}>Received income</div>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th style={{width: '20px'}}></th>
            <th className={styles.Th}>Siuntejas</th>
            <th className={styles.Th} onClick={sortByAmount}>Suma {isSortedByAmount != null 
              ? isSortedByAmount
                ? <span className={styles.Sorting}>▲</span>
                : <span className={styles.Sorting}>▼</span>
              : <span className={styles.Sorting}>▼▲</span>
          }</th>
            <th className={styles.Th} onClick={sortByExpectedDay}>Gavimo diena {
              isSortedByExpectedDay != null
                ? isSortedByExpectedDay
                  ? <span className={styles.Sorting}>▲</span>
                  : <span className={styles.Sorting}>▼</span>
                : <span className={styles.Sorting}>▼▲</span>
            }</th>
            <th className={styles.Th}>Komentarai</th>
            <th className={styles.Th} onClick={sortByIsGot}>Ar gauti? {
              isSortedByIsGot != null
                ? isSortedByIsGot
                  ? <span className={styles.Sorting}>▲</span>
                  : <span className={styles.Sorting}>▼</span>
                : <span className={styles.Sorting}>▼▲</span>
            }</th>
          </tr>
        </thead>
        <tbody>
          {income.map((income, index) => (
            <tr key={income.id} className={styles.TableRow}>
              <td className={styles.Delete} onClick={() => handleDeleteClick(income)}>x</td>
              {
              editableNameIndex === index ?
                <td>
                  <input
                    className={styles.Input}
                    type="text"
                    value={income.name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    onKeyDown={handleEnter}
                    autoFocus
                  />
                </td>
                :
                <td onClick={() => setEditableNameIndex(index)}>{income.name}</td>
            }
            {
              editableAmountIndex === index ?
                <td>
                  <input
                    className={styles.InputAmount}
                    type="text"
                    value={income.amount}
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                    onKeyDown={handleEnter}
                    autoFocus
                  />
                </td>
                :
                <td onClick={() => setEditableAmountIndex(index)}>{Intl.NumberFormat(
                  'lt-LT',
                  {
                    style: 'currency',
                    currency: 'EUR'
                  }
                ).format(Number(income.amount))}</td>
            }
            {
              editableExpectedDayIndex === index ?
                <td>
                  <input
                    className={styles.InputAmount}
                    type="text"
                    value={income.expectedDay}
                    onChange={handleExpectedDayChange}
                    onBlur={handleExpectedDayBlur}
                    onKeyDown={handleEnter}
                    autoFocus
                  />
                </td>
                :
                <td onClick={() => setEditableExpectedDayIndex(index)}>{income.expectedDay}</td>
            }
            {
              editableNotesIndex === index ?
                <td>
                  <input
                    className={styles.Input}
                    type="text"
                    value={income.notes}
                    onChange={handleNotesChange}
                    onBlur={handleNotesBlur}
                    onKeyDown={handleEnter}
                    autoFocus
                  />
                </td>
                :
                <td onClick={() => setEditableNotesIndex(index)} className={styles.TdNotes}>{income.notes}</td>
            }
              <td onClick={() => handleIsGotClick(income.id)} className={styles.IsGot}>{income.isGot ? "Taip" : "Ne"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.Add} onClick={handleAddClick}>
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
        ).format(income.reduce((total, income) => Number(total) + Number(income.amount), 0))
        }</div>
      </div>
      {/* TODO: Add Dialog */}
      <Dialog open={isAddIncomeDialogOpen} onClose={handleAddIncomeDialogClose} fullWidth>
        <AddIncomeForm handleDialogClose={handleAddIncomeDialogClose} />
      </Dialog>
    </div>
  )
}
"use client"

import React from "react";
import styles from "./Received.module.css"
import { IncomeDto, updateIncome, deleteIncome, addIncome, createIncomeDto } from "../../../../../service/income";

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

  function handleIsGotClick(id: string) {
    const newIncome = [...income];
    const index = newIncome.findIndex((income) => income.id === id);
    newIncome[index].isGot = !newIncome[index].isGot;
    updateIncome(newIncome[index]);
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
      updateIncome(newIncome[index]);
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
    newIncome[index].amount = Number(event.target.value);
    setIncome(newIncome);
  }

  function handleAmountBlur() {
    if (editableAmountIndex != null) {
      const newIncome = [...income];
      const index = editableAmountIndex as number;
      updateIncome(newIncome[index]);
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
    newIncome[index].expectedDay = Number(event.target.value);
    setIncome(newIncome);
  }

  function handleExpectedDayBlur() {
    if (editableExpectedDayIndex != null) {
      const newIncome = [...income];
      const index = editableExpectedDayIndex as number;
      updateIncome(newIncome[index]);
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
      updateIncome(newIncome[index]);
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

  function handleDeleteClick(id: string) {
    const newIncome = [...income];
    const index = newIncome.findIndex((income) => income.id === id);
    newIncome.splice(index, 1);
    deleteIncome(id);
    setIncome(newIncome);
  }

  function handleAddClick() {
    const newIncome = [...income];
    const newIncomeDto = createIncomeDto();
    newIncome.push(newIncomeDto);
    addIncome(newIncomeDto);
    setIncome(newIncome);
    setIsIncomeAdded(true);
    setEditableNameIndex(newIncome.length - 1);
  }

  return (
    <div>
      <div className={styles.Name}>Received income</div>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th style={{width: '20px'}}></th>
            <th>Siuntejas</th>
            <th>Suma</th>
            <th>Gavimo diena</th>
            <th>Komentarai</th>
            <th>Ar gauti?</th>
          </tr>
        </thead>
        <tbody>
          {income.map((income, index) => (
            <tr key={income.id} className={styles.TableRow}>
              <td className={styles.Delete} onClick={() => handleDeleteClick(income.id)}>x</td>
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
                    type="number"
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
                ).format(income.amount)}</td>
            }
            {
              editableExpectedDayIndex === index ?
                <td>
                  <input
                    className={styles.InputAmount}
                    type="number"
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
        ).format(income.reduce((total, income) => total + income.amount, 0))
        }</div>
      </div>
    </div>
  )
}
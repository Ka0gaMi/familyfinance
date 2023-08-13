import React from 'react';
import styles from './DeleteExpenseForm.module.css';
import { type FinanceDto } from '../../../../../../service/finance';
import { Button } from '@mui/material';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../../../redux/reducer/rootReducer';
import { deleteFinanceAndSetToStore } from '../../../../../../redux/slice/financeSlice';

interface DeleteExpenseFormProps {
  handleDeleteDialogClose: () => void;
  financeToDelete: FinanceDto | null;
}

export default function DeleteExpenseForm({ handleDeleteDialogClose, financeToDelete }: DeleteExpenseFormProps) {

  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  function handleDeleteClick(financeToDelete: FinanceDto) {
    void dispatch(deleteFinanceAndSetToStore(financeToDelete));
    handleDeleteDialogClose();
  }

  return (
    <div className={styles.DeleteFormContainer}>
      <h2>Are you sure you want delete <i>{`${financeToDelete?.type.name}`}</i>?</h2>
      <div className={styles.DeleteFormButtons}>
        <Button variant="contained" color="primary" onClick={handleDeleteDialogClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={
          () => handleDeleteClick(financeToDelete as FinanceDto)
        }>Delete</Button>
      </div>
    </div>
  )
}
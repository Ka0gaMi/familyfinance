import React from "react";
import styles from "./AddExpenseForm.module.css";
import { Autocomplete, Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { createFinanceDto } from "../../../../../../service/finance";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../redux/reducer/rootReducer";
import { createFinanceAndSetToStore } from "../../../../../../redux/slice/financeSlice";
import { useSelector } from "react-redux";
import { fetchTypesAndSetToStore } from "../../../../../../redux/slice/typeSlice";
import { indexOf } from "lodash";

interface AddExpenseFormProps {
  handleDialogClose: () => void;
}

export default function AddExpenseForm({ handleDialogClose }: AddExpenseFormProps) {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const [name, setName] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');
  const [typesNames, setTypeNames] = React.useState<string[]>([]);

  const [width, setWidth] = React.useState(0);
  const elementWidth = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (elementWidth.current) {
      setWidth(elementWidth.current.offsetWidth);
    }

    if (typesNames.length === 0) {
      void dispatch(fetchTypesAndSetToStore());
    }

  }, [dispatch]);

  const types = useSelector((state: RootState) => state.types.types);

  React.useEffect(() => {
    const typesNames = types.map(type => type.name);
    setTypeNames(typesNames);
  }, [types]);



  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const amount = formData.get('amount') as string;
    const financeDto = createFinanceDto();
    financeDto.type.name = name;
    financeDto.expectedExpensesAmount = amount.replace(',', '.');
    financeDto.actualExpensesAmount = '0';
    void dispatch(createFinanceAndSetToStore(financeDto));
    handleDialogClose();
  }

  return (
    <>
      <div className={styles.AddExpenseFormHeader}>
        <h2>Add Expense</h2>
      </div>
      <form id="AddExpenseForm" onSubmit={handleSubmit}>
        <div className={styles.AddExpenseFormContainer}>
          <FormControl>
            <Autocomplete
              freeSolo
              options={typesNames}
              getOptionLabel={(option) => option}
              sx={{ width: `${width}px`}}
              renderInput={(params) => <TextField {...params} label="Name" variant="outlined" name="name" required />}
              inputValue={name}
              onInputChange={(event, value) =>
                value ? setName(value) : setName('')}
              renderOption={(props, option) => {
                return (
                  <li {...props} key={indexOf(typesNames, option)}>
                    {option}
                  </li>
                )
              }}
            />
          </FormControl>
          <FormControl ref={elementWidth}>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <OutlinedInput
              required
              id="amount" 
              label="amount"
              endAdornment={<InputAdornment position="end">€</InputAdornment>} 
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              name="amount"
            />
          </FormControl>
          <div className={styles.AddExpenseFormButtons}>
            <Button variant="contained" color="error" onClick={handleDialogClose}>Cancel</Button>
            <Button variant="contained" color="success" type="submit">
              Add
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

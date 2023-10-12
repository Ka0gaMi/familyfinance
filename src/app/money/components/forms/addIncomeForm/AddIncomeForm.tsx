import React, { useEffect } from "react";
import styles from "./AddIncomeForm.module.css";
import { Autocomplete, Button, FormControl, TextField } from "@mui/material";
import { indexOf } from "lodash";
import { getDefaults } from "../../../../../../service/income";
import { createIncomeDto } from "../../../../../../service/income";
import { createIncomeAndSetToStore } from "../../../../../../redux/slice/incomeSlice";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../../../redux/reducer/rootReducer";

interface AddIncomeFormProps {
  handleDialogClose: () => void;
}

export default function AddExpenseForm({ handleDialogClose }: AddIncomeFormProps) {
  const dispatch = useDispatch<ThunkDispatch<RootState, void, AnyAction>>();

  const [sender, setSender] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');

  const [senderTypes, setSenderTypes] = React.useState<string[]>([]);

  const [width, setWidth] = React.useState(0);

  const elementWidth = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementWidth.current) {
      setWidth(elementWidth.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    async function getSenderTypes() {
      const defaultIncomes = await getDefaults();
      const senderTypes = defaultIncomes.map(income => income.name);
      setSenderTypes(senderTypes);
    }

    getSenderTypes();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const amount = formData.get('amount') as string;
    const incomeDto = createIncomeDto();
    incomeDto.name = name;
    incomeDto.amount = amount.replace(',', '.');
    void dispatch(createIncomeAndSetToStore(incomeDto));
    handleDialogClose();
  }

  return (
    <>
      <div className={styles.AddIncomeFormHeader}>
        <h2>Add Income</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.AddIncomeFormContainer}>
          <div className={styles.AddIncomeFormInputs} ref={elementWidth}>
            <div className={styles.AddIncomeFormMainInputs}>
              <FormControl>
                <Autocomplete
                  sx={{ width: `${width/2}px` }}
                  freeSolo
                  options={senderTypes}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField 
                    {...params} 
                    label="Name" 
                    variant="outlined" 
                    name="name" 
                    required 
                    helperText="helper text"
                    FormHelperTextProps={{ className: 'DummyHelperText'}} />}
                  inputValue={sender}
                  onInputChange={(event, value) =>
                    value ? setSender(value) : setSender('')}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={indexOf(senderTypes, option)}>
                        {option}
                      </li>
                    )
                  }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  sx={{ width: `${width/2}px` }}
                  label="Amount"
                  variant="outlined"
                  name="amount"
                  required
                  inputProps={{ inputMode: 'decimal', pattern: '[0-9]*' }}
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  error={amount !== '' && !isNumeric(amount)}
                  helperText={'Amount must be a number'}
                />
              </FormControl>
            </div>
          </div>
          <div className={styles.AddIncomeFormButtons}>
            <Button variant="contained" color="error" onClick={handleDialogClose}>Cancel</Button>
            <Button variant="contained" color="success" type="submit">Add</Button>
          </div>
        </div>
      </form>
    </>
  )
}

function isNumeric(value: string) {
  return /^-?\d+$/.test(value);
}
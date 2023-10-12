import { 
  createSelector, 
  createAsyncThunk, 
  createSlice, 
  type PayloadAction 
} from "@reduxjs/toolkit";
import { 
  type IncomeDto, 
  fetchIncomes, 
  updateIncome, 
  getDefaultIncomes,
  addIncome,
  deleteIncome
} from "../../service/income";
import { RootState } from "../reducer/rootReducer";


export interface IncomeState {
  incomes: IncomeDto[];
  loading: boolean
}

const initialState: IncomeState = {
  incomes: [],
  loading: false
}

export const incomeSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    addIncomes: (state, action: PayloadAction<IncomeDto>) => {
      state.incomes = [...state.incomes, action.payload];
    },
    setIncomes: (state, action: PayloadAction<IncomeDto[]>) => {
      state.incomes = action.payload;
    },
    updateIncomes: (state, action: PayloadAction<IncomeDto>) => {
      const updatedIncomes = action.payload;
      const index = state.incomes.findIndex(
        income => income.id === updatedIncomes.id);
      if (index !== -1) {
        state.incomes[index] = updatedIncomes;
      }
    },
    deleteIncomes: (state, action: PayloadAction<IncomeDto>) => {
      const index = state.incomes.findIndex(
        income => income.id === action.payload.id);
      if (index !== -1) {
        state.incomes.splice(index, 1);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
})

export const { addIncomes, setIncomes, updateIncomes, deleteIncomes, setLoading } = incomeSlice.actions;

export const fetchIncomesAndSetToStore = createAsyncThunk(
  'incomes/fetchIncomesAndSetToStore',
  async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const incomes = await fetchIncomes();
    thunkAPI.dispatch(setIncomes(incomes));
    thunkAPI.dispatch(setLoading(false));
  }
)

export const updateIncomeAndSetToStore = createAsyncThunk(
  'incomes/updateIncomeAndSetToStore',
  async (income: IncomeDto, thunkAPI) => {
    if (income.id) {
      const updatedIncome = await updateIncome(income);
      if (updatedIncome) {
        thunkAPI.dispatch(updateIncomes(income));
      }
    }
  }
)

export const addIncomeAndSetToStore = createAsyncThunk(
  'incomes/addIncomeAndSetToStore',
  async (date: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const incomes = await getDefaultIncomes(date);
    incomes.forEach(income => {
      thunkAPI.dispatch(addIncomes(income));
    });
    thunkAPI.dispatch(setLoading(false));
  },
  {
    condition: (date: string, { getState }) => {
      const incomes = (getState() as RootState).incomes.incomes;
      const income = incomes.find(income => income.date === date);
      if (income) {
        return false;
      }
    }
  }
)

export const createIncomeAndSetToStore = createAsyncThunk(
  'incomes/createIncomeAndSetToStore',
  async (income: IncomeDto, { dispatch }) => {
    await addIncome(income);
    dispatch(addIncomes(income));
  }
)

export const deleteIncomeAndSetToStore = createAsyncThunk(
  'incomes/deleteIncomeAndSetToStore',
  async (income: IncomeDto, { dispatch }) => {
    await deleteIncome(income);
    dispatch(deleteIncomes(income));
  }
)

export const selectIncomes = (state: { incomes: IncomeState }) => state.incomes.incomes;

export default incomeSlice.reducer;

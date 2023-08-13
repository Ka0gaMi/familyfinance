import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type FinanceDto } from "../../service/finance";
import { 
  fetchFinances, 
  updateFinance,
  getDefaultFinances,
  addFinance,
  deleteFinance
} from "../../service/finance";
import { RootState } from "../reducer/rootReducer";

export interface FinanceState {
  finances: FinanceDto[];
  loading: boolean
}

const initialState: FinanceState = {
  finances: [],
  loading: false
}

export const financeSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    addFinances: (state, action: PayloadAction<FinanceDto>) => {
      state.finances = [...state.finances, action.payload];
    },
    setFinances: (state, action: PayloadAction<FinanceDto[]>) => {
      state.finances = action.payload;
    },
    updateFinances: (state, action: PayloadAction<FinanceDto>) => {
      const updatedFinance = action.payload;
      const index = state.finances.findIndex(
        finance => finance.id === updatedFinance.id);
      if (index !== -1) {
        state.finances[index] = updatedFinance;
      }
    },
    deleteFinances: (state, action: PayloadAction<FinanceDto>) => {
      const index = state.finances.findIndex(
        finance => finance.id === action.payload.id);
      if (index !== -1) {
        state.finances.splice(index, 1);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  }
})

export const fetchFinancesAndSetToStore = createAsyncThunk(
  'finances/fetchFinancesAndSetToStore',
  async (arg, { dispatch }) => {
    const finances = await fetchFinances();
    console.log(finances);
    dispatch(setFinances(finances));
  }
)

export const updateFinanceAndSetToStore = createAsyncThunk(
  'finances/updateFinanceAndSetToStore',
  async (finance: FinanceDto, { dispatch }) => {
    if (finance.id) {
      const updatedFinance = await updateFinance(finance);
      if (updatedFinance) {
        dispatch(updateFinances(finance));
      }
    }
  }
)

export const addFinanceAndSetToStore = createAsyncThunk(
  'finances/addFinanceAndSetToStore',
  async (date: string, { dispatch }) => {
    dispatch(setLoading(true));
    const defaultFinances = await getDefaultFinances(date);
    defaultFinances.forEach(finance => {
      dispatch(addFinances(finance));
    });
    dispatch(setLoading(false));
  },
  {
    condition: (date: string, { getState }) => {
      const finances = (getState() as RootState).finances.finances;
      const finance = finances.find(finance => finance.date === date);
      if (finance) {
        return false;
      }
    }
  }
)

export const createFinanceAndSetToStore = createAsyncThunk(
  'finances/createFinanceAndSetToStore',
  async (finance: FinanceDto, { dispatch }) => {
    await addFinance(finance);
    dispatch(addFinances(finance));
  }
)

export const deleteFinanceAndSetToStore = createAsyncThunk(
  'finances/deleteFinanceAndSetToStore',
  async (finance: FinanceDto, { dispatch }) => {
    await deleteFinance(finance);
    dispatch(deleteFinances(finance));
  }
)

export const { addFinances, setFinances, updateFinances, deleteFinances, setLoading } = financeSlice.actions;

export const selectFinances = (state: { finances: FinanceState }) => state.finances.finances;

export default financeSlice.reducer;

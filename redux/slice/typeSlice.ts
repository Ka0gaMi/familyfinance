import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TypeDto } from '../../service/type';
import { fetchTypes } from '../../service/type';

export interface TypeState {
  types: TypeDto[];
}

const initialState: TypeState = {
  types: []
}

export const typeSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    setTypes: (state, action: PayloadAction<TypeDto[]>) => {
      state.types = action.payload;
    },
    addTypes: (state, action: PayloadAction<TypeDto>) => {
      state.types.push(action.payload);
    },
    updateTypes: (state, action: PayloadAction<TypeDto>) => {
      const updatedType = action.payload;
      const index = state.types.findIndex(
        type => type.id === updatedType.id);
      if (index !== -1) {
        state.types[index] = updatedType;
      }
    },
    deleteTypes: (state, action: PayloadAction<TypeDto>) => {
      const index = state.types.findIndex(
        type => type.id === action.payload.id);
      if (index !== -1) {
        state.types.splice(index, 1);
      }
    }
  }
})

export const fetchTypesAndSetToStore = createAsyncThunk(
  'types/fetchTypesAndSetToStore',
  async (arg, { dispatch }) => {
    const types = await fetchTypes();
    dispatch(setTypes(types));
  }
)

export const { setTypes, addTypes, updateTypes, deleteTypes } = typeSlice.actions;

export const selectTypes = (state: { types: TypeState }) => state.types.types;

export default typeSlice.reducer;

import axios from "axios";
import { apiUrl } from "../config/config";

export interface FinanceDto {
  id: string;
  date: string;
  type: TypeDto;
  expectedExpenses: ExpenseDto;
  actualExpenses: ExpenseDto;
}

interface TypeDto {
  id: string;
  name: string;
}

export interface ExpenseDto {
  id: string;
  amount: number;
}

export async function getFinanceByDate(): Promise<FinanceDto[]> {
  const response = await axios.get(`${apiUrl}/finance/get_finance?date=2023-06`);
  return response.data;
}
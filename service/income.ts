import axios from "axios";
import { apiUrl } from "../config/config";

export interface IncomeDto {
  id: string;
  date: string;
  name: string;
  amount: number;
  expectedDay: number;
  isGot: boolean;
  notes: string;
}

export async function getIncomeByDate() {
  const response = await axios.get(`${apiUrl}/finance/get_income?date=2023-06`);
  return response.data;
}